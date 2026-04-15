import ConversationPlayer from '../components/ConversationPlayer';

/**
 * S3_07 — What Did You Do
 * Three parallel conversation screens — one per S3_05 strategy choice.
 * Each has GOOD/OK/BAD sub-branches.
 * All GOOD/OK paths → faneSad image → "Six months later…" → S3_08.
 */

// ── Shared ending nodes ────────────────────────────────────────────

// GOOD paths end with a choice farewell
const goodFarewell = [
  { type: 'choice', options: [
    { text: 'OK. Take care of yourself, Huddy.' },
    { text: 'I\'ll miss you.' },
  ]},
  { type: 'their', from: 'hudson', text: 'You too, Con Con.' },
  { type: 'their', from: 'hudson', text: '❤️' },
  { type: 'wait', ms: 2500 },
  { type: 'transition', image: 'faneSad', slow: true,
    next: { text: 'Six months later…', to: 'S3_08', slow: true } },
];

// OK paths end with an auto farewell
const okFarewell = [
  { type: 'auto', text: 'OK. Take care of yourself, Huddy.' },
  { type: 'their', from: 'hudson', text: 'You too, Con Con.' },
  { type: 'their', from: 'hudson', text: '❤️' },
  { type: 'wait', ms: 2500 },
  { type: 'transition', image: 'faneSad', slow: true,
    next: { text: 'Six months later…', to: 'S3_08', slow: true } },
];

// ── S3_07_A — After the statement ─────────────────────────────────

const scriptA_good = [
  { type: 'their', from: 'hudson', text: 'I know' },
  { type: 'their', from: 'hudson', text: 'Connor, I know' },
  { type: 'auto', text: 'I wish I could have said what I really meant.' },
  { type: 'their', from: 'hudson', text: 'It\'s OK' },
  { type: 'their', from: 'hudson', text: 'But...' },
  { type: 'their', from: 'hudson', text: 'I think we need to go quiet for a bit' },
  { type: 'their', from: 'hudson', text: 'Actually quiet' },
  { type: 'choice', options: [
    { text: 'What do you mean?' },
    { text: 'Go quiet how?' },
  ]},
  { type: 'their', from: 'hudson', text: 'I\'m going to fly home tonight' },
  { type: 'their', from: 'hudson', text: 'And... I think I need to not talk to you for a while, too' },
  { type: 'their', from: 'hudson', text: 'I can\'t think clearly otherwise' },
  { type: 'their', from: 'hudson', text: 'I know that\'s a weird thing to say' },
  { type: 'choice', options: [
    { text: 'Are you sure?' },
    { text: 'For how long?' },
    { text: 'Hudson...' },
  ]},
  { type: 'their', from: 'hudson', text: 'I dunno' },
  { type: 'their', from: 'hudson', text: 'I\'ll figure something out when it\'s calmer' },
  { type: 'their', from: 'hudson', text: 'I just need a minute' },
  ...goodFarewell,
];

const scriptA_bad = [
  { type: 'their', from: 'hudson', text: 'Yeah' },
  { type: 'their', from: 'hudson', text: 'When you put it that way...' },
  { type: 'their', from: 'hudson', text: 'Probably not' },
  { type: 'wait', ms: 2500 },
  {
    type: 'gameover',
    animate: 'bad',
    message: 'You evaded the issue. Hudson closes off.',
    retryScreen: 'S3_07_A',
    restartScreen: 'S3_01',
    restartLabel: 'Restart Chapter 3',
  },
];

const scriptA = [
  { type: 'their', from: 'hudson', text: 'Hey' },
  { type: 'their', from: 'hudson', text: 'I saw the statement' },
  { type: 'choice', options: [
    { text: 'Strange, right?' },
    { text: 'I\'m sorry...' },
  ]},
  { type: 'their', from: 'hudson', text: 'I agreed to it, I know that' },
  { type: 'their', from: 'hudson', text: 'I just didn\'t expect it to feel so shitty' },
  { type: 'their', from: 'hudson', text: 'People are saying you\'re the reason Keira and I broke up' },
  { type: 'their', from: 'hudson', text: 'But then they keep quoting you' },
  { type: 'their', from: 'hudson', text: '"Nothing more"' },
  { type: 'choice', options: [
    { text: 'Nick drafted it. I wasn\'t thinking.' },
    { text: 'I didn\'t mean it to sound so cold.' },
  ]},
  { type: 'their', from: 'hudson', text: 'I figured' },
  { type: 'their', from: 'hudson', text: 'I just...' },
  { type: 'their', from: 'hudson', text: 'It\'s a weird thing to read about us' },
  { type: 'choice', options: [
    { text: 'Hudson, you know it\'s not what I meant.',                       extend: scriptA_good },
    { text: 'I don\'t think anything I said would have made a difference.',   extend: scriptA_bad  },
  ]},
];

// ── S3_07_B — After the Victor post ──────────────────────────────

const scriptB_bad = [
  { type: 'their', from: 'hudson', text: 'Right' },
  { type: 'their', from: 'hudson', text: 'I guess...' },
  { type: 'their', from: 'hudson', text: 'I\'m sorry I caused all that trouble' },
  { type: 'wait', ms: 2500 },
  {
    type: 'gameover',
    animate: 'bad',
    message: 'You made it about his decision. Hudson needed you to talk about yours.',
    retryScreen: 'S3_07_B',
    restartScreen: 'S3_01',
    restartLabel: 'Restart Chapter 3',
  },
];

const scriptB_good = [
  { type: 'their', from: 'hudson', text: 'I know' },
  { type: 'their', from: 'hudson', text: 'Connor, I know' },
  { type: 'auto', text: 'I\'m sorry I didn\'t just say that from the start.' },
  { type: 'their', from: 'hudson', text: 'It\'s OK' },
  { type: 'their', from: 'hudson', text: 'But...' },
  { type: 'their', from: 'hudson', text: 'I think we need to go quiet for a bit' },
  { type: 'their', from: 'hudson', text: 'Actually quiet' },
  { type: 'choice', options: [
    { text: 'What do you mean?' },
    { text: 'Go quiet how?' },
  ]},
  { type: 'their', from: 'hudson', text: 'I\'m going to fly home tonight' },
  { type: 'their', from: 'hudson', text: 'And I think we should try not to talk for a while too' },
  { type: 'their', from: 'hudson', text: 'You\'ve got Ascension to focus on' },
  { type: 'their', from: 'hudson', text: 'I don\'t want to be another thing you\'re managing right now' },
  { type: 'choice', options: [
    { text: 'Are you sure?' },
    { text: 'For how long?' },
    { text: 'Hudson...' },
  ]},
  { type: 'their', from: 'hudson', text: 'I dunno' },
  { type: 'their', from: 'hudson', text: 'I\'ll figure something out when it\'s calmer' },
  { type: 'their', from: 'hudson', text: 'I promise' },
  ...goodFarewell,
];

const scriptB_ok = [
  { type: 'their', from: 'hudson', text: 'Yeah?' },
  { type: 'their', from: 'hudson', text: 'But fuck, Connor' },
  { type: 'their', from: 'hudson', text: 'I didn\'t ask you to do that' },
  { type: 'auto', text: 'I know. I\'m sorry.' },
  { type: 'their', from: 'hudson', text: 'It\'s OK' },
  { type: 'their', from: 'hudson', text: 'I think I just needed to hear that' },
  { type: 'their', from: 'hudson', text: 'But...' },
  { type: 'their', from: 'hudson', text: 'I think we need to go quiet for a bit' },
  { type: 'their', from: 'hudson', text: 'Actually quiet' },
  { type: 'choice', options: [
    { text: 'What do you mean?' },
    { text: 'Go quiet how?' },
  ]},
  { type: 'their', from: 'hudson', text: 'I\'m going to go home for a bit. Clear my head' },
  { type: 'their', from: 'hudson', text: 'I can\'t really do that when we\'re talking every day' },
  { type: 'their', from: 'hudson', text: 'Let this whole thing with Victor die down' },
  { type: 'their', from: 'hudson', text: 'I know it\'s just for promo, but I didn\'t expect it to feel so shitty' },
  { type: 'choice', options: [
    { text: 'I get it. I\'ll miss you.' },
    { text: 'I don\'t want you to go.' },
  ]},
  { type: 'their', from: 'hudson', text: 'I\'ll figure something out when things are calmer' },
  { type: 'their', from: 'hudson', text: 'I\'ll miss you too, obviously' },
  { type: 'their', from: 'hudson', text: 'That\'s kind of the problem' },
  ...okFarewell,
];

const scriptB = [
  { type: 'their', from: 'hudson', text: 'Hey. Can we talk' },
  { type: 'their', from: 'hudson', text: 'I saw Victor\'s post' },
  { type: 'choice', options: [
    { text: 'I know. I\'m sorry I didn\'t tell you.' },
    { text: 'They said a distraction would help.' },
  ]},
  { type: 'their', from: 'hudson', text: 'I\'m not mad' },
  { type: 'their', from: 'hudson', text: 'I just want to understand what\'s going on' },
  { type: 'choice', options: [
    { text: 'I had to regain control of the narrative after Hi Tops.',  extend: scriptB_bad  },
    { text: 'I was afraid. I wanted to protect us.',                    extend: scriptB_good },
    { text: 'I wanted to take some of the attention off of you.',       extend: scriptB_ok   },
  ]},
];

// ── S3_07_C — After doing nothing ────────────────────────────────

const scriptC_good = [
  { type: 'their', from: 'hudson', text: 'I know' },
  { type: 'their', from: 'hudson', text: 'Connor, I know' },
  { type: 'auto', text: 'I\'m sorry I didn\'t just say that from the start.' },
  { type: 'their', from: 'hudson', text: 'It\'s OK' },
  { type: 'their', from: 'hudson', text: 'But...' },
  { type: 'their', from: 'hudson', text: 'I think we need to go quiet for a bit' },
  { type: 'their', from: 'hudson', text: 'Actually quiet' },
  { type: 'choice', options: [
    { text: 'What do you mean?' },
    { text: 'Go quiet how?' },
  ]},
  { type: 'their', from: 'hudson', text: 'I\'m going to fly home tonight' },
  { type: 'their', from: 'hudson', text: 'And I think we should try not to talk for a while too' },
  { type: 'their', from: 'hudson', text: 'You\'ve got Ascension to focus on' },
  { type: 'their', from: 'hudson', text: 'I don\'t want to be another thing you\'re managing right now' },
  { type: 'choice', options: [
    { text: 'Are you sure?' },
    { text: 'For how long?' },
    { text: 'Hudson...' },
  ]},
  { type: 'their', from: 'hudson', text: 'I dunno' },
  { type: 'their', from: 'hudson', text: 'I\'ll figure something out when it\'s calmer' },
  { type: 'their', from: 'hudson', text: 'I promise' },
  ...goodFarewell,
];

const scriptC_ok = [
  { type: 'their', from: 'hudson', text: 'Yeah' },
  { type: 'their', from: 'hudson', text: 'Nothing fucking feels right anymore' },
  { type: 'auto', text: 'I know. I\'m sorry.' },
  { type: 'their', from: 'hudson', text: 'It\'s OK' },
  { type: 'their', from: 'hudson', text: 'I\'m glad I\'m not the only one' },
  { type: 'their', from: 'hudson', text: 'And maybe it\'s selfish, but I\'m glad you didn\'t go with it' },
  { type: 'their', from: 'hudson', text: 'That said...' },
  { type: 'their', from: 'hudson', text: 'I think we need to go quiet for a bit' },
  { type: 'their', from: 'hudson', text: 'Actually quiet' },
  { type: 'choice', options: [
    { text: 'What do you mean?' },
    { text: 'Go quiet how?' },
  ]},
  { type: 'their', from: 'hudson', text: 'I\'m going to go home for a bit. Clear my head' },
  { type: 'their', from: 'hudson', text: 'I can\'t really do that when we\'re talking every day' },
  { type: 'their', from: 'hudson', text: 'I know that\'s a weird thing to say' },
  { type: 'choice', options: [
    { text: 'I get it. I\'ll miss you.' },
    { text: 'I don\'t want you to go.' },
  ]},
  { type: 'their', from: 'hudson', text: 'I\'ll figure something out when things are calmer' },
  { type: 'their', from: 'hudson', text: 'I\'ll miss you too, obviously' },
  { type: 'their', from: 'hudson', text: 'That\'s kind of the problem' },
  ...okFarewell,
];

const scriptC_bad = [
  { type: 'their', from: 'hudson', text: 'Right' },
  { type: 'their', from: 'hudson', text: 'When you put it that way...' },
  { type: 'their', from: 'hudson', text: 'Probably not' },
  { type: 'wait', ms: 2500 },
  {
    type: 'gameover',
    animate: 'bad',
    message: 'You made it about his decision. Hudson needed you to talk about yours.',
    retryScreen: 'S3_07_C',
    restartScreen: 'S3_01',
    restartLabel: 'Restart Chapter 3',
  },
];

const scriptC = [
  { type: 'their', from: 'hudson', text: 'Is your inbox as bad as mine is' },
  { type: 'choice', options: [
    { text: 'Only because Nick is sending me an email a minute.' },
    { text: 'I haven\'t opened it since this morning.' },
  ]},
  { type: 'their', from: 'hudson', text: 'Nick called me too' },
  { type: 'their', from: 'hudson', text: 'He said you passed on the Victor angle' },
  { type: 'their', from: 'hudson', text: 'Why?' },
  { type: 'choice', options: [
    { text: 'I was afraid. I didn\'t know how to protect us.',                                  extend: scriptC_good },
    { text: 'It just didn\'t feel right.',                                                       extend: scriptC_ok   },
    { text: 'Going to Hi Tops was too much. It wouldn\'t have made a difference.',              extend: scriptC_bad  },
  ]},
];

// ── Components ────────────────────────────────────────────────────

export function S3_07_A() {
  return (
    <ConversationPlayer
      contact={{ name: 'Huddy', avatar: 'hudsonAvatar' }}
      script={scriptA}
      immediateFirst
    />
  );
}

export function S3_07_B() {
  return (
    <ConversationPlayer
      contact={{ name: 'Huddy', avatar: 'hudsonAvatar' }}
      script={scriptB}
      immediateFirst
    />
  );
}

export function S3_07_C() {
  return (
    <ConversationPlayer
      contact={{ name: 'Huddy', avatar: 'hudsonAvatar' }}
      script={scriptC}
      immediateFirst
    />
  );
}
