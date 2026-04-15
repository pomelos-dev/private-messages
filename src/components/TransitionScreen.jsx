import { getImage } from '../assets/images';

/**
 * TransitionScreen — black screen with centered text. Tap anywhere to continue.
 *
 * Props:
 *   text       — text to display
 *   image      — optional image key to show
 *   imageClass — optional override for image CSS classes (non-fullscreen mode)
 *   fullscreen — if true, image fills the entire screen
 *   onTap      — called when user taps anywhere
 *   slow       — use slower fade animation
 */
export default function TransitionScreen({ text, image, imageClass, onTap, slow = false, fullscreen = false }) {
  // Full-screen image mode — image covers everything, "tap to continue" overlays at bottom
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
        <p className={`absolute bottom-8 left-0 right-0 text-center text-white/50 text-xs ${slow ? 'animate-fade-in-night' : 'animate-fade-in-delayed'}`}
           style={slow ? { animationDelay: '2s' } : undefined}>
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
        <p className={`text-white text-lg font-light italic ${slow ? 'animate-fade-in-night' : 'animate-fade-in'}`}>
          {text}
        </p>
      )}
      <p className={`text-neutral-600 text-xs mt-8 ${slow ? 'animate-fade-in-night' : 'animate-fade-in-delayed'}`}
         style={slow ? { animationDelay: '2s' } : undefined}>
        Tap anywhere to continue
      </p>
    </button>
  );
}
