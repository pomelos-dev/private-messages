import ConversationPlayer from '../components/ConversationPlayer';
import useGameStore from '../store/gameStore';

/**
 * S2_09 — West Hollywood
 * Hudson suggests going to Hi Tops together.
 * Flavor choices throughout, then navigates → S2_10.
 */

const script = [
  { type: 'their', from: 'hudson', text: 'What are you up to?' },

  { type: 'choice', options: [
    { text: 'Just reading some emails from Nick.' },
    { text: 'Nothing much, why?' },
    { text: 'Waiting for you to finish your evening skincare...' },
  ]},

  { type: 'their', from: 'hudson', text: 'I\'ve been thinking' },
  { type: 'their', from: 'hudson', text: 'Remember when we talked about going back to Hi Tops?' },
  { type: 'their', from: 'hudson', text: 'I had such a good time there, and we could chill with the regulars this time' },
  { type: 'their', from: 'hudson', text: 'Would you want to go tonight?' },

  { type: 'choice', options: [
    { text: 'Right now?' },
    { text: 'Tonight sounds perfect.' },
  ]},

  { type: 'their', from: 'hudson', text: 'Yeah like in an hour or so' },
  { type: 'their', from: 'hudson', text: 'I know it\'s last minute but I\'m feeling it' },
  { type: 'their', from: 'hudson', text: 'And honestly I really want to go with you' },

  { type: 'choice', options: [
    { text: 'It\'s really busy around this time, though.' },
    { text: 'Hudson...' },
    { text: 'Are you sure that\'s a good idea?' },
  ]},

  { type: 'their', from: 'hudson', text: 'I know we said we\'d keep our distance' },
  { type: 'their', from: 'hudson', text: 'But I\'m here with you now and I just want to act like before' },
  { type: 'their', from: 'hudson', text: 'No hiding' },
  { type: 'their', from: 'hudson', text: 'Actually, let me come see you. We should talk about this in person' },

  { type: 'choice', options: [
    { text: 'Sure, I\'m in the living room.', extend: [
      { type: 'wait', ms: 3000 },
      { type: 'slow_fade_navigate', to: 'S2_10' },
    ]},
    { text: 'Don\'t keep me waiting, Huddy...', extend: [
      { type: 'wait', ms: 3000 },
      { type: 'slow_fade_navigate', to: 'S2_10' },
    ]},
  ]},
];

export default function S2_09_WestHollywood() {
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
