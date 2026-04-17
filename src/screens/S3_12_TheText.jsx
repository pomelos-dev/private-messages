import ConversationPlayer from '../components/ConversationPlayer';
import useGameStore from '../store/gameStore';

/**
 * S3_12 — The Text
 * Connor texts Hudson under the pretense of a package delivery.
 * Prior messages from S3_07 shown at top for continuity.
 * Transition: "$300 and 3 hours of flying later…" → S3_13.
 */

const script = [
  { type: 'pause', ms: 1800 },
  { type: 'auto', text: 'Hey. There\'s a package being delivered to your place.' },
  { type: 'auto', text: 'It needs a signature.' },
  { type: 'auto', text: 'They\'re arriving soon.' },
  { type: 'pause', ms: 5500 },
  { type: 'their', from: 'hudson', text: 'When' },
  { type: 'auto', text: 'Around 7.' },
  { type: 'pause', ms: 5500 },
  { type: 'their', from: 'hudson', text: 'I\'ll be home' },
  { type: 'wait', ms: 4000 },
  { type: 'transition', text: '$300 and 3 hours of flying later…', to: 'S3_13' },
];

export default function S3_12_TheText() {
  const ch3Goodbye = useGameStore((s) => s.flags?.ch3_goodbye ?? 'take_care');
  const goodbyeText = ch3Goodbye === 'miss_you' ? 'I\'ll miss you.' : 'OK. Take care of yourself, Huddy.';

  const priorMessages = [
    { id: 'prior_1', isOwn: true,  from: 'connor', text: goodbyeText },
    { id: 'prior_2', isOwn: false, from: 'hudson', text: 'You too, Con Con.' },
    { id: 'prior_3', isOwn: false, from: 'hudson', text: '❤️' },
    { id: 'prior_sep', type: 'separator', text: '6 months later' },
  ];

  return (
    <ConversationPlayer
      contact={{ name: 'Huddy', avatar: 'hudsonAvatar' }}
      script={script}
      initialMessages={priorMessages}
    />
  );
}
