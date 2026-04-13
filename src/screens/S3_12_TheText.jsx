import ConversationPlayer from '../components/ConversationPlayer';

/**
 * S3_12 — The Text
 * Connor texts Hudson under the pretense of a package delivery.
 * Transition: "$300 and 3 hours of flying later…" → S3_13.
 */

const script = [
  { type: 'pause', ms: 4000 },
  { type: 'auto', text: 'Hey. There\'s a package being delivered to your place.' },
  { type: 'auto', text: 'It needs a signature.' },
  { type: 'auto', text: 'They\'re arriving soon.' },
  { type: 'pause', ms: 2000 },
  { type: 'their', from: 'hudson', text: 'When' },
  { type: 'auto', text: 'Around 7.' },
  { type: 'pause', ms: 2000 },
  { type: 'their', from: 'hudson', text: 'I\'ll be home' },
  { type: 'wait', ms: 4000 },
  { type: 'transition', text: '$300 and 3 hours of flying later…', to: 'S3_13' },
];

export default function S3_12_TheText() {
  return (
    <ConversationPlayer
      contact={{ name: 'Huddy', avatar: 'hudsonAvatar' }}
      script={script}
    />
  );
}
