import useGameStore from '../store/gameStore';

/**
 * GameOverPopup — overlay for bad endings and chapter complete.
 *
 * Props:
 *   title        — popup title (default: "Game Over")
 *   message      — explanation text
 *   retryScreen  — screen ID for "Try a different response" (omit for chapter complete)
 *   options      — optional custom button list: [{ text, action: screenId | 'close' }]
 */
export default function GameOverPopup({
  title = 'Game Over',
  message,
  retryScreen,
  options,
}) {
  const goToScreen = useGameStore((s) => s.goToScreen);

  // Default buttons for game over
  const defaultOptions = [
    retryScreen && { text: 'Try a different response', action: retryScreen },
    { text: 'Restart Chapter 1', action: 'S1_01' },
    { text: 'Return to main menu', action: 'S0' },
  ].filter(Boolean);

  const buttons = options || defaultOptions;

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">
      <div className="w-full max-w-xs bg-neutral-900 rounded-2xl border border-neutral-700 p-6 text-center">
        <h2 className="text-white text-xl font-bold mb-2">{title}</h2>
        <p className="text-neutral-400 text-sm mb-6">{message}</p>

        <div className="flex flex-col gap-2">
          {buttons.map((btn, i) => (
            <button
              key={i}
              onClick={() => {
                if (btn.action === 'close') {
                  // Parent handles close via onClose prop or similar
                  btn.onClose?.();
                } else {
                  goToScreen(btn.action);
                }
              }}
              className={`w-full px-4 py-3 rounded-xl text-sm font-medium transition-all active:scale-[0.98] ${
                i === 0
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
              }`}
            >
              {btn.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
