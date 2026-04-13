/**
 * CommentPicker — bottom-sheet overlay for leaving a comment on an Instagram post.
 * Renders as a fixed bottom bar with preset comment options.
 *
 * Props:
 *   options    — [{ text: string }] — 2-3 comment options
 *   username   — commenter's username shown in the input row
 *   onSelect   — (option) => void — fires when player picks and taps Post
 */
export default function CommentPicker({ options, username, onSelect }) {
  return (
    <div className="flex-shrink-0 border-t border-neutral-200 bg-white">
      {/* Prompt label */}
      <div className="px-4 pt-3 pb-2">
        <p className="text-xs text-neutral-500 text-center">Add a comment as <span className="font-semibold text-neutral-700">@{username}</span></p>
      </div>

      {/* Comment options */}
      <div className="flex flex-col gap-2 px-4 pb-4">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => onSelect(opt)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-2xl border border-neutral-200 bg-neutral-50 text-sm text-black text-left active:bg-neutral-100 active:scale-[0.98] transition-all"
          >
            <span>{opt.text}</span>
            <span className="text-blue-500 font-semibold text-xs ml-3 flex-shrink-0">Post</span>
          </button>
        ))}
      </div>
    </div>
  );
}
