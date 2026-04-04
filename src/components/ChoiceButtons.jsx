/**
 * ChoiceButtons — renders 2–3 tappable choice buttons.
 *
 * Props:
 *   options   — array of { text, goto? }
 *   onSelect  — called with the selected option object
 */
export default function ChoiceButtons({ options, onSelect }) {
  return (
    <div className="flex-shrink-0 flex flex-col gap-2 p-4 pb-4">
      {options.map((option, i) => (
        <button
          key={i}
          onClick={() => onSelect(option)}
          className="w-full px-4 py-2.5 rounded-2xl border border-blue-400 bg-blue-500/20 text-blue-200 text-sm text-left active:bg-blue-500/40 active:scale-[0.98] transition-all"
        >
          {option.text}
        </button>
      ))}
    </div>
  );
}
