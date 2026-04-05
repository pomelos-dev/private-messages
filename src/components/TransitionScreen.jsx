import { getImage } from '../assets/images';

/**
 * TransitionScreen — black screen with centered text. Tap anywhere to continue.
 *
 * Props:
 *   text       — text to display
 *   image      — optional image key to show above text
 *   imageClass — optional override for image CSS classes
 *   onTap      — called when user taps anywhere
 */
export default function TransitionScreen({ text, image, imageClass, onTap, slow = false }) {
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
