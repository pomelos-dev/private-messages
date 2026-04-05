import { useState, useEffect } from 'react';
import useGameStore from '../store/gameStore';
import { getImage } from '../assets/images';
import WebBrowser from '../components/WebBrowser';
import GameOverPopup from '../components/GameOverPopup';
import EndingAnimation from '../components/EndingAnimation';

/**
 * S2_03 — Ascension Announcement
 * Deadline article with the player's chosen quote.
 * After tapping the share button:
 *   BAD quote (A/D) → 3s pause → bad animation → game over
 *   GOOD quote (B/C) → 3s pause → Victor notification → S2_04
 */

const QUOTES = {
  A: 'Connor S. said of the project: \u201CPlaying opposite Victor feels effortless in a way I didn\u2019t expect. We haven\u2019t started shooting yet, but our chemistry is already there.\u201D',
  B: 'Connor S. said of the project: \u201CI\u2019m grateful for the opportunity to bring Nureyev to life. Victor is a total legend, and I\u2019m excited to dive into this story with him.\u201D',
  C: 'Connor S. said of the project: \u201CThe challenge of learning ballet and honoring Nureyev\u2019s legacy has been humbling. Victor and I are both totally committed to telling this story right.\u201D',
  D: 'Connor S. said of the project: \u201CWorking with Victor has been transformative in a way I can\u2019t articulate. He gets something out of me no one else has before.\u201D',
};

export default function S2_03_AscensionAnnouncement() {
  const choices = useGameStore((s) => s.choices);
  const pushNotification = useGameStore((s) => s.pushNotification);

  const quoteLetter = choices.s2_quote || 'B';
  const isBad = quoteLetter === 'A' || quoteLetter === 'D';

  const [shared, setShared] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);

  useEffect(() => {
    if (!shared) return;

    const timer = setTimeout(() => {
      if (isBad) {
        setShowAnimation(true);
      } else {
        pushNotification({
          id: 'n_s2_03_victor',
          from: 'Victor Hallberg',
          avatar: 'victorAvatar',
          preview: 'I just saw the announcement. You should be proud.',
          target: 'S2_04',
        });
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [shared]);

  return (
    <div className="flex-1 min-h-0 flex flex-col relative">
      <WebBrowser
        url="deadline.com/2026/ascension-biopic-casting"
      >
        <div className="animate-fade-in" style={{ animationDuration: '0.9s' }}>
          {/* Deadline masthead */}
          <div className="border-b border-neutral-200 px-5 py-4">
            <p className="text-xs font-bold tracking-widest text-neutral-400 uppercase">Deadline</p>
          </div>

          {/* Article */}
          <div className="px-5 py-5">
            <h1 className="text-xl font-bold text-black leading-tight mb-4">
              Connor S. and Victor Hallberg Set to Star in Nureyev Biopic &lsquo;Ascension&rsquo;
            </h1>

            {/* Headshot images — full-width split */}
            <div className="flex gap-2 mb-4">
              <img
                src={getImage('connorHeadshot')}
                alt="Connor S."
                className="flex-1 h-44 rounded-lg object-cover object-top bg-neutral-200"
                onError={(e) => { e.target.className = 'flex-1 h-44 rounded-lg bg-neutral-200'; }}
              />
              <img
                src={getImage('victorAvatar')}
                alt="Victor Hallberg"
                className="flex-1 h-44 rounded-lg object-cover object-top bg-neutral-200"
                onError={(e) => { e.target.className = 'flex-1 h-44 rounded-lg bg-neutral-200'; }}
              />
            </div>

            <p className="text-xs text-neutral-500 uppercase font-medium mb-4">
              Production begins this month in Los Angeles
            </p>

            <div className="space-y-4 text-[0.875rem] text-neutral-800 leading-[1.65]">
              <p>
                Victor Hallberg and Connor S. are set to star in <em>Ascension</em>, the
                highly anticipated biopic about legendary ballet dancer Rudolf Nureyev.
                Hallberg will play Erik Bruhn, Nureyev&rsquo;s longtime partner and artistic
                collaborator, opposite Connor S.&rsquo;s Nureyev. Filming begins this month in
                Los Angeles under the direction of acclaimed filmmaker James Okafor.
              </p>

              {/* Player's chosen quote — styled as a pull-quote */}
              <blockquote className="border-l-4 border-neutral-300 pl-3 py-0.5 text-neutral-600 italic">
                {QUOTES[quoteLetter]}
              </blockquote>

              <p>
                When asked about their collaboration, Hallberg added: &ldquo;My instincts as an actor
                told me immediately that Connor was Nureyev. There is something deeply
                alive in the way he inhabits a role. I look forward to exploring
                that together.&rdquo;
              </p>

              <p>
                <em>Ascension</em> is slated for a late fall release ahead of awards season.
              </p>
            </div>
          </div>

          {/* Share button */}
          <div className="px-5 pb-8 pt-2">
            <button
              onClick={() => setShared(true)}
              disabled={shared}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-semibold transition-all ${
                shared
                  ? 'bg-blue-100 text-blue-400 cursor-default'
                  : 'bg-blue-500 text-white active:bg-blue-600 active:scale-[0.98]'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path d="M13 4.5a2.5 2.5 0 1 1 .702 1.737L6.97 9.604a2.518 2.518 0 0 1 0 .792l6.733 3.367a2.5 2.5 0 1 1-.671 1.341l-6.733-3.367a2.5 2.5 0 1 1 0-3.474l6.733-3.367A2.52 2.52 0 0 1 13 4.5Z" />
              </svg>
              {shared ? 'Shared' : 'Share'}
            </button>
          </div>
        </div>
      </WebBrowser>

      {/* Bad ending animation */}
      {showAnimation && (
        <EndingAnimation type="bad" onDone={() => {
          setShowAnimation(false);
          setShowGameOver(true);
        }} />
      )}

      {showGameOver && (
        <GameOverPopup
          message="Hudson read your quote. Something shifts."
          retryScreen="S2_02"
          restartScreen="S2_01"
          restartLabel="Restart Chapter 2"
          variant="bad"
        />
      )}
    </div>
  );
}
