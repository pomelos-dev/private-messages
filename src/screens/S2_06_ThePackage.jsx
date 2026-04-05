import ConversationPlayer from '../components/ConversationPlayer';
import useGameStore from '../store/gameStore';

/**
 * S2_06 — The Package
 * Hudson asks Connor to come home for a package delivery.
 * MAJOR BRANCH: cancel on Victor (GOOD → S2_06_GOOD) or stay committed (BAD → game over).
 */

const scriptBad = [
  { type: 'their', from: 'hudson', text: 'Yeah, I get it' },
  { type: 'wait', ms: 2500 },
  { type: 'gameover',
    message: 'You chose Victor over Hudson. You kept your plans, but Hudson\'s changed.',
    retryScreen: 'S2_06',
    restartScreen: 'S2_01',
    restartLabel: 'Restart Chapter 2',
    animate: 'bad',
  },
];

const script = [
  { type: 'their', from: 'hudson', text: 'Hey, you staying in tonight?' },

  { type: 'choice', options: [
    { text: 'Probably not, why do you ask?' },
    { text: 'I have dinner plans actually.' },
  ]},

  { type: 'their', from: 'hudson', text: 'OK so don\'t freak out' },
  { type: 'their', from: 'hudson', text: 'But there\'s a package being delivered to your place' },
  { type: 'their', from: 'hudson', text: 'It needs a signature and they\'re arriving around 7' },
  { type: 'their', from: 'hudson', text: 'Can you get home by then?' },

  { type: 'choice', options: [
    { text: 'What did you send me?' },
    { text: 'I have a dinner with Victor though.' },
    { text: 'Are you sure this is a normal package?' },
  ]},

  { type: 'their', from: 'hudson', text: 'You\'ll like what it is' },
  { type: 'their', from: 'hudson', text: 'Just trust me' },
  { type: 'their', from: 'hudson', text: 'Please?' },
  { type: 'their', from: 'hudson', image: 'hudsonBegging' },

  { type: 'choice', options: [
    { text: 'Fine, I\'ll cancel on Victor. I\'ll head home after rehearsals.',
      extend: [
        { type: 'wait', ms: 1800 },
        { type: 'fade_navigate', to: 'S2_06_GOOD' },
      ]},
    { text: 'I can\'t just cancel on my co-star. I\'m already committed.', extend: scriptBad },
  ]},
];

export default function S2_06_ThePackage() {
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
