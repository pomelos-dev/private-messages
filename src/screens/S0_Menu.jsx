import useGameStore from '../store/gameStore';

/**
 * S0 — Main Menu
 */
export default function S0_Menu() {
  const goToScreen = useGameStore((s) => s.goToScreen);

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-black px-8 text-center">
      {/* Title */}
      <h1 className="text-white text-3xl font-bold tracking-tight mb-1">
        Private Messages
      </h1>
      <p className="text-neutral-400 text-sm mb-3">
        An Interactive Mobile Story
      </p>
      <p className="text-neutral-500 text-xs italic mb-12 max-w-[260px]">
        In public, they're best friends. This is everything else…
      </p>

      {/* Chapter list */}
      <div className="w-full max-w-[280px] space-y-3">
        {/* Chapter 1 — active */}
        <button
          onClick={() => goToScreen('S1_01')}
          className="w-full px-5 py-4 rounded-2xl bg-blue-500 text-white text-left active:bg-blue-600 active:scale-[0.98] transition-all"
        >
          <p className="font-semibold text-sm">Chapter 1</p>
          <p className="text-blue-100 text-xs">Time Apart</p>
        </button>

        {/* Chapter 2 — locked */}
        <div className="w-full px-5 py-4 rounded-2xl bg-neutral-900 border border-neutral-800 text-left opacity-50">
          <p className="font-semibold text-sm text-neutral-400">Chapter 2</p>
          <p className="text-neutral-600 text-xs">What Friends Do · Coming soon</p>
        </div>

        {/* Chapter 3 — locked */}
        <div className="w-full px-5 py-4 rounded-2xl bg-neutral-900 border border-neutral-800 text-left opacity-50">
          <p className="font-semibold text-sm text-neutral-400">Chapter 3</p>
          <p className="text-neutral-600 text-xs">The Real Us · Coming soon</p>
        </div>
      </div>
    </div>
  );
}
