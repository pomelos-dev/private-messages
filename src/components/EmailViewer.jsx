import { useRef, useCallback } from 'react';
import { getImage } from '../assets/images';

/**
 * EmailViewer — displays an email in clean email-client style.
 *
 * Props:
 *   from        — { name, avatar (image key) }
 *   subject     — email subject line
 *   body        — email body text (plain text with \n for line breaks)
 *   onScrollEnd — optional callback fired once when user scrolls to bottom
 */
export default function EmailViewer({ from, subject, body, onScrollEnd }) {
  const firedRef = useRef(false);

  const handleScroll = useCallback((e) => {
    if (!onScrollEnd || firedRef.current) return;
    const el = e.target;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 20) {
      firedRef.current = true;
      onScrollEnd();
    }
  }, [onScrollEnd]);

  return (
    <div className="flex-1 min-h-0 flex flex-col bg-white text-black">
      {/* Inbox nav bar */}
      <div className="flex-shrink-0 flex items-center px-4 py-3 border-b border-neutral-200">
        <button
          className="text-blue-500 text-sm font-medium flex items-center gap-0.5 opacity-40 pointer-events-none"
          tabIndex={-1}
          aria-hidden
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Inbox
        </button>
      </div>

      {/* Scrollable email content */}
      <div className="flex-1 min-h-0 overflow-y-auto animate-fade-in" onScroll={handleScroll} style={{ animationDuration: '0.9s' }}>
        {/* Sender + subject */}
        <div className="border-b border-neutral-200 px-5 py-4">
          <div className="flex items-center gap-3 mb-3">
            <img
              src={getImage(from.avatar)}
              alt=""
              className="w-10 h-10 rounded-full object-cover bg-neutral-200"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div>
              <p className="text-sm font-semibold text-neutral-900">{from.name}</p>
              <p className="text-xs text-neutral-500">to me</p>
            </div>
          </div>
          <h1 className="text-lg font-bold text-neutral-900">{subject}</h1>
        </div>

        {/* Body */}
        <div className="px-5 py-4">
          {body.split('\n').map((line, i) => (
            <p key={i} className={`text-sm text-neutral-800 leading-relaxed ${line === '' ? 'h-4' : ''}`}>
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
