import { IMAGES } from '../assets/images';
import NotificationBanner from './NotificationBanner';

/**
 * PhoneShell — wraps all content in a phone-shaped frame.
 * On desktop: centered with bezel. On mobile: fills viewport.
 *
 * Props:
 *   children  — screen content
 *   darkMode  — true for dark status bar, false for light (default: true)
 */
export default function PhoneShell({ children, darkMode = true }) {
  const statusBarColor = darkMode ? 'bg-black text-white' : 'bg-white text-black';

  return (
    <div className="min-h-dvh flex items-center justify-center bg-neutral-900 p-0 sm:p-4">
      {/* Phone frame */}
      <div className="relative w-full max-w-[390px] h-dvh sm:h-[844px] sm:rounded-[44px] sm:border-[6px] sm:border-neutral-700 overflow-hidden flex flex-col bg-black shadow-2xl">
        {/* Status bar */}
        <div className={`flex-shrink-0 flex items-center justify-between px-6 pt-3 pb-1 text-xs font-medium ${statusBarColor}`}>
          <span>9:41</span>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M2 17h2v4H2zm4-5h2v9H6zm4-4h2v13h-2zm4-3h2v16h-2zm4-3h2v19h-2z"/></svg>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.34C7 21.4 7.6 22 8.33 22h7.34c.73 0 1.33-.6 1.33-1.33V5.33C17 4.6 16.4 4 15.67 4z"/></svg>
          </div>
        </div>

        {/* Notification layer */}
        <NotificationBanner />

        {/* Screen content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
}
