import ConversationPlayer from '../components/ConversationPlayer';

/**
 * S1_02 — Tell Hudson
 * Connor texts Hudson the big news. All choices are flavor only.
 * Ends with a transition to S1_03.
 */

const script = [
  { type: 'their', from: 'hudson', text: 'Just wrapped. I\'m beat. Talk tomorrow' },

  { type: 'choice', options: [
    { text: 'Huddy, wake up! I\'ve got news!' },
    { text: 'I hope you\'re not too sleepy to hear this…' },
  ]},

  { type: 'their', from: 'hudson', text: 'I\'m wide awake now. Tell me before I panic???' },

  { type: 'choice', options: [
    { text: 'I did it! I booked Ascension!' },
    { text: 'Call me Rudolf Nureyev, baby.' },
  ]},

  { type: 'their', from: 'hudson', text: 'YES. THE WORLD IS RIGHT. I\'m so proud of you, baby' },
  { type: 'their', from: 'hudson', image: 'hudsonKissSelfie' },

  { type: 'choice', options: [
    { text: 'I wasn\'t sure I\'d get it.' },
    { text: 'You always believed in me.' },
  ]},

  { type: 'their', from: 'hudson', text: 'FaceTime? I want to see your smiley face rn' },

  { type: 'auto', text: 'Isn\'t Keira visiting you right now?' },

  { type: 'their', from: 'hudson', text: 'She went out to buy cigs' },
  { type: 'their', from: 'hudson', text: 'Oh, she\'s back now' },

  { type: 'choice', options: [
    { text: 'You know we said we\'d chill out with the late night calls.' },
    { text: 'We made a rule about our FaceTime quota, remember?' },
    { text: 'I\'m exhausted, and if I see your face right now I\'ll never sleep.' },
  ]},

  { type: 'their', from: 'hudson', text: 'I get it. Sleep well baby' },

  { type: 'auto', text: 'You should go to bed, too. I\'ve kept you up way too late every night worrying about this role' },
  { type: 'auto', image: 'connorGoodnight' },

  { type: 'their', from: 'hudson', text: 'Talk tomorrow?' },

  { type: 'choice', options: [
    { text: 'Always.' },
    { text: 'Wouldn\'t miss it.' },
  ]},

  { type: 'transition', text: 'After a good night\'s sleep…', to: 'S1_03' },
];

export default function S1_02_TellHudson() {
  return (
    <ConversationPlayer
      contact={{ name: 'Hudson', avatar: 'hudsonAvatar' }}
      script={script}
    />
  );
}
