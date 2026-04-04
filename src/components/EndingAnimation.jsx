import { useEffect } from 'react';

/**
 * EndingAnimation — full-screen overlay that plays briefly then calls onDone.
 *
 * Props:
 *   type    — 'good' | 'bad'
 *   onDone  — callback fired after animation completes
 */

const GOOD_PARTICLES = [
  { emoji: '🎉', top: '12%',  left: '8%',  delay: '0ms'   },
  { emoji: '✨', top: '6%',   left: '58%', delay: '120ms' },
  { emoji: '🎊', top: '22%',  left: '84%', delay: '80ms'  },
  { emoji: '🌟', top: '50%',  left: '78%', delay: '40ms'  },
  { emoji: '🎆', top: '68%',  left: '12%', delay: '200ms' },
  { emoji: '💫', top: '42%',  left: '4%',  delay: '240ms' },
  { emoji: '⭐', top: '82%',  left: '62%', delay: '100ms' },
  { emoji: '🎇', top: '32%',  left: '42%', delay: '0ms'   },
  { emoji: '🎉', top: '58%',  left: '88%', delay: '280ms' },
  { emoji: '✨', top: '88%',  left: '28%', delay: '160ms' },
  { emoji: '💥', top: '20%',  left: '28%', delay: '60ms'  },
  { emoji: '🌟', top: '75%',  left: '48%', delay: '220ms' },
];

const BAD_PARTICLES = [
  { emoji: '💔', top: '18%',  left: '12%', delay: '0ms'   },
  { emoji: '😔', top: '38%',  left: '65%', delay: '100ms' },
  { emoji: '💔', top: '65%',  left: '28%', delay: '180ms' },
  { emoji: '😔', top: '12%',  left: '72%', delay: '50ms'  },
  { emoji: '💔', top: '80%',  left: '70%', delay: '140ms' },
  { emoji: '😔', top: '52%',  left: '8%',  delay: '220ms' },
];

export default function EndingAnimation({ type, onDone }) {
  const isGood = type === 'good';
  const particles = isGood ? GOOD_PARTICLES : BAD_PARTICLES;
  const DURATION = 1600; // ms — must match CSS animation duration

  useEffect(() => {
    const t = setTimeout(onDone, DURATION);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="absolute inset-0 z-50 pointer-events-none overflow-hidden">
      {/* Background flash */}
      {!isGood && (
        <div className="absolute inset-0 bg-red-950 animate-bad-flash" />
      )}

      {/* Particles */}
      {particles.map((p, i) => (
        <span
          key={i}
          className={`absolute text-3xl select-none ${isGood ? 'animate-firework-pop' : 'animate-sad-drop'}`}
          style={{ top: p.top, left: p.left, animationDelay: p.delay }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
}
