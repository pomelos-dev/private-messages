/**
 * TransitionScreen — black screen with centered text. Tap anywhere to continue.
 *
 * Props:
 *   text   — text to display
 *   onTap  — called when user taps anywhere
 */
export default function TransitionScreen({ text, onTap, slow = false }) {
  return (
    <button
      onClick={onTap}
      className="flex-1 flex flex-col items-center justify-center bg-black px-8 text-center"
    >
      <p className={`text-white text-lg font-light italic ${slow ? 'animate-fade-in-night' : 'animate-fade-in'}`}>
        {text}
      </p>
      <p className={`text-neutral-600 text-xs mt-8 ${slow ? 'animate-fade-in-night' : 'animate-fade-in-delayed'}`}
         style={slow ? { animationDelay: '2s' } : undefined}>
        Tap anywhere to continue
      </p>
    </button>
  );
}
