import { useState, useEffect } from 'react';
import useGameStore from '../store/gameStore';
import { getImage } from '../assets/images';
import EmailViewer from '../components/EmailViewer';
import TransitionScreen from '../components/TransitionScreen';

/**
 * S2_02 — Ascension Quote
 * Sarah Chen emails Connor with 4 quote options for the press release.
 * A & D → BAD (game over triggers at end of S2_03)
 * B & C → GOOD (story continues)
 *
 * Flow: read email → pick quote → Sarah's reply slides up → transition → S2_03
 */

const QUOTES = {
  A: '\u201CPlaying opposite Victor feels effortless in a way I didn\u2019t expect. We haven\u2019t started shooting yet, but our chemistry is already there.\u201D',
  B: '\u201CI\u2019m grateful for the opportunity to bring Nureyev to life. Victor is a total legend, and I\u2019m excited to dive into this story with him.\u201D',
  C: '\u201CThe challenge of learning ballet and honoring Nureyev\u2019s legacy has been humbling. Victor and I are both totally committed to telling this story right.\u201D',
  D: '\u201CWorking with Victor has been transformative in a way I can\u2019t articulate. He gets something out of me no one else has before.\u201D',
};

const EMAIL_BODY = `Connor,

We're finalizing the official feature on Ascension for Deadline tomorrow morning. They want a quote from you about the role and working with Victor.

Here are a few options we've drafted. Pick whichever feels right:

  A) ${QUOTES.A}

  B) ${QUOTES.B}

  C) ${QUOTES.C}

  D) ${QUOTES.D}

Let me know which direction by 5pm.

Best,
Sarah`;

export default function S2_02_AscensionQuote() {
  const makeChoice = useGameStore((s) => s.makeChoice);
  const goToScreen = useGameStore((s) => s.goToScreen);
  // 'reading' → 'replied' → 'transition'
  const [phase, setPhase] = useState('reading');
  const [showTransition, setShowTransition] = useState(false);

  const handleQuoteChoice = (letter) => {
    makeChoice('s2_quote', letter);
    setPhase('replied');
  };

  // Wait longer so the player can read Sarah's reply before transitioning
  useEffect(() => {
    if (phase === 'replied') {
      const timer = setTimeout(() => setShowTransition(true), 5000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  if (showTransition) {
    return (
      <TransitionScreen
        text="The next morning..."
        onTap={() => goToScreen('S2_03')}
      />
    );
  }

  return (
    <div className="flex-1 min-h-0 flex flex-col relative">
      <EmailViewer
        from={{ name: 'Sarah Chen', avatar: 'sarahChenAvatar' }}
        subject="Deadline feature: Quote needed by EOD"
        body={EMAIL_BODY}
      />

      {/* Choice buttons */}
      {phase === 'reading' && (
        <div className="flex-shrink-0 flex flex-col gap-2 p-4 bg-white border-t border-neutral-200">
          {Object.keys(QUOTES).map((letter) => (
            <button
              key={letter}
              onClick={() => handleQuoteChoice(letter)}
              className="w-full px-4 py-2.5 rounded-2xl border border-blue-400 bg-blue-50 text-blue-700 text-sm text-left active:bg-blue-100 active:scale-[0.98] transition-all"
            >
              Go with Option {letter}
            </button>
          ))}
        </div>
      )}

      {/* Sarah's reply — slides up as a second email card */}
      {phase === 'replied' && (
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-white rounded-t-3xl shadow-2xl border-t border-neutral-100 animate-slide-up">
          {/* Sheet handle */}
          <div className="w-10 h-1 bg-neutral-300 rounded-full mx-auto mt-3 mb-4" />
          <div className="px-5 pb-7">
            {/* Sender row */}
            <div className="flex items-center gap-3 mb-3">
              <img
                src={getImage('sarahChenAvatar')}
                alt=""
                className="w-9 h-9 rounded-full object-cover bg-neutral-200 flex-shrink-0"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <div>
                <p className="text-sm font-semibold text-neutral-900">Sarah Chen</p>
                <p className="text-xs text-neutral-500">to me</p>
              </div>
            </div>
            {/* Subject */}
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3">
              Re: Deadline feature: Quote needed by EOD
            </p>
            {/* Body */}
            <div className="space-y-2 text-sm text-neutral-800 leading-relaxed">
              <p>Perfect. I&rsquo;ll get this filed before end of day. Talk soon.</p>
              <p className="text-neutral-500">&mdash; Sarah</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
