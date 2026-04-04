import ConversationPlayer from '../components/ConversationPlayer';
import useGameStore from '../store/gameStore';

/**
 * S1_04 — Hudson Reacts
 * Hudson saw Victor's comment. Encourages Connor.
 * Final choice branches: GOOD (continue) or BAD (game over).
 *
 * Branching is handled via the `goto` property on choice options.
 * GOOD continuation and BAD game over are separate screen IDs,
 * but they're also registered in App.jsx as sub-screens that
 * render this same component with different scripts.
 */

// ── Main script (shared opening) ─────────────────────────────────
const script = [
  { type: 'their', from: 'hudson', text: 'Looks like someone\'s excited to work with you 👀' },
  { type: 'their', from: 'hudson', image: 'victorHeadshot' },

  { type: 'choice', options: [
    { text: 'That man is a stud and a half.' },
    { text: 'He\'s so talented!' },
    { text: 'He kind of intimidates me, honestly.' },
  ]},

  { type: 'their', from: 'hudson', text: 'Alright, no need to get all weak-kneed' },
  { type: 'their', from: 'hudson', text: 'You\'ve got this. They picked you for a reason' },

  { type: 'choice', options: [
    { text: 'What if we don\'t click?' },
    { text: 'I keep dreading that I\'ll mess up at the table read.' },
  ]},

  { type: 'their', from: 'hudson', text: 'Be yourself. Everyone will fall in love with you' },
  { type: 'their', from: 'hudson', image: 'connorEncouraging' },

  // ★ BRANCHING CHOICE
  { type: 'choice', options: [
    { text: 'You\'re right. I\'ll just be myself.', goto: 'S1_04_GOOD' },
    { text: 'You always know what to say.', goto: 'S1_04_GOOD' },
    { text: 'What do you know about falling in love?', goto: 'S1_04_BAD' },
  ]},
];

// ── GOOD continuation script ─────────────────────────────────────
const scriptGood = [
  { type: 'their', from: 'hudson', text: 'I\'m rooting for you papi' },
  { type: 'their', from: 'hudson', image: 'hudsonEncouraging' },
  { type: 'transition', text: 'After the table read…', to: 'S1_05' },
];

// ── BAD script ───────────────────────────────────────────────────
const scriptBad = [
  { type: 'their', from: 'hudson', text: 'Ouch' },
  { type: 'gameover', message: 'You refused Hudson\'s support. Something shifts.', retryScreen: 'S1_04' },
];

// ── Components ───────────────────────────────────────────────────

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

export function S1_04_Good() {
  const goToScreen = useGameStore((s) => s.goToScreen);
  return (
    <ConversationPlayer
      contact={{ name: 'Hudson', avatar: 'hudsonAvatar' }}
      script={scriptGood}
      onBack={() => goToScreen('S0')}
    />
  );
}

export function S1_04_Bad() {
  const goToScreen = useGameStore((s) => s.goToScreen);
  return (
    <ConversationPlayer
      contact={{ name: 'Hudson', avatar: 'hudsonAvatar' }}
      script={scriptBad}
      onBack={() => goToScreen('S0')}
    />
  );
}

export default S1_04_HudsonReacts;
