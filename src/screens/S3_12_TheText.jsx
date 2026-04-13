import ConversationPlayer from '../components/ConversationPlayer';

/**
 * S3_12 — The Text
 * Connor texts Hudson under the pretense of a package delivery.
 * Prior messages from S3_07 shown at top for continuity.
 * Transition: "$300 and 3 hours of flying later…" → S3_13.
 */

// Last messages from before the silence (end of S3_07)
const PRIOR_MESSAGES = [
  { id: 'prior_1', isOwn: true,  from: 'connor',  text: 'OK. Take care of yourself, Huddy.' },
  { id: 'prior_2', isOwn: false, from: 'hudson',  text: 'You too, Con Con.' },
  { id: 'prior_3', isOwn: false, from: 'hudson',  text: '❤️' },
  { id: 'prior_sep', type: 'separator', text: '6 months later' },
];

const script = [
  { type: 'pause', ms: 1800 },
  { type: 'auto', text: 'Hey. There\'s a package being delivered to your place.' },
  { type: 'auto', text: 'It needs a signature.' },
  { type: 'auto', text: 'They\'re arriving soon.' },
  { type: 'pause', ms: 3500 },
  { type: 'their', from: 'hudson', text: 'When' },
  { type: 'auto', text: 'Around 7.' },
  { type: 'pause', ms: 3500 },
  { type: 'their', from: 'hudson', text: 'I\'ll be home' },
  { type: 'wait', ms: 4000 },
  { type: 'transition', text: '$300 and 3 hours of flying later…', to: 'S3_13' },
];

export default function S3_12_TheText() {
  return (
    <ConversationPlayer
      contact={{ name: 'Huddy', avatar: 'hudsonAvatar' }}
      script={script}
      initialMessages={PRIOR_MESSAGES}
    />
  );
}
