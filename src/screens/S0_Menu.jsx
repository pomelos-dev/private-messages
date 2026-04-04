import useGameStore from '../store/gameStore';

/**
 * S0 — Main Menu
 */
export default function S0_Menu() {
  const goToScreen = useGameStore((s) => s.goToScreen);

  return (
    <div className="flex-1 flex flex-col items-center justify-between bg-black px-8 py-10 text-center">

      {/* Main content — vertically centered */}
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        {/* Decorative emoji */}
        <p className="animate-fade-in text-3xl mb-5 select-none" style={{ animationDuration: '1s' }}>🎭</p>

        {/* Title */}
        <h1 className="animate-fade-in text-white text-4xl font-bold tracking-tight mb-1" style={{ animationDuration: '1s' }}>
          Private Messages
        </h1>
        <p className="animate-fade-in text-neutral-400 text-sm mb-4" style={{ animationDelay: '300ms', animationDuration: '1s' }}>
          An Interactive Mobile Story
        </p>
        <p className="animate-fade-in text-neutral-400 text-base italic mb-12 max-w-[280px] leading-relaxed" style={{ animationDelay: '600ms', animationDuration: '1s' }}>
          In public, they're superstars. In private, their friendship is everything…
        </p>

        {/* Chapter list */}
        <div className="animate-fade-in w-full max-w-[280px] space-y-3" style={{ animationDelay: '900ms', animationDuration: '1s' }}>
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

      {/* Footer credits */}
      <div className="animate-fade-in text-neutral-600 text-xs space-y-1" style={{ animationDelay: '1200ms', animationDuration: '1s' }}>
        <p>made by</p>
        <div className="flex items-center justify-center gap-3">
          <a
            href="https://archiveofourown.org/users/pomelos/works"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-white transition-colors underline underline-offset-2"
          >
            @pomelos
          </a>
          <span className="text-neutral-700">·</span>
          <a
            href="https://x.com/pomelos_writes"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-white transition-colors underline underline-offset-2"
          >
            𝕏 @pomelos_writes
          </a>
        </div>
      </div>

    </div>
  );
}
