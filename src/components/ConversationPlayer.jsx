import { useState, useEffect, useRef } from 'react';
import useGameStore from '../store/gameStore';
import { getImage } from '../assets/images';
import ChoiceButtons from './ChoiceButtons';
import TransitionScreen from './TransitionScreen';
import GameOverPopup from './GameOverPopup';

/**
 * ConversationPlayer — processes a script array and renders an iMessage-style chat.
 *
 * Props:
 *   contact   — { name, avatar (image key) }
 *   script    — array of script nodes (see CLAUDE.md for format)
 *   onBack    — optional callback when back button is tapped
 *
 * Script node types:
 *   { type: 'their', from: 'hudson', text: '...', image: 'imageKey' }
 *   { type: 'auto', text: '...', image: 'imageKey' }       // Connor auto-send
 *   { type: 'choice', options: [{ text, goto? }] }
 *   { type: 'navigate', to: 'SCREEN_ID' }
 *   { type: 'transition', text: '...', to: 'SCREEN_ID' }
 *   { type: 'notification', id, from, avatar, preview, target }
 *   { type: 'gameover', message: '...', retryScreen: 'SCREEN_ID' }
 *   { type: 'chapter_complete', title, message, retryLabel?, options? }
 *   { type: 'wait_for_back', homeTarget: 'SCREEN_ID' }
 */
export default function ConversationPlayer({ contact, script, onBack, immediateFirst = false }) {
  const goToScreen = useGameStore((s) => s.goToScreen);
  const pushNotification = useGameStore((s) => s.pushNotification);

  // ── State ──────────────────────────────────────────────────────
  const [messages, setMessages] = useState([]);       // rendered messages
  const [scriptIndex, setScriptIndex] = useState(0);  // current position in script
  const [showChoices, setShowChoices] = useState(false);
  const [currentChoices, setCurrentChoices] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingFrom, setTypingFrom] = useState('other'); // 'other' | 'self'
  const [showTransition, setShowTransition] = useState(null); // { text, to }
  const [showGameOver, setShowGameOver] = useState(null);     // { message, retryScreen }
  const [showChapterComplete, setShowChapterComplete] = useState(null);
  const [waitingForBack, setWaitingForBack] = useState(null); // homeTarget string
  const [paused, setPaused] = useState(false);

  const scrollRef = useRef(null);
  const processingRef = useRef(false);

  // ── Auto-scroll ────────────────────────────────────────────────
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, showChoices]);

  // ── Script processor ───────────────────────────────────────────
  useEffect(() => {
    if (paused || processingRef.current) return;
    if (scriptIndex >= script.length) return;

    const node = script[scriptIndex];
    if (!node) return;

    // Choice nodes pause the script
    if (node.type === 'choice') {
      setCurrentChoices(node.options);
      setShowChoices(true);
      return;
    }

    // Transition
    if (node.type === 'transition') {
      setShowTransition({ text: node.text, to: node.to, slow: node.slow || false });
      return;
    }

    // Navigate
    if (node.type === 'navigate') {
      goToScreen(node.to);
      return;
    }

    // Game over
    if (node.type === 'gameover') {
      setShowGameOver({ message: node.message, retryScreen: node.retryScreen });
      return;
    }

    // Chapter complete
    if (node.type === 'chapter_complete') {
      setShowChapterComplete({
        title: node.title || 'Chapter 1 Complete',
        message: node.message,
      });
      return;
    }

    // Wait for back button
    if (node.type === 'wait_for_back') {
      setWaitingForBack(node.homeTarget);
      return;
    }

    // Pause — show typing indicator for a beat, then continue
    if (node.type === 'pause') {
      processingRef.current = true;
      // Show indicator on the side of whoever sends the next message
      const nextNode = script[scriptIndex + 1];
      setTypingFrom(!nextNode || nextNode.type === 'their' || nextNode.type === 'pause' ? 'other' : 'self');
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        processingRef.current = false;
        setScriptIndex((i) => i + 1);
      }, node.ms || 1500);
      return;
    }

    // Notification — push and continue
    if (node.type === 'notification') {
      pushNotification({
        id: node.id || `notif_${scriptIndex}`,
        from: node.from,
        avatar: node.avatar,
        preview: node.preview,
        target: node.target,
      });
      // If there's no target, this notification just stays and the script stops
      if (!node.target) {
        setPaused(true);
        return;
      }
      setScriptIndex((i) => i + 1);
      return;
    }

    // Message nodes (their or auto) — show with typing delay
    if (node.type === 'their' || node.type === 'auto') {
      processingRef.current = true;
      const isFirstMessage = immediateFirst && messages.length === 0;
      if (!isFirstMessage) {
        setTypingFrom(node.type === 'auto' ? 'self' : 'other');
        setIsTyping(true);
      }

      const delay = isFirstMessage ? 0 : (node.image ? 2400 : 1600 + Math.random() * 1600);

      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: `msg_${scriptIndex}`,
            isOwn: node.type === 'auto',
            from: node.type === 'auto' ? 'connor' : node.from,
            text: node.text || null,
            image: node.image || null,
          },
        ]);
        processingRef.current = false;
        setScriptIndex((i) => i + 1);
      }, delay);
      return;
    }
  }, [scriptIndex, paused]);

  // ── Choice handler ─────────────────────────────────────────────
  const handleChoice = (option) => {
    setShowChoices(false);
    setCurrentChoices([]);

    // Add Connor's message
    setMessages((prev) => [
      ...prev,
      {
        id: `msg_choice_${scriptIndex}`,
        isOwn: true,
        from: 'connor',
        text: option.text,
        image: null,
      },
    ]);

    // If this choice branches, navigate after a short beat
    if (option.goto) {
      setTimeout(() => goToScreen(option.goto), 600);
      return;
    }

    // Pause before the other person "responds" — feels like they're reading
    const responseDelay = 1800 + Math.random() * 1200;
    setPaused(true);
    setTimeout(() => {
      setPaused(false);
      setScriptIndex((i) => i + 1);
    }, responseDelay);
  };

  // ── Back button handler ────────────────────────────────────────
  const handleBack = () => {
    if (waitingForBack) {
      goToScreen(waitingForBack);
    } else if (onBack) {
      onBack();
    }
  };

  // ── Transition screen ──────────────────────────────────────────
  if (showTransition) {
    return (
      <TransitionScreen
        text={showTransition.text}
        slow={showTransition.slow}
        onTap={() => goToScreen(showTransition.to)}
      />
    );
  }

  // ── Render ─────────────────────────────────────────────────────
  return (
    <div className="flex-1 min-h-0 flex flex-col bg-black">
      {/* Header bar — iPhone Messages style */}
      <div className="flex-shrink-0 relative flex items-center px-4 py-2 border-b border-neutral-800">
        <button
          onClick={handleBack}
          className="absolute left-2 text-blue-400 text-sm font-medium p-1 active:opacity-60"
          aria-label="Back"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex-1 flex flex-col items-center gap-1">
          <img
            src={getImage(contact.avatar)}
            alt=""
            className="w-10 h-10 rounded-full object-cover bg-neutral-700"
          />
          <span className="text-white font-semibold text-xs">{contact.name}</span>
        </div>
      </div>

      {/* Messages area */}
      <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto px-4 py-3 space-y-1">
        {messages.map((msg, i) => {
          // Determine if we should show the avatar (first msg or different sender from previous)
          const prevMsg = messages[i - 1];
          const showAvatar = !msg.isOwn && (!prevMsg || prevMsg.from !== msg.from || prevMsg.isOwn);

          return (
            <div
              key={msg.id}
              className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'} ${showAvatar ? 'mt-3' : 'mt-0.5'}`}
            >
              {/* Avatar spacer for incoming messages */}
              {!msg.isOwn && (
                <div className="w-8 flex-shrink-0 mr-2">
                  {showAvatar && (
                    <img
                      src={getImage(contact.avatar)}
                      alt=""
                      className="w-7 h-7 rounded-full object-cover bg-neutral-700"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  )}
                </div>
              )}

              {/* Bubble */}
              <div
                className={`max-w-[75%] ${
                  msg.isOwn
                    ? 'bg-blue-500 text-white rounded-2xl rounded-br-md'
                    : 'bg-neutral-800 text-white rounded-2xl rounded-bl-md'
                } ${msg.image && !msg.text ? 'p-1' : 'px-3 py-2'}`}
              >
                {msg.text && (
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                )}
                {msg.image && (
                  <img
                    src={getImage(msg.image)}
                    alt=""
                    className={`rounded-xl object-cover bg-neutral-700 ${
                      msg.text ? 'mt-1.5 w-full max-h-48' : 'w-48 h-48'
                    }`}
                    onError={(e) => {
                      e.target.className = 'rounded-xl bg-neutral-700 w-48 h-48 flex items-center justify-center';
                      e.target.alt = '📷 ' + (msg.image || 'Photo');
                    }}
                  />
                )}
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className={`flex mt-1 ${typingFrom === 'self' ? 'justify-end' : 'justify-start'}`}>
            {typingFrom === 'other' && <div className="w-8 flex-shrink-0 mr-2" />}
            <div className={`px-4 py-3 rounded-2xl ${
              typingFrom === 'self'
                ? 'bg-blue-500 rounded-br-md'
                : 'bg-neutral-800 rounded-bl-md'
            }`}>
              <div className="flex gap-1">
                <span className={`w-2 h-2 rounded-full animate-bounce ${typingFrom === 'self' ? 'bg-blue-200' : 'bg-neutral-500'}`} style={{ animationDelay: '0ms' }} />
                <span className={`w-2 h-2 rounded-full animate-bounce ${typingFrom === 'self' ? 'bg-blue-200' : 'bg-neutral-500'}`} style={{ animationDelay: '150ms' }} />
                <span className={`w-2 h-2 rounded-full animate-bounce ${typingFrom === 'self' ? 'bg-blue-200' : 'bg-neutral-500'}`} style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Choice buttons */}
      {showChoices && (
        <ChoiceButtons options={currentChoices} onSelect={handleChoice} />
      )}

      {/* Game over overlay */}
      {showGameOver && (
        <GameOverPopup
          message={showGameOver.message}
          retryScreen={showGameOver.retryScreen}
        />
      )}

      {/* Chapter complete overlay */}
      {showChapterComplete && (
        <GameOverPopup
          title={showChapterComplete.title}
          message={showChapterComplete.message}
          options={[
            { text: 'Stay and browse your phone', action: 'close', onClose: () => setShowChapterComplete(null) },
            { text: 'Replay Chapter 1', action: 'S1_01' },
            { text: 'Return to main menu', action: 'S0' },
          ]}
        />
      )}
    </div>
  );
}
