import ConversationPlayer from '../components/ConversationPlayer';
import useGameStore from '../store/gameStore';

/**
 * S2_01 — A Suspiciously Good Mood
 * Hudson texts Connor in a great mood. Flavor-only choices.
 * After conversation → transition → S2_02
 */

const script = [
  { type: 'their', from: 'hudson', text: 'The sun has risen on a beautiful day in Hudson Land' },
  { type: 'their', from: 'hudson', image: 'goodMorning' },

  { type: 'choice', options: [
    { text: 'Someone\'s in a good mood...' },
    { text: 'Good morning, Huddy!' },
    { text: 'I take it you slept well?' },
  ]},

  { type: 'their', from: 'hudson', text: 'Did something a bit spontaneous last night' },
  { type: 'their', from: 'hudson', text: 'And honestly, I\'m not even nervous about it' },
  { type: 'their', from: 'hudson', text: 'How\'s ballet going?' },

  { type: 'choice', options: [
    { text: 'Brutal. My feet have never hated me this much.' },
    { text: 'As terribly as you are at changing the subject.' },
    { text: 'I thought I was decent at gymnastics, but ballet is genuinely trying to kill me.' },
  ]},

  { type: 'their', from: 'hudson', text: 'My Connie baby, look at you suffering for your art' },
  { type: 'their', from: 'hudson', text: 'You\'re gonna be amazing though, I just know it' },

  { type: 'choice', options: [
    { text: 'You seem weird today.' },
    { text: 'OK, what\'s going on with you?' },
    { text: 'You\'re deflecting again.' },
  ]},

  { type: 'their', from: 'hudson', image: 'secretiveOrKnowingMeme' },
  { type: 'their', from: 'hudson', text: 'Can\'t a guy just be happy?' },

  { type: 'choice', options: [
    { text: 'I know you when you\'re happy, but this...' },
    { text: 'Fine. Don\'t tell me.' },
  ]},

  { type: 'their', from: 'hudson', text: '😇' },
  { type: 'their', from: 'hudson', text: 'Talk later, papi. I gotta run' },

  { type: 'wait', ms: 5000 },
  { type: 'transition', text: 'Later that day...', to: 'S2_02' },
];

export default function S2_01_GoodMood() {
  const goToScreen = useGameStore((s) => s.goToScreen);
  return (
    <ConversationPlayer
      contact={{ name: 'Huddy', avatar: 'hudsonAvatar' }}
      script={script}
      onBack={() => goToScreen('S0')}
    />
  );
}
