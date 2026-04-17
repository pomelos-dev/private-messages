import { useState } from 'react';
import useGameStore from '../store/gameStore';
import { getImage } from '../assets/images';
import WebBrowser from '../components/WebBrowser';

/**
 * S3_06_C — Do Nothing
 * TMZ article: silence makes it worse. Scandal intensifies.
 * Player scrolls to bottom, taps Like or Dislike → Huddy notification → S3_07_C.
 */

export default function S3_06_DoNothing() {
  const pushNotification = useGameStore((s) => s.pushNotification);
  const [reacted, setReacted] = useState(false);

  const handleReaction = () => {
    if (reacted) return;
    setReacted(true);
    setTimeout(() => {
      pushNotification({
        id: 'n_s3_06c_huddy',
        from: 'Huddy',
        avatar: 'hudsonAvatar',
        preview: 'Is your inbox as bad as mine is',
        target: 'S3_07_C',
      });
    }, 600);
  };

  return (
    <WebBrowser url="tmz.com/2026/hudson-w-split-fallout">
      <div className="animate-fade-in" style={{ animationDuration: '0.9s' }}>
        {/* TMZ masthead */}
        <div className="bg-black px-5 py-2.5 flex items-center justify-between">
          <div className="w-5" />
          <p className="text-xl font-black text-white tracking-tight">
            <span className="text-yellow-400">T</span>
            <span className="text-yellow-400">M</span>
            <span className="text-yellow-400">Z</span>
          </p>
          <div className="w-5" />
        </div>

        <div className="px-5 py-4">
          {/* Breaking tag */}
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-red-600 text-white text-[10px] font-black tracking-widest px-2 py-0.5 rounded uppercase">🔴 LIVE</span>
            <span className="text-[10px] text-neutral-500 font-medium uppercase tracking-wide">Entertainment · Trending Now</span>
          </div>

          {/* Headline — large and aggressive */}
          <h1 className="text-2xl font-black text-black leading-tight mb-1 uppercase">
            Hudson W. Breakup Fallout Continues:<br />Was Connor S. Involved??
          </h1>
          <p className="text-xs text-neutral-500 mb-4">3 days ago · Updated continuously · <span className="text-red-500 font-semibold">🔥 Trending</span></p>

          {/* Images */}
          <div className="flex gap-2 mb-4">
            <img
              src={getImage('hudconWalking')}
              alt=""
              className="flex-1 h-40 rounded-lg object-cover bg-neutral-200"
              onError={(e) => { e.target.className = 'flex-1 h-40 rounded-lg bg-neutral-200'; }}
            />
            <img
              src={getImage('hudsonConnorWestHollywood')}
              alt=""
              className="flex-1 h-40 rounded-lg object-cover bg-neutral-200"
              onError={(e) => { e.target.className = 'flex-1 h-40 rounded-lg bg-neutral-200'; }}
            />
          </div>

          <p className="text-sm text-neutral-800 leading-relaxed mb-3">
            Three days after photos of <strong>Hudson W.</strong> and former co-star <strong>Connor S.</strong> surfaced online, the story shows no signs of cooling down... and the conversation has taken a darker turn.
          </p>

          {/* Tweet-style callout */}
          <div className="bg-neutral-950 rounded-xl px-4 py-3 mb-3">
            <p className="text-white text-sm font-bold leading-snug">"The silence is the story now."</p>
            <p className="text-neutral-400 text-xs mt-1">— Entertainment reporter on X · 142K impressions</p>
          </div>

          <p className="text-sm text-neutral-800 leading-relaxed mb-3">
            With neither actor nor their representatives offering any comment, fans and tabloid observers have begun filling the silence themselves. A thread on X cataloguing their interactions over the past six years has gathered over <strong>90,000 likes</strong>.
          </p>

          {/* Trending callout */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 px-4 py-3 rounded-r-xl mb-3">
            <p className="text-xs font-black text-yellow-700 uppercase tracking-wide mb-1">🔥 Globally Trending — Day 3</p>
            <p className="text-sm text-yellow-900 font-semibold">#hudconisreal · #WhoEndedIt</p>
          </div>

          <p className="text-sm text-neutral-800 leading-relaxed mb-3">
            A source close to Hudson W.'s team says the actor is "frustrated" by the ongoing speculation. Connor S.'s team has not responded to requests for comment.
          </p>

          {/* Engagement bar */}
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-neutral-200" />
            <p className="text-xs text-neutral-400 font-medium">What do you think?</p>
            <div className="flex-1 h-px bg-neutral-200" />
          </div>

          {/* Like / Dislike */}
          {!reacted ? (
            <div className="flex gap-3 pb-6">
              <button
                onClick={handleReaction}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-neutral-900 text-sm text-white font-semibold active:bg-neutral-700 transition-all"
              >
                <span className="text-lg">🔥</span> Real
              </button>
              <button
                onClick={handleReaction}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border border-neutral-200 text-sm text-neutral-600 active:bg-neutral-100 transition-all"
              >
                <span className="text-lg">🙄</span> Overblown
              </button>
            </div>
          ) : (
            <div className="py-4 pb-6 text-center text-xs text-neutral-400">Thanks for voting</div>
          )}
        </div>
      </div>
    </WebBrowser>
  );
}
