import { useState, useEffect } from 'react';
import useGameStore from '../store/gameStore';
import { getImage } from '../assets/images';
import RecentCallsViewer from '../components/RecentCallsViewer';

/**
 * S3_11 — The Missed Call
 * Phases:
 *   0 — recent calls view (missed call from Huddy)
 *   1 — calling animation (call back path)
 *   2 — voicemail + flavor choice (call back path)
 *   → S3_12 on any terminal action
 */

const VOICEMAIL_OPTIONS = [
  { text: 'I miss you. Call me.' },
  { text: 'Pick up the phone, Huddy!' },
];

export default function S3_11_TheMissedCall() {
  const goToScreen = useGameStore((s) => s.goToScreen);
  const [phase, setPhase] = useState(0); // 0=recents, 1=calling, 2=voicemail
  const [selectedVoicemail, setSelectedVoicemail] = useState(null);
  const [fadingOut, setFadingOut] = useState(false);

  // Advance from calling (phase 1) to voicemail (phase 2) after 2.5s
  useEffect(() => {
    if (phase !== 1) return;
    const t = setTimeout(() => setPhase(2), 2500);
    return () => clearTimeout(t);
  }, [phase]);

  const handleCallBack = () => setPhase(1);

  const handleText = () => {
    goToScreen('S3_12');
  };

  // Phase 1 — Calling animation
  if (phase === 1) {
    return (
      <div className="flex-1 flex flex-col items-center justify-between bg-neutral-900 px-8 py-16">
        <div className="flex flex-col items-center gap-4 mt-8">
          <img
            src={getImage('hudsonAvatar')}
            alt=""
            className="w-32 h-32 rounded-full object-cover bg-neutral-700 ring-4 ring-neutral-600"
          />
          <p className="text-white text-2xl font-semibold">Huddy</p>
          <p className="text-neutral-400 text-base animate-pulse">Calling...</p>
        </div>

        {/* End call button */}
        <button
          onClick={() => setPhase(2)}
          className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center active:bg-red-700 transition-colors"
        >
          <svg className="w-7 h-7 text-white rotate-[135deg]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
          </svg>
        </button>
      </div>
    );
  }

  // Phase 2 — Voicemail
  if (phase === 2) {
    return (
      <div className="flex-1 flex flex-col items-center justify-between bg-neutral-900 px-8 py-16 relative">
        <div className="flex flex-col items-center gap-4 mt-8">
          <img
            src={getImage('hudsonAvatar')}
            alt=""
            className="w-32 h-32 rounded-full object-cover bg-neutral-700"
          />
          <p className="text-white text-2xl font-semibold">Huddy</p>
          <p className="text-neutral-400 text-sm">Voicemail</p>

          <div className="mt-4 px-6 py-4 rounded-2xl bg-neutral-800 border border-neutral-700 max-w-xs text-center">
            <p className="text-neutral-300 text-sm italic leading-relaxed">
              &ldquo;Hey, you've reached Hudson. Stay sexy and blessed.&rdquo;
            </p>
          </div>
        </div>

        <div className="w-full flex flex-col gap-3">
          <p className="text-neutral-400 text-xs text-center mb-1">Leave a message</p>
          {VOICEMAIL_OPTIONS.map((opt, i) => (
            <button
              key={i}
              disabled={selectedVoicemail !== null}
              onClick={() => {
                setSelectedVoicemail(i);
                setTimeout(() => setFadingOut(true), 1600);
                setTimeout(() => goToScreen('S3_12'), 3000);
              }}
              className={`w-full py-4 rounded-2xl text-sm font-medium transition-all ${
                selectedVoicemail === i
                  ? 'bg-blue-600 border border-blue-500 text-white scale-[0.98]'
                  : selectedVoicemail !== null
                  ? 'bg-neutral-800 border border-neutral-700 text-neutral-500 opacity-40'
                  : 'bg-neutral-800 border border-neutral-700 text-white active:bg-neutral-700 active:scale-[0.98]'
              }`}
            >
              {selectedVoicemail === i ? 'Recording...' : opt.text}
            </button>
          ))}
        </div>

        {fadingOut && (
          <div className="absolute inset-0 bg-black animate-fade-to-black-slow z-20 pointer-events-none" />
        )}
      </div>
    );
  }

  // Phase 0 — Recent calls
  return (
    <RecentCallsViewer
      contact={{ name: 'Huddy', avatar: 'hudsonAvatar' }}
      missedAt="11:51 AM"
      onCallBack={handleCallBack}
      onText={handleText}
    />
  );
}
