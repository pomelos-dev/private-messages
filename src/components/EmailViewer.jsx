import { getImage } from '../assets/images';

/**
 * EmailViewer — displays an email in clean email-client style.
 *
 * Props:
 *   from    — { name, avatar (image key) }
 *   subject — email subject line
 *   body    — email body text (plain text with \n for line breaks)
 */
export default function EmailViewer({ from, subject, body }) {
  return (
    <div className="flex-1 bg-white text-black overflow-y-auto">
      {/* Header */}
      <div className="border-b border-neutral-200 px-5 py-4">
        <div className="flex items-center gap-3 mb-3">
          <img
            src={getImage(from.avatar)}
            alt=""
            className="w-10 h-10 rounded-full object-cover bg-neutral-200"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
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
  );
}
