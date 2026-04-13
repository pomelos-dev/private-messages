import { useState, useEffect } from 'react';
import useGameStore from '../store/gameStore';
import { getImage } from '../assets/images';

/**
 * NotificationBanner — renders the first notification in the queue.
 * Persists until tapped. Tapping navigates to the target screen.
 */
export default function NotificationBanner() {
  const notifications = useGameStore((s) => s.notifications);
  const dismissNotification = useGameStore((s) => s.dismissNotification);
  const goToScreen = useGameStore((s) => s.goToScreen);

  const [avatarError, setAvatarError] = useState(false);
  const notifId = notifications[0]?.id;

  // Reset avatar error when a new notification arrives
  useEffect(() => {
    setAvatarError(false);
  }, [notifId]);

  if (notifications.length === 0) return null;

  const notif = notifications[0];

  const handleTap = () => {
    dismissNotification(notif.id);
    if (notif.target) {
      goToScreen(notif.target);
    }
    // If notif has an onTap callback (for Instagram internal nav), call it
    if (notif.onTap) {
      notif.onTap();
    }
  };

  return (
    <div className="absolute top-8 left-2 right-2 z-50 animate-slide-down">
      <button
        onClick={handleTap}
        className="w-full flex items-center gap-3 p-3 rounded-2xl bg-neutral-800/95 backdrop-blur-md border border-neutral-700 shadow-lg text-left active:scale-[0.98] transition-transform"
      >
        {/* Avatar — falls back to a letter circle if image is missing */}
        {!avatarError && getImage(notif.avatar) ? (
          <img
            src={getImage(notif.avatar)}
            alt=""
            className="w-10 h-10 rounded-full object-cover flex-shrink-0 bg-neutral-600"
            onError={() => setAvatarError(true)}
          />
        ) : (
          <div className="w-10 h-10 rounded-full flex-shrink-0 bg-neutral-600 flex items-center justify-center">
            <span className="text-white text-sm font-bold">
              {(notif.from || '?')[0].toUpperCase()}
            </span>
          </div>
        )}

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-semibold truncate">
            {notif.from}
          </p>
          <p className="text-neutral-300 text-sm truncate">
            {notif.preview}
          </p>
        </div>

        {/* "now" label */}
        <span className="text-neutral-500 text-xs flex-shrink-0">now</span>
      </button>
    </div>
  );
}
