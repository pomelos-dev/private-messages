import { getImage } from '../assets/images';

/**
 * RecentCallsViewer — simulated iPhone Phone app "Recents" tab.
 *
 * Props:
 *   contact    — { name, avatar (image key) }
 *   missedAt   — time string for the missed call (e.g. "11:45 AM")
 *   onCallBack — called when player taps "Call Back"
 *   onText     — called when player taps "Send a Text"
 */
export default function RecentCallsViewer({ contact, missedAt, onCallBack, onText }) {
  return (
    <div className="flex-1 min-h-0 flex flex-col bg-black">
      {/* Header */}
      <div className="flex-shrink-0 flex items-center justify-between px-5 pt-4 pb-2">
        <button className="text-blue-400 text-sm font-medium opacity-30 pointer-events-none">Edit</button>
        <span className="text-white font-semibold text-base">Recents</span>
        <button className="text-blue-400 text-sm font-medium opacity-30 pointer-events-none">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m-7-7h14" />
          </svg>
        </button>
      </div>

      {/* All / Missed segmented control */}
      <div className="flex-shrink-0 flex mx-5 mb-4 rounded-lg bg-neutral-800 p-0.5">
        <button className="flex-1 py-1.5 rounded-md text-xs font-medium text-white bg-neutral-600">All</button>
        <button className="flex-1 py-1.5 rounded-md text-xs font-medium text-neutral-400">Missed</button>
      </div>

      {/* Missed call entry */}
      <div className="flex-1 px-4">
        <div className="flex items-center gap-4 py-3 border-b border-neutral-800">
          {/* Red missed call icon */}
          <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>

          {/* Contact info */}
          <div className="flex-1 min-w-0">
            <p className="text-red-400 font-medium text-base">{contact.name}</p>
            <p className="text-neutral-500 text-xs mt-0.5">missed call · {missedAt}</p>
          </div>

          {/* Info button */}
          <button className="w-7 h-7 rounded-full border border-neutral-700 flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex-shrink-0 flex flex-col gap-3 px-6 py-8">
        <button
          onClick={onCallBack}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-green-600 text-white font-semibold text-base active:bg-green-700 active:scale-[0.98] transition-all"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
          </svg>
          Call Back
        </button>
        <button
          onClick={onText}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-neutral-800 text-white font-semibold text-base active:bg-neutral-700 active:scale-[0.98] transition-all border border-neutral-700"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          Send a Text
        </button>
      </div>

      {/* Bottom tab bar (decorative) */}
      <div className="flex-shrink-0 flex items-center justify-around px-8 py-3 border-t border-neutral-800">
        {[
          { icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z', label: 'Favorites' },
          { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', label: 'Recents', active: true },
          { icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', label: 'Contacts' },
          { icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', label: 'Keypad' },
          { icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9', label: 'Voicemail' },
        ].map(({ icon, label, active }) => (
          <button key={label} className={`flex flex-col items-center gap-0.5 ${active ? 'text-blue-400' : 'text-neutral-600'}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
            </svg>
            <span className="text-[9px]">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
