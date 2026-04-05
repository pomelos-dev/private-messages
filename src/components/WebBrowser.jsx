import { useRef, useCallback } from 'react';

/**
 * WebBrowser — simulated mobile web browser with URL bar.
 *
 * Props:
 *   url         — URL string shown in address bar
 *   children    — page content (JSX)
 *   onScrollEnd — optional callback fired once when user scrolls to bottom
 */
export default function WebBrowser({ url, children, onScrollEnd }) {
  const firedRef = useRef(false);

  const handleScroll = useCallback((e) => {
    if (!onScrollEnd || firedRef.current) return;
    const el = e.target;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 30) {
      firedRef.current = true;
      onScrollEnd();
    }
  }, [onScrollEnd]);

  return (
    <div className="flex-1 min-h-0 flex flex-col bg-white">
      {/* URL bar */}
      <div className="flex-shrink-0 flex items-center gap-2 px-3 py-2 bg-neutral-100 border-b border-neutral-200">
        <div className="flex-1 flex items-center px-3 py-1.5 bg-white rounded-xl border border-neutral-200">
          <svg className="w-3.5 h-3.5 text-neutral-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
          </svg>
          <p className="text-xs text-neutral-500 truncate">{url}</p>
        </div>
      </div>

      {/* Scrollable page content */}
      <div className="flex-1 min-h-0 overflow-y-auto" onScroll={handleScroll}>
        {children}
      </div>
    </div>
  );
}
