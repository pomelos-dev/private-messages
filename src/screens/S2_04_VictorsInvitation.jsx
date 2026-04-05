import ConversationPlayer from '../components/ConversationPlayer';
import useGameStore from '../store/gameStore';

/**
 * S2_04 — Victor's Invitation
 * Victor congratulates Connor and invites him to dinner.
 * A notification from @hudsonw_updates arrives during Victor's response → S2_05
 */

const script = [
  { type: 'their', from: 'victor', text: 'I just saw the announcement. You should be proud.' },

  { type: 'choice', options: [
    { text: 'Thank you. I\'m nervous and excited.' },
    { text: 'I hope we can live up to the hype.' },
    { text: 'It still doesn\'t feel real...' },
  ]},

  { type: 'their', from: 'victor', text: 'There\'s nothing to worry about. I\'m certain of it.' },
  { type: 'their', from: 'victor', text: 'Actually, I was wondering \u2014 would you be free for dinner this evening?' },
  { type: 'their', from: 'victor', text: 'I\'d like to get to know you better outside of rehearsals.' },
  { type: 'their', from: 'victor', text: 'We can talk about the characters, your hopes and fears... whatever feels right to you.' },

  { type: 'choice', options: [
    { text: 'I\'d really like that. Tonight works for me.' },
    { text: 'Thanks for the invitation. I\'d be interested in hearing your perspective.' },
    { text: 'Sounds like fun. I\'m always starving after rehearsals.' },
  ]},

  { type: 'their', from: 'victor', text: 'Wonderful. I look forward to it immensely.' },

  { type: 'wait', ms: 2000 },
  { type: 'notification', id: 'n_s2_04', from: '@hudsonw_updates', avatar: 'hudsonwUpdatesAvatar', preview: 'tagged you in a post', target: 'S2_05' },
];

export default function S2_04_VictorsInvitation() {
  const goToScreen = useGameStore((s) => s.goToScreen);
  return (
    <ConversationPlayer
      contact={{ name: 'Victor Hallberg', avatar: 'victorAvatar' }}
      script={script}
      onBack={() => goToScreen('S0')}
      immediateFirst
    />
  );
}
