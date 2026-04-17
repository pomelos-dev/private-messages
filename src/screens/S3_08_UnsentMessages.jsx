import { useState, useEffect, useRef, useCallback } from 'react';
import useGameStore from '../store/gameStore';
import { getImage } from '../assets/images';

/**
 * S3_08 — Unsent Messages
 * Six months of near-silence rendered in iMessage style.
 * - Hudson's typing bubbles appear and disappear
 * - Connor has one hesitation moment: text input is active but send is disabled
 * - Draft auto-clears after a few seconds of inactivity; trash button clears immediately
 * - Trash tap triggers the same advance timer as typing
 * - Phone clock changes via timeOverride
 * - Ends with fade to black → tap to continue → S3_09
 */

// Timeline of events
// phase 0: show goodbye messages, then after 2.5s...
// phase 1: time 2:01  — Hudson types (5.5s), disappears → phase 2
// phase 2: time 11:49 — Connor hesitation (input active) → user types/deletes → phase 3
// phase 3: time 8:21  — Hudson types (4.5s), disappears → auto phase 5 after 3s
// phase 5: stillness, then fade → tap to continue

export default function S3_08_UnsentMessages() {
  const goToScreen = useGameStore((s) => s.goToScreen);
  const setTimeOverride = useGameStore((s) => s.setTimeOverride);
  const ch3Goodbye = useGameStore((s) => s.flags?.ch3_goodbye ?? 'take_care');
  const goodbyeText = ch3Goodbye === 'miss_you' ? 'I\'ll miss you.' : 'OK. Take care of yourself, Huddy.';

  const [phase, setPhase] = useState(0);
  const [hudsonTyping, setHudsonTyping] = useState(false);
  const [connorActive, setConnorActive] = useState(false);
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

  // Advance from Connor's hesitation phase → Hudson's second typing
  const doAdvanceFromConnor = useCallback(() => {
    clearTimeout(fallbackTimerRef.current);
    clearTimeout(typeAdvanceTimerRef.current);
    clearTimeout(draftTimerRef.current);
    setConnorActive(false);
    setDraftText('');
    setTimeout(() => setPhase(3), 1200);
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
      setTimeOverride('2:01');
      t = setTimeout(() => setPhase(1), 2500);
    } else if (phase === 1) {
      setTimeOverride('2:01');
      setHudsonTyping(true);
      t = setTimeout(() => {
        setHudsonTyping(false);
        setTimeout(() => setPhase(2), 1000);
      }, 5500);
    } else if (phase === 2) {
      setTimeOverride('11:49');
      setConnorActive(true);
      fallbackTimerRef.current = setTimeout(doAdvanceFromConnor, 18000);
      return () => {
        clearTimeout(fallbackTimerRef.current);
        clearTimeout(typeAdvanceTimerRef.current);
      };
    } else if (phase === 3) {
      setTimeOverride('8:21');
      setHudsonTyping(true);
      t = setTimeout(() => {
        setHudsonTyping(false);
        // Auto-advance to fade a few seconds after Hudson's ellipses disappear
        setTimeout(() => setPhase(5), 3000);
      }, 4500);
    } else if (phase === 5) {
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
    clearTimeout(draftTimerRef.current);
    draftTimerRef.current = setTimeout(() => setDraftText(''), 3000);
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
        {/* The goodbye message */}
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
              onBlur={() => {
                // Scroll the window back after keyboard dismisses on iOS
                window.scrollTo(0, 0);
              }}
              placeholder="Don't do it, Connor. He asked for space."
              className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-neutral-600"
              style={{ fontSize: '16px' }}
            />
          ) : (
            <span className="flex-1 text-neutral-600 text-sm select-none">Don't do it, Connor. He asked for space.</span>
          )}
        </div>
        {/* Delete button — clears draft and triggers advance when active */}
        <button
          onClick={() => {
            if (connorActive && draftText) {
              doAdvanceFromConnor();
            }
          }}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-opacity ${
            connorActive && draftText ? 'bg-neutral-600 opacity-100 active:bg-neutral-500' : 'bg-neutral-700 opacity-40'
          }`}
        >
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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
