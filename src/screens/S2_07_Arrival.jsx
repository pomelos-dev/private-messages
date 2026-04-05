import ConversationPlayer from '../components/ConversationPlayer';
import useGameStore from '../store/gameStore';

/**
 * S2_07 — Arrival
 * Connor arrives home, Hudson surprises him in person.
 * Ends with a photo transition (connorHudsonHug) → S2_08.
 */

const script = [
  { type: 'auto', text: 'Just pulled up to my building.' },

  { type: 'their', from: 'hudson', text: 'Perfect timing' },

  { type: 'auto', text: 'Wait, where\'s the delivery guy?' },

  { type: 'their', from: 'hudson', text: 'Oh, he\'s really close. Don\'t worry' },

  { type: 'auto', text: 'Well, he\'s not here.' },
  { type: 'auto', text: 'Whatever, I\'m going in.' },

  { type: 'their', from: 'hudson', text: 'Surprise \uD83D\uDE0A' },

  { type: 'wait', ms: 2000 },
  { type: 'transition', image: 'connorHudsonHug', imageClass: 'w-full max-h-[58vh] rounded-2xl object-cover object-center mb-4 animate-fade-in', text: 'Finally, some time together...', to: 'S2_08' },
];

export default function S2_07_Arrival() {
  const goToScreen = useGameStore((s) => s.goToScreen);
  return (
    <ConversationPlayer
      contact={{ name: 'Huddy', avatar: 'hudsonAvatar' }}
      script={script}
      onBack={() => goToScreen('S0')}
    />
  );
}
