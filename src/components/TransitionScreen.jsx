import { getImage } from '../assets/images';

/**
 * TransitionScreen — black screen with centered text. Tap anywhere to continue.
 *
 * Props:
 *   text       — text to display
 *   image      — optional image key to show
 *   imageClass — optional override for image CSS classes (non-fullscreen mode)
 *   fullscreen — if true, image fills the entire screen
 *   quote      — optional quote text to overlay on fullscreen image
 *   speaker    — optional speaker label to overlay on fullscreen image
 *   onTap      — called when user taps anywhere
 *   slow       — use slower fade animation (text fades in over 4s; tap hint appears after)
 */
export default function TransitionScreen({ text, image, imageClass, onTap, slow = false, fullscreen = false, quote, speaker }) {
  // Full-screen image mode — image covers everything, optional quote overlay, "tap to continue" at bottom
  if (fullscreen && image) {
    return (
      <button
        onClick={onTap}
        className="flex-1 relative overflow-hidden bg-black"
      >
        <img
          src={getImage(image)}
          alt=""
          className="absolute inset-0 w-full h-full object-cover animate-fade-in"
          onError={(e) => { e.target.style.display = 'none'; }}
        />

        {/* Quote / speaker overlay */}
        {(speaker || quote) && (
          <div className="absolute bottom-24 left-0 right-0 px-8 text-center animate-fade-in-delayed pointer-events-none">
            {speaker && (
              <p className="text-white/50 text-xs uppercase tracking-widest mb-1">{speaker}</p>
            )}
            {quote && (
              <p className="text-white/90 text-sm italic leading-relaxed">&ldquo;{quote}&rdquo;</p>
            )}
          </div>
        )}

        <p className="absolute bottom-8 left-0 right-0 text-center text-white/50 text-xs animate-fade-in-delayed pointer-events-none">
          Tap anywhere to continue
        </p>
      </button>
    );
  }

  const defaultImageClass = 'w-[85%] aspect-[3/4] rounded-2xl object-cover mb-4 animate-fade-in';
  return (
    <button
      onClick={onTap}
      className="flex-1 flex flex-col items-center justify-center bg-black px-8 text-center"
    >
      {image && (
        <img
          src={getImage(image)}
          alt=""
          className={imageClass || defaultImageClass}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      )}
      {text && (
        <p className={`text-white text-lg font-light italic ${slow ? 'animate-fade-in-delayed-slow' : 'animate-fade-in'}`}>
          {text}
        </p>
      )}
      {/* Tap hint — delayed longer for slow text so it appears after the title finishes fading in */}
      <p className={`text-neutral-600 text-xs mt-8 ${slow ? 'animate-fade-in-very-delayed' : 'animate-fade-in-delayed'}`}>
        Tap anywhere to continue
      </p>
    </button>
  );
}
