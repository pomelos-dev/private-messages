import ConversationPlayer from '../components/ConversationPlayer';
import useGameStore from '../store/gameStore';

/**
 * S1_06 — Hudson Misses Connor
 * Hudson confesses he misses Connor. Branching choice at the end.
 *
 * GOOD: conversation continues inline, ends with wait_for_back → S1_07_HOME
 * BAD: conversation continues inline, then game over
 */

// ── Continuation scripts (defined first, referenced by choices) ───

const scriptGood = [
  { type: 'their', from: 'hudson', text: 'Maybe when we meet up next time, we can talk?' },
  { type: 'their', from: 'hudson', text: 'Until then, please post more on Instagram' },
  { type: 'their', from: 'hudson', text: 'How are your fans supposed to see your sexy face otherwise?' },

  // Script ends. Player must find the back button to leave.
  { type: 'wait_for_back', homeTarget: 'S1_07_HOME' },
];

const scriptBad = [
  { type: 'their', from: 'hudson', text: 'I guess. Maybe it\'s just me' },
  { type: 'wait', ms: 2500 },
  { type: 'gameover', animate: 'bad', message: 'You made Hudson feel more alone. He doesn\'t bring up his feelings again.', retryScreen: 'S1_06' },
];

// ── Main script ──────────────────────────────────────────────────
const script = [
  { type: 'their', from: 'hudson', text: 'How did it go?' },

  { type: 'choice', options: [
    { text: 'It went great!' },
    { text: 'It was fine.' },
  ]},

  { type: 'their', from: 'hudson', text: 'I knew it' },
  { type: 'their', from: 'hudson', image: 'victorTableRead' },
  { type: 'their', from: 'hudson', text: 'He\'s in love with you already' },

  { type: 'auto', image: 'connorBlushing' },

  { type: 'their', from: 'hudson', text: 'I\'m glad it\'s going well for you' },

  { type: 'choice', options: [
    { text: 'What\'s wrong?' },
    { text: 'Are you OK?' },
  ]},

  { type: 'their', from: 'hudson', text: 'I dunno' },
  { type: 'their', from: 'hudson', text: 'I just miss you, I guess' },
  { type: 'their', from: 'hudson', text: 'I know we said we\'d keep some distance this year for the press' },
  { type: 'their', from: 'hudson', text: 'But it\'s been over a month since I saw you for real' },
  { type: 'their', from: 'hudson', text: 'And there\'s some personal stuff that\'s been making me feel a bit down' },

  // ★ BRANCHING CHOICE — inline via extend
  { type: 'choice', options: [
    { text: 'I miss you, too.', extend: scriptGood },
    { text: 'It hasn\'t been that long.', extend: scriptBad },
    { text: 'Do you want to talk about it?', extend: scriptGood },
  ]},
];

// ── Components ───────────────────────────────────────────────────

export function S1_06_HudsonMisses() {
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
export function S1_06_Good() {
  const goToScreen = useGameStore((s) => s.goToScreen);
  return (
    <ConversationPlayer
      contact={{ name: 'Huddy', avatar: 'hudsonAvatar' }}
      script={scriptGood}
      onBack={() => goToScreen('S0')}
    />
  );
}

export function S1_06_Bad() {
  const goToScreen = useGameStore((s) => s.goToScreen);
  return (
    <ConversationPlayer
      contact={{ name: 'Huddy', avatar: 'hudsonAvatar' }}
      script={scriptBad}
      onBack={() => goToScreen('S0')}
      variant="bad"
    />
  );
}

export default S1_06_HudsonMisses;
