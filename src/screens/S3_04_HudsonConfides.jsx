import ConversationPlayer from '../components/ConversationPlayer';

/**
 * S3_04 — Hudson Confides
 * Hudson processes the fallout. Two good paths, one bad ending.
 * All good paths → transition "After sleeping on it…" → S3_05
 */

// ── Branch continuations ──────────────────────────────────────────

const scriptGood = [
  { type: 'their', from: 'hudson', text: 'Yeah' },
  { type: 'their', from: 'hudson', text: 'At least we have each other, you know?' },
  { type: 'their', from: 'hudson', text: 'Let\'s sleep on it' },
  { type: 'their', from: 'hudson', text: 'Talk tomorrow after we\'ve had all our meetings and see how we feel' },
  { type: 'auto', text: 'Yeah. Let\'s take it easy today.' },
  { type: 'wait', ms: 2500 },
  { type: 'transition', text: 'After sleeping on it…', to: 'S3_05' },
];

const scriptOk = [
  { type: 'their', from: 'hudson', text: 'You\'re right. He always does' },
  { type: 'their', from: 'hudson', text: 'I just hate feeling like I have no say in my own life' },
  { type: 'their', from: 'hudson', text: 'Let\'s sleep on it' },
  { type: 'their', from: 'hudson', text: 'Talk tomorrow after we\'ve had all our meetings and I\'m feeling less hungover' },
  { type: 'auto', text: 'Yeah. Take it easy, Hudson.' },
  { type: 'wait', ms: 2500 },
  { type: 'transition', text: 'After sleeping on it…', to: 'S3_05' },
];

const scriptBad = [
  { type: 'their', from: 'hudson', text: 'I\'m sorry' },
  { type: 'their', from: 'hudson', text: 'I guess...' },
  { type: 'their', from: 'hudson', text: 'I shouldn\'t have come' },
  { type: 'wait', ms: 2500 },
  {
    type: 'gameover',
    animate: 'bad',
    message: 'You made Hudson feel like a problem to manage. Something shifts.',
    retryScreen: 'S3_04',
    restartScreen: 'S3_01',
    restartLabel: 'Restart Chapter 3',
  },
];

// ── Main script ───────────────────────────────────────────────────

const script = [
  { type: 'their', from: 'hudson', text: 'Hey. Did you see it' },

  { type: 'choice', options: [
    { text: 'Just now. Are you OK?' },
    { text: 'Yeah. I was going to text you.' },
    { text: 'I saw it. I\'m sorry, Huddy.' },
  ]},

  { type: 'their', from: 'hudson', text: 'I\'m fine' },
  { type: 'their', from: 'hudson', text: 'It was going to come out eventually' },
  { type: 'their', from: 'hudson', text: 'We actually broke up a little while ago' },
  { type: 'their', from: 'hudson', text: 'I just... hadn\'t found the right time to tell you yet' },
  { type: 'their', from: 'hudson', text: 'And then last night happened' },
  { type: 'their', from: 'hudson', text: 'And now it all looks like one big thing' },

  { type: 'choice', options: [
    { text: 'I wish you\'d told me sooner.' },
    { text: 'It\'s really a big mess.' },
    { text: 'It\'s OK. You\'re telling me now.' },
  ]},

  { type: 'their', from: 'hudson', text: 'I wanted to tell you in person' },
  { type: 'their', from: 'hudson', text: 'But I was so happy just being here that I didn\'t want to make it heavy' },
  { type: 'their', from: 'hudson', text: 'And now Elena is calling non-stop and everyone is freaking out' },
  { type: 'their', from: 'hudson', text: 'They\'re all asking what I want to do' },
  { type: 'their', from: 'hudson', text: 'I genuinely don\'t even know anymore' },
  { type: 'their', from: 'hudson', image: 'hudsonSad' },

  { type: 'choice', options: [
    { text: 'How can I help?' },
    { text: 'Tell me what they\'re saying.' },
  ]},

  { type: 'their', from: 'hudson', text: 'They want a statement. Or a distraction. Or both' },
  { type: 'their', from: 'hudson', text: 'I hate this part of it' },
  { type: 'their', from: 'hudson', text: 'Con... what do you think we should do' },

  { type: 'choice', options: [
    { text: 'I don\'t know. I hate this too.',                          extend: scriptGood },
    { text: 'We\'ll figure it out. Nick will come up with something.', extend: scriptOk   },
    { text: 'I can\'t believe we let it get this far.',                extend: scriptBad  },
  ]},
];

// ── Component ─────────────────────────────────────────────────────

export default function S3_04_HudsonConfides() {
  return (
    <ConversationPlayer
      contact={{ name: 'Huddy', avatar: 'hudsonAvatar' }}
      script={script}
      immediateFirst
    />
  );
}
