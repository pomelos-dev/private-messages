import useGameStore from '../store/gameStore';

/**
 * GameOverPopup — overlay for bad endings and chapter complete.
 *
 * Props:
 *   title        — popup title (default: "Game Over")
 *   message      — explanation text
 *   retryScreen  — screen ID for "Try a different response" (omit for chapter complete)
 *   options      — optional custom button list: [{ text, action: screenId | 'close' }]
 *   variant      — 'default' | 'bad' | 'good' — changes colour treatment
 */
export default function GameOverPopup({
  title = 'Game Over',
  subtitle,
  message,
  retryScreen,
  options,
  variant = 'default',
  restartScreen = 'S1_01',
  restartLabel = 'Restart Chapter 1',
}) {
  const goToScreen = useGameStore((s) => s.goToScreen);

  // Default buttons for game over
  const defaultOptions = [
    retryScreen && { text: 'Try a different response', action: retryScreen },
    { text: restartLabel, action: restartScreen },
    { text: 'Return to main menu', action: 'S0' },
  ].filter(Boolean);

  const buttons = options || defaultOptions;

  const isBad  = variant === 'bad';
  const isGood = variant === 'good';

  const overlayClass = isBad
    ? 'bg-red-950/85 backdrop-blur-sm'
    : 'bg-black/80 backdrop-blur-sm';

  const cardClass = isBad
    ? 'bg-neutral-950 border-red-900'
    : 'bg-neutral-900 border-neutral-700';

  const titleClass = isBad
    ? 'text-red-400'
    : isGood
    ? 'text-blue-300'
    : 'text-white';

  const primaryBtnClass = isBad
    ? 'bg-red-700 text-white hover:bg-red-600'
    : 'bg-blue-500 text-white hover:bg-blue-600';

  return (
    <div className={`absolute inset-0 z-40 flex items-center justify-center p-6 ${overlayClass}`}>
      <div className={`w-full max-w-xs rounded-2xl border p-6 text-center ${cardClass}`}>
        <h2 className={`text-xl font-bold mb-1 ${titleClass}`}>{title}</h2>
        {subtitle && (
          <p className="text-blue-400 text-sm font-semibold mb-2">{subtitle}</p>
        )}
        <p className="text-neutral-400 text-sm mb-6 whitespace-pre-line">{message}</p>

        <div className="flex flex-col gap-2">
          {buttons.map((btn, i) => (
            <button
              key={i}
              onClick={() => {
                if (btn.action === 'close') {
                  btn.onClose?.();
                } else {
                  goToScreen(btn.action);
                }
              }}
              className={`w-full px-4 py-3 rounded-xl text-sm font-medium transition-all active:scale-[0.98] ${
                i === 0
                  ? primaryBtnClass
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
