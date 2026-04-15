import { useState, useEffect, useRef, useCallback } from 'react';
import useGameStore from '../store/gameStore';
import { getImage } from '../assets/images';
import TransitionScreen from '../components/TransitionScreen';

/**
 * S3_08 — Unsent Messages
 * Six months of near-silence rendered in iMessage style.
 * - Hudson's typing bubbles appear and disappear
 * - Connor has two hesitation moments: text input is active but send is disabled
 * - Draft auto-clears after a few seconds of inactivity
 * - Phone clock changes via timeOverride
 * - Ends with fade to black → tap to continue → S3_09
 */

// Timeline of events
// phase 0: show goodbye messages, then after 2s...
// phase 1: time 2:01  — Hudson types (3s), disappears
// phase 2: time 11:49 — Connor hesitation (input active, 5s), then clears
// phase 3: time 8:21  — Hudson types (2s), disappears quickly
// phase 4: time 10:35 — Connor hesitation (input active, 5s), then clears
// phase 5: stillness, then fade → tap to continue

export default function S3_08_UnsentMessages() {
  const goToScreen = useGameStore((s) => s.goToScreen);
  const setTimeOverride = useGameStore((s) => s.setTimeOverride);
  const ch3Goodbye = useGameStore((s) => s.flags?.ch3_goodbye ?? 'take_care');
  const goodbyeText = ch3Goodbye === 'miss_you' ? 'I\'ll miss you.' : 'OK. Take care of yourself, Huddy.';

  const [phase, setPhase] = useState(0);
  const [hudsonTyping, setHudsonTyping] = useState(false);
  const [connorActive, setConnorActive] = useState(false); // Connor's input is enabled
  const [draftText, setDraftText] = useState('');
  const [showFade, setShowFade] = useState(false);
  const [showTap, setShowTap] = useState(false);
  const [done, setDone] = useState(false);

  const draftTimerRef = useRef(null);
  const typeAdvanceTimerRef = useRef(null);
  const fallbackTimerRef = useRef(null);
  const phaseRef = useRef(phase);
  const scrollRef = useRef(null);

  useEffect(() => { phaseRef.current = phase; }, [phase]);

  // Shared advance function for Connor hesitation phases
  const doAdvanceFromConnor = useCallback(() => {
    clearTimeout(fallbackTimerRef.current);
    clearTimeout(typeAdvanceTimerRef.current);
    clearTimeout(draftTimerRef.current);
    setConnorActive(false);
    setDraftText('');
    const p = phaseRef.current;
    setTimeout(() => setPhase(p === 2 ? 3 : 5), 1200);
  }, []);

  // Clear timeOverride on unmount
  useEffect(() => {
    return () => setTimeOverride(null);
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [hudsonTyping, connorActive, phase]);

  // Phase sequencer
  useEffect(() => {
    let t;

    if (phase === 0) {
      // Initial display — start sequence after 2.5s
      setTimeOverride('2:01');
      t = setTimeout(() => setPhase(1), 2500);
    } else if (phase === 1) {
      // Hudson types at 2:01
      setTimeOverride('2:01');
      setHudsonTyping(true);
      t = setTimeout(() => {
        setHudsonTyping(false);
        setTimeout(() => setPhase(2), 1000);
      }, 5500);
    } else if (phase === 2) {
      // Connor hesitation at 11:49 — advance 5s after user types, or 18s fallback
      setTimeOverride('11:49');
      setConnorActive(true);
      fallbackTimerRef.current = setTimeout(doAdvanceFromConnor, 18000);
      return () => {
        clearTimeout(fallbackTimerRef.current);
        clearTimeout(typeAdvanceTimerRef.current);
      };
    } else if (phase === 3) {
      // Hudson types at 8:21
      setTimeOverride('8:21');
      setHudsonTyping(true);
      t = setTimeout(() => {
        setHudsonTyping(false);
        setTimeout(() => setPhase(4), 1000);
      }, 4500);
    } else if (phase === 4) {
      // Connor hesitation at 10:35 — advance 5s after user types, or 18s fallback
      setTimeOverride('10:35');
      setConnorActive(true);
      fallbackTimerRef.current = setTimeout(doAdvanceFromConnor, 18000);
      return () => {
        clearTimeout(fallbackTimerRef.current);
        clearTimeout(typeAdvanceTimerRef.current);
      };
    } else if (phase === 5) {
      // Stillness → fade to black
      t = setTimeout(() => {
        setShowFade(true);
        setTimeout(() => setShowTap(true), 700);
      }, 2000);
    }

    return () => clearTimeout(t);
  }, [phase, doAdvanceFromConnor]);

  // Auto-clear draft + advance phase 5s after last keystroke
  const handleDraftChange = useCallback((e) => {
    setDraftText(e.target.value);
    // Auto-clear if user stops typing
    clearTimeout(draftTimerRef.current);
    draftTimerRef.current = setTimeout(() => setDraftText(''), 3000);
    // Advance phase 5s after last keystroke (cancels fallback)
    clearTimeout(fallbackTimerRef.current);
    clearTimeout(typeAdvanceTimerRef.current);
    typeAdvanceTimerRef.current = setTimeout(doAdvanceFromConnor, 5000);
  }, [doAdvanceFromConnor]);

  if (done) return null;

  return (
    <div className="flex-1 min-h-0 flex flex-col bg-black relative">
      {/* Header */}
      <div className="flex-shrink-0 relative flex items-center px-4 py-2 border-b border-neutral-800">
        <button className="absolute left-2 text-blue-400 text-sm font-medium p-1 pointer-events-none opacity-0">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex-1 flex flex-col items-center gap-1">
          <img
            src={getImage('hudsonAvatar')}
            alt=""
            className="w-10 h-10 rounded-full object-cover bg-neutral-700"
          />
          <span className="text-white font-semibold text-xs">Huddy</span>
        </div>
      </div>

      {/* Messages area */}
      <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto px-4 py-3 space-y-1">
        {/* The goodbye messages */}
        <div className="flex justify-end mt-3">
          <div className="max-w-[75%] bg-blue-500 text-white rounded-2xl rounded-br-md px-3 py-2">
            <p className="text-sm leading-relaxed">{goodbyeText}</p>
          </div>
        </div>

        <div className="flex justify-start mt-0.5">
          <div className="w-8 flex-shrink-0 mr-2">
            <img src={getImage('hudsonAvatar')} alt="" className="w-7 h-7 rounded-full object-cover bg-neutral-700" />
          </div>
          <div className="max-w-[75%] bg-neutral-800 text-white rounded-2xl rounded-bl-md px-3 py-2">
            <p className="text-sm leading-relaxed">You too, Con Con.</p>
          </div>
        </div>

        <div className="flex justify-start mt-0.5">
          <div className="w-8 flex-shrink-0 mr-2" />
          <div className="max-w-[75%] bg-neutral-800 text-white rounded-2xl rounded-bl-md px-3 py-2">
            <p className="text-sm leading-relaxed">❤️</p>
          </div>
        </div>

        {/* Spacer — six months of silence */}
        <div className="h-12" />

        {/* Hudson typing indicator */}
        {hudsonTyping && (
          <div className="flex mt-1 justify-start">
            <div className="w-8 flex-shrink-0 mr-2">
              <img src={getImage('hudsonAvatar')} alt="" className="w-7 h-7 rounded-full object-cover bg-neutral-700" />
            </div>
            <div className="px-4 py-3 rounded-2xl bg-neutral-800 rounded-bl-md">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full animate-bounce bg-neutral-500" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full animate-bounce bg-neutral-500" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full animate-bounce bg-neutral-500" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        {/* Connor typing indicator (during hesitation) */}
        {connorActive && draftText && (
          <div className="flex mt-1 justify-end">
            <div className="px-4 py-3 rounded-2xl bg-blue-500 rounded-br-md">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full animate-bounce bg-blue-200" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full animate-bounce bg-blue-200" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full animate-bounce bg-blue-200" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input bar — iMessage style */}
      <div className="flex-shrink-0 flex items-center gap-2 px-3 py-2 border-t border-neutral-800">
        <div className="flex-1 flex items-center bg-neutral-900 rounded-full px-4 py-2 border border-neutral-700">
          {connorActive ? (
            <input
              autoFocus
              value={draftText}
              onChange={handleDraftChange}
              placeholder="iMessage"
              className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-neutral-600"
            />
          ) : (
            <span className="flex-1 text-neutral-600 text-sm select-none">iMessage</span>
          )}
        </div>
        {/* Send button — always disabled */}
        <button
          disabled
          className="w-8 h-8 rounded-full flex items-center justify-center bg-neutral-700 opacity-40"
        >
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </div>

      {/* Fade to black overlay */}
      {showFade && (
        <div className="absolute inset-0 bg-black animate-fade-to-black-slow z-20" />
      )}

      {/* Tap to continue */}
      {showTap && (
        <button
          className="absolute inset-0 z-30 flex items-center justify-center"
          onClick={() => {
            setDone(true);
            setTimeOverride(null);
            goToScreen('S3_09');
          }}
        >
          <p className="text-neutral-500 text-sm animate-fade-in" style={{ animationDelay: '400ms' }}>
            tap to continue
          </p>
        </button>
      )}
    </div>
  );
}
