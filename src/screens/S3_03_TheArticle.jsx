import { useState, useEffect } from 'react';
import useGameStore from '../store/gameStore';
import { getImage } from '../assets/images';
import WebBrowser from '../components/WebBrowser';

/**
 * S3_03 — The Article
 * Gossip article about Keira and Hudson.
 * After a few seconds, a rapid cascade of auto-dismissing notifications.
 * Notifications look like real Instagram / Messages notifications.
 * The final notification from Huddy stays until tapped → S3_04.
 */

// Notifications that appear and auto-dismiss at increasing speed
// type: 'ig'       → Instagram app icon, no user avatar (except hudsonw_updates)
// type: 'ig_user'  → Instagram app icon + user avatar
// type: 'messages' → Messages-style with avatar
const SPAM_NOTIFICATIONS = [
  { id: 'spam_1', type: 'ig_user', avatar: 'hudsonwUpdatesAvatar', text: 'hudsonw_updates tagged you in a post', dismissAfter: 2200 },
  { id: 'spam_2', type: 'ig',                                      text: 'hudcel9113 commented on your post',    dismissAfter: 1800 },
  { id: 'spam_3', type: 'ig',                                      text: 'mediumhud commented on your post',     dismissAfter: 1400 },
  { id: 'spam_4', type: 'ig',                                      text: 'connors_updates tagged you in a post', dismissAfter: 1100 },
  { id: 'spam_5', type: 'ig',                                      text: 'ohmyhollander tagged you in a post',   dismissAfter: 900  },
  { id: 'spam_6', type: 'ig',                                      text: 'hudconstrong tagged you in a post',    dismissAfter: 700  },
  { id: 'spam_7', type: 'messages', avatar: 'nickAvatar',          from: 'Nick', preview: 'Please check your emails', dismissAfter: 2400 },
  { id: 'spam_8', type: 'messages', avatar: 'nickAvatar',          from: 'Nick', preview: 'It\'s urgent',         dismissAfter: 500  },
];

// ── Instagram gradient icon ────────────────────────────────────────
function IGIcon({ size = 10 }) {
  return (
    <div className={`w-${size} h-${size} rounded-xl flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400`}>
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" strokeWidth={0} />
      </svg>
    </div>
  );
}

// ── Local notification banner ─────────────────────────────────────
function LocalNotif({ notif }) {
  if (!notif) return null;

  const isIG = notif.type === 'ig' || notif.type === 'ig_user';
  const isMessages = notif.type === 'messages';

  return (
    <div className="absolute top-8 left-2 right-2 z-50 animate-slide-down pointer-events-none">
      <div className="w-full flex items-center gap-3 p-3 rounded-2xl bg-neutral-800/95 backdrop-blur-md border border-neutral-700 shadow-lg">
        {/* Left icon */}
        {notif.type === 'ig_user' ? (
          <div className="relative flex-shrink-0">
            <img
              src={getImage(notif.avatar)}
              alt=""
              className="w-10 h-10 rounded-full object-cover bg-neutral-600"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-lg flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 border border-neutral-800">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
              </svg>
            </div>
          </div>
        ) : isIG ? (
          <IGIcon />
        ) : (
          <img
            src={getImage(notif.avatar)}
            alt=""
            className="w-10 h-10 rounded-full object-cover flex-shrink-0 bg-neutral-600"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        )}

        {/* Text */}
        <div className="flex-1 min-w-0">
          {isIG && (
            <p className="text-white text-xs font-semibold">Instagram</p>
          )}
          {isMessages && (
            <p className="text-white text-sm font-semibold truncate">{notif.from}</p>
          )}
          <p className={`truncate ${isIG ? 'text-neutral-300 text-sm' : 'text-neutral-300 text-sm'}`}>
            {isIG ? notif.text : notif.preview}
          </p>
        </div>

        <span className="text-neutral-500 text-xs flex-shrink-0">now</span>
      </div>
    </div>
  );
}

export default function S3_03_TheArticle() {
  const pushNotification = useGameStore((s) => s.pushNotification);
  const [localNotif, setLocalNotif] = useState(null);
  const [spamDone, setSpamDone] = useState(false);
  const [hudsonNotifShown, setHudsonNotifShown] = useState(false);

  useEffect(() => {
    let timeout;
    let spamIndex = 0;

    const showNext = () => {
      if (spamIndex >= SPAM_NOTIFICATIONS.length) {
        setSpamDone(true);
        return;
      }
      const notif = SPAM_NOTIFICATIONS[spamIndex];
      setLocalNotif(notif);
      spamIndex++;
      timeout = setTimeout(() => {
        setLocalNotif(null);
        setTimeout(showNext, 180);
      }, notif.dismissAfter);
    };

    // Start spam after 7 seconds so user has time to read the article
    const startTimer = setTimeout(showNext, 7000);
    return () => {
      clearTimeout(startTimer);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (!spamDone || hudsonNotifShown) return;
    setHudsonNotifShown(true);
    setTimeout(() => {
      pushNotification({
        id: 'n_s3_03_huddy',
        from: 'Huddy',
        avatar: 'hudsonAvatar',
        preview: 'Hey. Did you see it',
        target: 'S3_04',
      });
    }, 400);
  }, [spamDone]);

  return (
    <div className="flex-1 min-h-0 flex flex-col relative">
      <WebBrowser url="gossiprag.com/2026/keira-k-mystery-man">
        <div className="animate-fade-in" style={{ animationDuration: '0.9s' }}>
          {/* Masthead */}
          <div className="bg-pink-600 px-5 py-3 flex items-center justify-between">
            <span className="text-white text-xs font-black tracking-[0.3em] uppercase">★ Gossip Rag ★</span>
            <span className="text-pink-200 text-[10px] tracking-widest uppercase">Celebrity · Drama · Tea</span>
          </div>

          {/* Breaking tag */}
          <div className="px-5 pt-4 pb-1">
            <span className="inline-block bg-red-600 text-white text-[10px] font-black tracking-widest px-2 py-0.5 rounded uppercase">🚨 Breaking</span>
          </div>

          {/* Headline */}
          <div className="px-5 pt-2 pb-3">
            <h1 className="text-2xl font-black text-black leading-tight">
              Hudson W.'s Girlfriend Keira K. Spotted With Mystery Man
            </h1>
            <p className="text-xs text-neutral-500 mt-1.5 font-medium">By Gossip Rag Staff · Just now · ☕ 2 min read</p>
          </div>

          {/* Hero image */}
          <div className="mx-5 mb-4">
            <img
              src={getImage('keiraGossip')}
              alt=""
              className="w-full rounded-xl object-cover bg-neutral-200"
              style={{ maxHeight: 230 }}
              onError={(e) => { e.target.className = 'w-full rounded-xl bg-neutral-200 h-44'; }}
            />
            <p className="text-[10px] text-neutral-400 mt-1 italic text-center">Keira K. photographed this weekend</p>
          </div>

          {/* Body */}
          <div className="px-5 pb-5">
            <p className="text-sm text-neutral-800 leading-relaxed mb-3">
              Keira K., long-term girlfriend of actor <strong>Hudson W.</strong>, was photographed over the weekend with an unidentified companion. Fans have been quick to speculate about the state of the couple's relationship.
            </p>

            {/* Pull quote */}
            <blockquote className="border-l-4 border-pink-500 bg-pink-50 px-4 py-3 rounded-r-xl mb-3">
              <p className="text-sm text-pink-900 font-semibold italic leading-snug">"Hudson looked happier than he has in months."</p>
              <p className="text-xs text-pink-500 mt-1">— Onlooker at Hi Tops, West Hollywood</p>
            </blockquote>

            <p className="text-sm text-neutral-800 leading-relaxed mb-3">
              The timing hasn't gone unnoticed. Photos of <strong>Hudson W.</strong> appeared online late last night, taken at West Hollywood gay bar Hi Tops alongside fellow actor <strong>Connor S.</strong>, his longtime best friend and former co-star.
            </p>

            {/* Divider */}
            <div className="flex items-center gap-2 my-3">
              <div className="flex-1 h-px bg-neutral-200" />
              <span className="text-xs text-neutral-400">👀</span>
              <div className="flex-1 h-px bg-neutral-200" />
            </div>

            <p className="text-sm text-neutral-800 leading-relaxed mb-3">
              Neither Hudson W.'s nor Connor S.'s representatives responded to requests for comment. Neither actor has addressed the photos directly, though both have posted warmly about each other in recent weeks. Connor's post from a few days ago, captioned <em>"He matches my enthusiasm,"</em> now has over <strong>40,000 comments</strong>.
            </p>

            {/* Stat callout */}
            <div className="bg-neutral-900 rounded-xl px-4 py-3 mb-3 flex items-center gap-3">
              <span className="text-2xl">📈</span>
              <div>
                <p className="text-white text-sm font-bold">65,000+ likes</p>
                <p className="text-neutral-400 text-xs">@hudcon_down's "six years of evidence" thread on X</p>
              </div>
            </div>

            <p className="text-sm text-neutral-800 leading-relaxed mb-3">
              A source close to Hudson W.'s team says they are <em>"monitoring the situation."</em>
            </p>

            <p className="text-xs text-neutral-400 text-center pt-2">🔔 Turn on notifications for the latest updates</p>
          </div>
        </div>
      </WebBrowser>

      {/* Local auto-dismiss notification banner */}
      <LocalNotif notif={localNotif} />
    </div>
  );
}
