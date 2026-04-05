import { getImage } from '../assets/images';

/**
 * VisualChoiceScreen — full-bleed image with speaker quote and choice buttons.
 *
 * Props:
 *   image   — image key for full-bleed background
 *   speaker — character name displayed above the quote
 *   quote   — on-screen dialogue text
 *   options — [{ text, onSelect }]
 */
export default function VisualChoiceScreen({ image, speaker, quote, options }) {
  return (
    <div className="flex-1 flex flex-col bg-black relative">
      {/* Full-bleed image */}
      <div className="absolute inset-0">
        <img
          src={getImage(image)}
          alt=""
          className="w-full h-full object-cover"
          onError={(e) => { e.target.className = 'w-full h-full bg-neutral-800'; }}
        />
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      </div>

      {/* Content at bottom */}
      <div className="relative flex-1 flex flex-col justify-end p-6 pb-8">
        {speaker && (
          <p className="text-neutral-300 text-xs font-medium uppercase tracking-wider mb-2">{speaker}</p>
        )}
        <p className="text-white text-lg font-medium leading-relaxed mb-6 italic">
          &ldquo;{quote}&rdquo;
        </p>
        <div className="flex flex-col gap-3">
          {options.map((opt, i) => (
            <button
              key={i}
              onClick={opt.onSelect}
              className="w-full px-5 py-3.5 rounded-2xl border border-white/30 bg-white/10 backdrop-blur-sm text-white text-sm font-medium text-left active:bg-white/20 active:scale-[0.98] transition-all"
            >
              {opt.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
