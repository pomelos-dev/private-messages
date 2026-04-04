/**
 * ChoiceButtons — renders 2–3 tappable choice buttons.
 *
 * Props:
 *   options   — array of { text, goto? }
 *   onSelect  — called with the selected option object
 */
export default function ChoiceButtons({ options, onSelect }) {
  return (
    <div className="flex flex-col gap-2 p-4 pb-6">
      {options.map((option, i) => (
        <button
          key={i}
          onClick={() => onSelect(option)}
          className="w-full px-4 py-3 rounded-2xl border border-blue-400/50 bg-blue-500/10 text-blue-300 text-sm text-left active:bg-blue-500/30 active:scale-[0.98] transition-all hover:bg-blue-500/20"
        >
          {option.text}
        </button>
      ))}
    </div>
  );
}
