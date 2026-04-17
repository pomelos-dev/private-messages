import { useState } from 'react';
import useGameStore from '../store/gameStore';
import { getImage } from '../assets/images';
import WebBrowser from '../components/WebBrowser';

/**
 * S3_06_A — The Statement
 * People article: Hudson and Connor's coordinated statements backfire.
 * Player scrolls to bottom, taps Like or Dislike → Huddy notification → S3_07_A.
 */

export default function S3_06_TheStatement() {
  const pushNotification = useGameStore((s) => s.pushNotification);
  const [reacted, setReacted] = useState(false);

  const handleReaction = () => {
    if (reacted) return;
    setReacted(true);
    setTimeout(() => {
      pushNotification({
        id: 'n_s3_06a_huddy',
        from: 'Huddy',
        avatar: 'hudsonAvatar',
        preview: 'Hey',
        target: 'S3_07_A',
      });
    }, 600);
  };

  return (
    <WebBrowser url="people.com/2026/hudson-w-confirms-keira-k-split">
      <div className="animate-fade-in" style={{ animationDuration: '0.9s' }}>
        {/* People masthead */}
        <div className="border-b border-neutral-200 px-5 py-3 flex items-center justify-between">
          <div className="w-5" />
          <p className="text-2xl font-black text-red-600 tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>PEOPLE</p>
          <div className="w-5" />
        </div>

        <div className="px-5 py-5">
          {/* Category tag */}
          <p className="text-xs font-bold tracking-widest text-red-600 uppercase mb-2">Celebrity News</p>

          {/* Headline */}
          <h1 className="text-xl font-bold text-black leading-tight mb-1" style={{ fontFamily: 'Georgia, serif' }}>
            Hudson W. Confirms Split from Keira K.; Connor S. Says "I Was Just There as a Friend"
          </h1>

          {/* Byline */}
          <p className="text-xs text-neutral-400 mb-4">By People Staff · Updated 4 minutes ago</p>

          {/* Side-by-side images */}
          <div className="flex gap-2 mb-4">
            <div className="flex-1">
              <img
                src={getImage('hudconSelfie')}
                alt=""
                className="w-full h-44 rounded-lg object-cover bg-neutral-200"
                onError={(e) => { e.target.className = 'w-full h-44 rounded-lg bg-neutral-200'; }}
              />
              <p className="text-[10px] text-neutral-400 mt-1 text-center">Hudson W. & Connor S.</p>
            </div>
            <div className="flex-1">
              <img
                src={getImage('keiraGossip')}
                alt=""
                className="w-full h-44 rounded-lg object-cover bg-neutral-200"
                onError={(e) => { e.target.className = 'w-full h-44 rounded-lg bg-neutral-200'; }}
              />
              <p className="text-[10px] text-neutral-400 mt-1 text-center">Keira K.</p>
            </div>
          </div>

          {/* Body */}
          <p className="text-sm text-neutral-800 leading-relaxed mb-3">
            <strong>Hudson W.</strong> has released a statement confirming the end of his relationship with <strong>Keira K.</strong>, following photographs taken earlier this week at a West Hollywood gay bar alongside former co-star <strong>Connor S.</strong>
          </p>

          {/* Pull quote */}
          <div className="border-t-4 border-red-600 pt-3 pb-3 mb-3">
            <p className="text-base font-bold text-black leading-snug italic" style={{ fontFamily: 'Georgia, serif' }}>
              "I was just there for Hudson as a friend. <em>Nothing more.</em>"
            </p>
            <p className="text-xs text-neutral-500 mt-1">— Connor S., via representative</p>
          </div>

          <p className="text-sm text-neutral-800 leading-relaxed mb-3">
            "Keira and I ended our relationship some time ago," Hudson's statement reads via <em>The Hollywood Reporter</em>. "It was a mutual decision and she's still a close friend of mine."
          </p>

          <p className="text-sm text-neutral-800 leading-relaxed mb-3">
            These statements have done little to quiet speculation online. If anything, the speed and coordination of the denial has only sharpened fan theories about the reason for the split.
          </p>

          {/* Stat callout box */}
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-3">
            <p className="text-xs font-bold text-red-600 uppercase tracking-wide mb-1">Reader Reaction</p>
            <p className="text-sm text-red-900 italic leading-snug">"those two will never beat the cheating allegations #watchthisspace"</p>
            <p className="text-xs text-red-400 mt-1">— Top comment on THR's Instagram · 80K+ likes</p>
          </div>

          <p className="text-sm text-neutral-800 leading-relaxed mb-3">
            The hashtag <strong>#NothingMore</strong> is currently trending alongside <strong>#WhoEndedIt</strong>. Neither party has posted since the statements were released.
          </p>

          {/* Divider */}
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-neutral-200" />
            <p className="text-xs text-neutral-400 font-medium">Was this story helpful?</p>
            <div className="flex-1 h-px bg-neutral-200" />
          </div>

          {/* Like / Dislike */}
          {!reacted ? (
            <div className="flex gap-3 pb-6">
              <button
                onClick={handleReaction}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border border-neutral-200 text-sm text-neutral-600 active:bg-neutral-100 transition-all"
              >
                <span className="text-lg">👍</span> Helpful
              </button>
              <button
                onClick={handleReaction}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border border-neutral-200 text-sm text-neutral-600 active:bg-neutral-100 transition-all"
              >
                <span className="text-lg">👎</span> Not helpful
              </button>
            </div>
          ) : (
            <div className="py-4 pb-6 text-center text-xs text-neutral-400">Thanks for your feedback</div>
          )}
        </div>
      </div>
    </WebBrowser>
  );
}
