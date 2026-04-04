import ConversationPlayer from '../components/ConversationPlayer';
import useGameStore from '../store/gameStore';

/**
 * S1_04 — Hudson Reacts
 * Hudson saw Victor's comment. Encourages Connor.
 * Branching happens inline via `extend` — no screen navigation.
 */

// ── Continuation scripts (defined first, referenced by choices) ───

const scriptGood = [
  { type: 'their', from: 'hudson', text: 'I\'m rooting for you papi' },
  { type: 'their', from: 'hudson', image: 'hudsonEncouraging' },
  { type: 'wait', ms: 4000 },
  { type: 'transition', text: 'After the table read…', to: 'S1_05', slow: true },
];

const scriptBad = [
  { type: 'their', from: 'hudson', text: 'Ouch' },
  { type: 'gameover', message: 'You refused Hudson\'s support. Something shifts.', retryScreen: 'S1_04' },
];

// ── Main script ───────────────────────────────────────────────────

const script = [
  { type: 'their', from: 'hudson', text: 'Looks like someone\'s excited to work with you 👀' },
  { type: 'their', from: 'hudson', image: 'victorHeadshot' },

  { type: 'choice', options: [
    { text: 'That man is a stud and a half.' },
    { text: 'He\'s so talented!' },
    { text: 'He kind of intimidates me, honestly.' },
  ]},

  { type: 'their', from: 'hudson', text: 'Alright, no need to get all weak-kneed' },

  { type: 'choice', options: [
    { text: 'What if we don\'t click?' },
    { text: 'I keep dreading that I\'ll mess up at the table read.' },
  ]},

  { type: 'their', from: 'hudson', text: 'You\'ve got this.' },
  { type: 'their', from: 'hudson', text: 'They picked you for a reason' },
  { type: 'their', from: 'hudson', text: 'Just be yourself… Everyone will fall in love with you.' },
  { type: 'their', from: 'hudson', image: 'connorEncouraging', objectPosition: 'top' },

  { type: 'auto', text: 'Why do you have that saved…' },

  { type: 'choice', options: [
    { text: 'You\'re right. I\'ll just be myself.', extend: scriptGood },
    { text: 'You always know what to say.', extend: scriptGood },
    { text: 'What do you know about falling in love?', extend: scriptBad },
  ]},
];

// ── Component ─────────────────────────────────────────────────────

export function S1_04_HudsonReacts() {
  const goToScreen = useGameStore((s) => s.goToScreen);
  return (
    <ConversationPlayer
      contact={{ name: 'Huddy', avatar: 'hudsonAvatar' }}
      script={script}
      onBack={() => goToScreen('S0')}
      immediateFirst
    />
  );
}

// Kept for registry compatibility, not reached via normal gameplay
export function S1_04_Good() {
  const goToScreen = useGameStore((s) => s.goToScreen);
  return (
    <ConversationPlayer
      contact={{ name: 'Huddy', avatar: 'hudsonAvatar' }}
      script={scriptGood}
      onBack={() => goToScreen('S0')}
    />
  );
}

export function S1_04_Bad() {
  const goToScreen = useGameStore((s) => s.goToScreen);
  return (
    <ConversationPlayer
      contact={{ name: 'Huddy', avatar: 'hudsonAvatar' }}
      script={scriptBad}
      onBack={() => goToScreen('S0')}
    />
  );
}

export default S1_04_HudsonReacts;
