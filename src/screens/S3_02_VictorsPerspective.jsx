import ConversationPlayer from '../components/ConversationPlayer';

/**
 * S3_02 — Victor's Perspective
 * Victor checks in on Connor with warm, oblique mentor advice.
 * All choices are flavor only — no branching impact.
 * Ends with Google News notification → S3_03.
 */

const script = [
  { type: 'their', from: 'victor', text: 'I see you were busy last night.' },

  { type: 'choice', options: [
    { text: 'Sorry again for cancelling last minute.' },
    { text: 'I\'m a bit overwhelmed...' },
  ]},

  { type: 'their', from: 'victor', text: 'I\'ll leave strategic discussions to our teams.' },
  { type: 'their', from: 'victor', text: 'I wanted to check in on you.' },
  { type: 'their', from: 'victor', text: 'You seemed lighter yesterday, at rehearsal.' },
  { type: 'their', from: 'victor', text: 'But now the weight of the world has followed you home.' },

  { type: 'choice', options: [
    { text: 'I felt so happy yesterday!' },
    { text: 'Any wisdom to share? I\'ll take it.' },
  ]},

  { type: 'their', from: 'victor', text: 'Never deny the full depth of your emotions, even if they bring pain.' },
  { type: 'their', from: 'victor', text: 'Can I tell you something?' },

  { type: 'choice', options: [
    { text: 'Please.' },
    { text: 'Go ahead.' },
  ]},

  { type: 'their', from: 'victor', text: 'When I was your age, I made a decision to keep something private.' },
  { type: 'their', from: 'victor', text: 'Not because I was ashamed of it.' },
  { type: 'their', from: 'victor', text: 'Because I was afraid that it would somehow stop belonging to me.' },
  { type: 'their', from: 'victor', text: 'The world is very good at taking things that are yours and making them into something you no longer recognize.' },

  { type: 'choice', options: [
    { text: 'I think I already know what that feels like.' },
    { text: 'What if protecting it means losing it anyway?' },
  ]},

  { type: 'their', from: 'victor', text: 'You understand more than you think.' },
  { type: 'their', from: 'victor', text: 'The only question that matters is what you intend to do about it.' },

  { type: 'choice', options: [
    { text: 'That\'s not very comforting.' },
    { text: '...Yeah.' },
  ]},

  { type: 'their', from: 'victor', text: 'Whatever you decide, know that there is no right or wrong answer.' },
  { type: 'their', from: 'victor', text: 'Now. Get some rest. Shooting starts soon.' },

  { type: 'notification', id: 'n_s3_02_news', from: 'Google News', avatar: 'googleNewsAvatar', preview: 'Hudson W.\'s girlfriend Keira K. spotted with mystery man', target: 'S3_03' },
];

export default function S3_02_VictorsPerspective() {
  return (
    <ConversationPlayer
      contact={{ name: 'Victor Hallberg', avatar: 'victorAvatar' }}
      script={script}
      immediateFirst
    />
  );
}
