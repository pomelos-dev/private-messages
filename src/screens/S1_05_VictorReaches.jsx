import ConversationPlayer from '../components/ConversationPlayer';
import useGameStore from '../store/gameStore';

/**
 * S1_05 — Victor After the Table Read
 * Flirtatious exchange with Victor. Ends with a notification from Hudson.
 */

const script = [
  { type: 'their', from: 'victor', text: 'You surprised me at the table read today.' },

  { type: 'choice', options: [
    { text: 'Oh?' },
    { text: 'In a good way, I hope?' },
    { text: 'You surprised me, too.' },
  ]},

  { type: 'their', from: 'victor', text: 'I wish I had been as talented and free when I was your age.' },

  { type: 'choice', options: [
    { text: 'I was very nervous.' },
    { text: 'Thank you for making me feel comfortable.' },
    { text: 'Don\'t talk like you\'re ancient…' },
  ]},

  { type: 'their', from: 'victor', text: 'Your enthusiasm for the work makes me smile. I look forward to getting to know you better, Connor.' },

  // Notification from Hudson — script stops here, player must tap notification
  {
    type: 'notification',
    id: 'n_s1_05',
    from: 'Huddy',
    avatar: 'hudsonAvatar',
    preview: 'How did it go?',
    target: 'S1_06',
  },
];

export default function S1_05_VictorReaches() {
  const goToScreen = useGameStore((s) => s.goToScreen);

  return (
    <ConversationPlayer
      contact={{ name: 'Victor Halberg', avatar: 'victorAvatar' }}
      script={script}
      onBack={() => goToScreen('S0')}
    />
  );
}
