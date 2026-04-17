import ConversationPlayer from '../components/ConversationPlayer';

/**
 * S3_14 — The Confession
 * Hudson and Connor have spent time together. It's late. Hudson texts first.
 * Major 3-way branch determines ending:
 *   ROMANTIC_BOLD / ROMANTIC_SOFT → S3_15_ROMANTIC
 *   WARM → S3_15_WARM
 */

// ── Ending branches ───────────────────────────────────────────────

const scriptRomanticBold = [
  { type: 'their', from: 'hudson', text: 'Yeah?' },
  { type: 'auto', text: 'I kept trying to find a way to say it that wasn\'t that.' },
  { type: 'auto', text: 'But honestly, that\'s what it\'s been since we first did that Zoom.' },
  { type: 'their', from: 'hudson', text: 'Connor' },
  { type: 'their', from: 'hudson', text: 'I\'ve been so careful for so long' },
  { type: 'their', from: 'hudson', text: 'About what I say out loud and how I say it and what I let myself think about' },
  { type: 'their', from: 'hudson', text: 'And I\'m doing so bad at it' },
  { type: 'auto', text: 'Me too.' },
  { type: 'their', from: 'hudson', text: 'Then let\'s stop' },
  { type: 'their', from: 'hudson', text: 'OK?' },
  { type: 'their', from: 'hudson', text: 'Let\'s just stop' },
  { type: 'auto', text: 'OK.' },
  { type: 'their', from: 'hudson', text: 'You\'re the most important person in my life' },
  { type: 'their', from: 'hudson', text: 'I want to share everything with you' },
  { type: 'their', from: 'hudson', text: 'And I\'m so obsessed with you it makes me stupid' },
  { type: 'their', from: 'hudson', text: 'I just needed you to say it first' },
  { type: 'choice', options: [
    { text: 'I wanted to say it a long time ago.' },
    { text: 'I\'m obsessed with you, too.' },
    { text: 'I\'ve never met anyone like you.' },
  ]},
  { type: 'their', from: 'hudson', text: 'Get some sleep, baby' },
  { type: 'their', from: 'hudson', text: 'I\'ll call you in the morning' },
  { type: 'their', from: 'hudson', text: '❤️' },
  { type: 'wait', ms: 2000 },
  { type: 'transition', text: 'Another six months later\n(but this time happier)…', to: 'S3_15_ROMANTIC' },
];

const scriptRomanticSoft = [
  { type: 'their', from: 'hudson', text: 'You\'re mine, too' },
  { type: 'auto', text: 'I don\'t know how else to explain what you are to me.' },
  { type: 'auto', text: 'I\'ve tried.' },
  { type: 'their', from: 'hudson', text: 'I know' },
  { type: 'their', from: 'hudson', text: 'I\'ve tried too' },
  { type: 'their', from: 'hudson', text: 'For years, Connor' },
  { type: 'auto', text: 'It feels kinda crazy.' },
  { type: 'auto', text: 'I think I was afraid that if I named it, something would break.' },
  { type: 'their', from: 'hudson', text: 'I was afraid too' },
  { type: 'their', from: 'hudson', text: 'But I don\'t think it\'s going to break' },
  { type: 'their', from: 'hudson', text: 'I think it\'s the opposite of that' },
  { type: 'auto', text: 'Yeah... I\'m starting to think so, too.' },
  { type: 'their', from: 'hudson', text: 'You\'re my soulmate' },
  { type: 'their', from: 'hudson', text: 'I don\'t know what else to call it either' },
  { type: 'their', from: 'hudson', text: 'I think we were meant to be together' },
  { type: 'choice', options: [
    { text: 'That\'s what it is.' },
    { text: 'I knew it from the start.' },
    { text: 'I love you.' },
  ]},
  { type: 'their', from: 'hudson', text: 'I love you' },
  { type: 'their', from: 'hudson', text: 'Get some sleep, baby' },
  { type: 'their', from: 'hudson', text: 'I\'ll call you in the morning' },
  { type: 'their', from: 'hudson', text: '❤️' },
  { type: 'wait', ms: 2000 },
  { type: 'transition', text: 'Another six months later\n(but this time happier)…', to: 'S3_15_ROMANTIC' },
];

const scriptWarm = [
  { type: 'their', from: 'hudson', text: 'Yeah?' },
  { type: 'auto', text: 'I know that might not be what you were expecting me to say.' },
  { type: 'auto', text: 'But it\'s the most important thing to me.' },
  { type: 'auto', text: 'You just get me like no one else does.' },
  { type: 'auto', text: 'And I don\'t want that to ever change.' },
  { type: 'their', from: 'hudson', text: 'OK' },
  { type: 'their', from: 'hudson', text: 'Can I say something back?' },
  { type: 'auto', text: 'Always.' },
  { type: 'their', from: 'hudson', text: 'You\'re my best friend too' },
  { type: 'their', from: 'hudson', text: 'And I mean that in a way I\'ve never meant it about anyone else' },
  { type: 'their', from: 'hudson', text: 'What we have... I don\'t think most people get this' },
  { type: 'their', from: 'hudson', text: 'I\'m not sure most people even know it exists' },
  { type: 'auto', text: 'I know.' },
  { type: 'auto', text: 'That\'s why I don\'t want to lose it.' },
  { type: 'their', from: 'hudson', text: 'You\'re not going to lose it, I promise' },
  { type: 'their', from: 'hudson', text: 'Nothing can come between us and our freakiness' },
  { type: 'their', from: 'hudson', text: 'I\'m on this crazy ride for life, baby' },
  { type: 'choice', options: [
    { text: 'Thank you, Huddy.' },
    { text: 'I\'m in it for life, too.' },
    { text: 'See? You get me.' },
  ]},
  { type: 'their', from: 'hudson', text: 'Get some sleep, Connie' },
  { type: 'their', from: 'hudson', text: 'I\'ll call you in the morning' },
  { type: 'their', from: 'hudson', text: '💙' },
  { type: 'wait', ms: 2000 },
  { type: 'transition', text: 'Another six months later\n(but this time happier)…', to: 'S3_15_WARM' },
];

// ── Main script ───────────────────────────────────────────────────

const script = [
  { type: 'their', from: 'hudson', text: 'Hey' },
  { type: 'their', from: 'hudson', text: 'So' },
  { type: 'their', from: 'hudson', text: 'I\'ve been thinking about what to say since you left' },
  { type: 'their', from: 'hudson', text: 'And I think the honest version is:' },
  { type: 'their', from: 'hudson', text: 'I missed you every single day' },
  { type: 'their', from: 'hudson', text: 'And I kept almost calling you like fifty times' },
  { type: 'their', from: 'hudson', text: 'And not doing it felt a bit like trying not to drown for six months' },

  { type: 'choice', options: [
    { text: 'Six months felt like six years.' },
    { text: 'I kept almost writing to you, too.' },
  ]},

  { type: 'their', from: 'hudson', text: 'I think I smoked like two packs a day' },
  { type: 'their', from: 'hudson', text: 'I understand why we did it' },
  { type: 'their', from: 'hudson', text: 'I just don\'t want to live like that' },

  { type: 'choice', options: [
    { text: 'Neither do I, Huddy.' },
    { text: 'Let\'s never, ever do it again.' },
  ]},

  { type: 'their', from: 'hudson', text: 'Can I ask you something' },

  { type: 'choice', options: [
    { text: 'Yeah.' },
    { text: 'Always.' },
  ]},

  { type: 'their', from: 'hudson', text: 'What are we?' },
  { type: 'their', from: 'hudson', text: 'Like. What do you want us to be' },
  { type: 'their', from: 'hudson', text: 'No pressure. I just want to know' },
  { type: 'their', from: 'hudson', text: 'Whatever your answer is...' },
  { type: 'their', from: 'hudson', text: 'I promise I\'m not going anywhere' },

  { type: 'choice', options: [
    { text: 'You\'re my best friend. The best I\'ve ever had. That\'s what I want this to be.', extend: scriptWarm },
    { text: 'You\'re my person, Huddy. That\'s the only way I know how to say it.',             extend: scriptRomanticSoft },
    { text: 'Hudson... I\'m in love with you. I think I have been for a long time.',            extend: scriptRomanticBold },
  ]},
];

// ── Component ─────────────────────────────────────────────────────

export default function S3_14_TheConfession() {
  return (
    <ConversationPlayer
      contact={{ name: 'Huddy', avatar: 'hudsonAvatar' }}
      script={script}
      immediateFirst
    />
  );
}
