import useGameStore from '../store/gameStore';
import ConversationPlayer from '../components/ConversationPlayer';
import { getImage } from '../assets/images';

/**
 * S3_15 — Epilogue
 * Two ending types × four project dialogue variants = 8 possible conversations.
 * Background image set in the chat (epilogueRomantic or epilogueFriends).
 * Ends with chapter complete popup.
 */

// ── ROMANTIC epilogues (4 project variants) ───────────────────────

const romanticA = [ // acted opposite each other
  { type: 'their', from: 'hudson', text: 'The trades are saying our chemistry is still unbeatable' },
  { type: 'auto', text: 'The trades are correct.' },
  { type: 'their', from: 'hudson', text: 'Funny how that works' },
  { type: 'their', from: 'hudson', text: 'Almost like we\'re not acting' },
  { type: 'auto', text: 'Are you saying you\'re not a good actor?' },
  { type: 'their', from: 'hudson', text: 'Rude' },
  { type: 'their', from: 'hudson', text: 'That makes two of us' },
  { type: 'auto', text: 'Shut up, you know what I think about your acting.' },
  { type: 'their', from: 'hudson', text: 'You just say that because you\'re in love with me' },
  { type: 'auto', text: '...Those aren\'t mutually exclusive.' },
  { type: 'auto', image: 'connorTeasing' },
  { type: 'their', from: 'hudson', text: 'Hey are you still at the studio' },
  { type: 'auto', text: 'Wrapping up, why?' },
  { type: 'their', from: 'hudson', text: 'Come over when you\'re done' },
  { type: 'their', from: 'hudson', text: 'I\'ll make dinner' },
  { type: 'auto', text: 'You can\'t cook.' },
  { type: 'their', from: 'hudson', text: 'Fine, I ordered Sweetgreens' },
  { type: 'auto', text: 'I\'ll be there in an hour.' },
  { type: 'their', from: 'hudson', text: '❤️' },
  { type: 'chapter_complete', title: 'Private Messages: The End', subtitle: 'Chapter 3 Complete', message: 'We finally gave it a name.\nThis is the real us. ❤️' },
];

const romanticB = [ // Connor directs Hudson
  { type: 'their', from: 'hudson', text: 'Everyone on set keeps asking if you\'re always this intense' },
  { type: 'auto', text: 'What did you tell them?' },
  { type: 'their', from: 'hudson', text: 'I said yes and that they should feel honoured' },
  { type: 'their', from: 'hudson', text: 'Director Connor knows what he wants both in public and in private' },
  { type: 'auto', text: 'Good.' },
  { type: 'their', from: 'hudson', text: 'So bossy' },
  { type: 'auto', text: 'You knew what you were signing up for.' },
  { type: 'their', from: 'hudson', text: 'I did' },
  { type: 'their', from: 'hudson', text: 'Worth it' },
  { type: 'auto', image: 'connorWink' },
  { type: 'their', from: 'hudson', text: 'Stop distracting me, I\'m trying to remember my lines' },
  { type: 'auto', text: 'You love it.' },
  { type: 'their', from: 'hudson', text: 'I really do ❤️' },
  { type: 'chapter_complete', title: 'Private Messages: The End', subtitle: 'Chapter 3 Complete', message: 'We finally gave it a name.\nThis is the real us. ❤️' },
];

const romanticC = [ // co-writing
  { type: 'their', from: 'hudson', text: 'Page 47 still doesn\'t work' },
  { type: 'auto', text: 'I know.' },
  { type: 'their', from: 'hudson', text: 'I\'ve been staring at it for an hour' },
  { type: 'auto', text: 'Stop staring at it.' },
  { type: 'their', from: 'hudson', text: 'My mind is all over the place' },
  { type: 'their', from: 'hudson', image: 'hudsonHeadback' },
  { type: 'auto', text: 'Come over.' },
  { type: 'their', from: 'hudson', text: 'Yeah?' },
  { type: 'auto', text: 'Bring your laptop.' },
  { type: 'their', from: 'hudson', text: 'And if I forget my laptop' },
  { type: 'auto', text: 'Hudson.' },
  { type: 'their', from: 'hudson', text: 'I\'m kidding' },
  { type: 'their', from: 'hudson', text: 'I\'m already in the car' },
  { type: 'auto', text: 'I know.' },
  { type: 'their', from: 'hudson', text: 'How do you always know' },
  { type: 'auto', text: 'I just know what you need, baby.' },
  { type: 'their', from: 'hudson', text: 'Yeah' },
  { type: 'their', from: 'hudson', text: 'You really do' },
  { type: 'their', from: 'hudson', text: '❤️' },
  { type: 'chapter_complete', title: 'Private Messages: The End', subtitle: 'Chapter 3 Complete', message: 'We finally gave it a name.\nThis is the real us. ❤️' },
];

const romanticD = [ // act in Hudson's project
  { type: 'their', from: 'hudson', text: 'How does it feel to be directed by your boyfriend' },
  { type: 'auto', text: 'Honestly?' },
  { type: 'auto', text: 'Best decision I ever made, baby.' },
  { type: 'their', from: 'hudson', text: 'The project or the boyfriend' },
  { type: 'auto', text: 'Yes.' },
  { type: 'their', from: 'hudson', text: 'You\'re going to be insufferable at the premiere aren\'t you' },
  { type: 'auto', text: 'I\'m just going to stand next to you and look pretty.' },
  { type: 'their', from: 'hudson', text: 'That\'s somehow scarier' },
  { type: 'auto', image: 'connorSeductive' },
  { type: 'their', from: 'hudson', text: 'How am I still this obsessed with you' },
  { type: 'auto', text: 'You put me in your movie, Huddy.' },
  { type: 'their', from: 'hudson', text: 'Best decision I ever made' },
  { type: 'their', from: 'hudson', text: '❤️' },
  { type: 'chapter_complete', title: 'Private Messages: The End', subtitle: 'Chapter 3 Complete', message: 'We finally gave it a name.\nThis is the real us. ❤️' },
];

// ── WARM epilogues (4 project variants) ──────────────────────────

const warmA = [ // acted opposite each other
  { type: 'their', from: 'hudson', text: 'The trades are saying our chemistry is still unbeatable' },
  { type: 'auto', text: 'The trades are correct.' },
  { type: 'their', from: 'hudson', text: 'You know, since we\'re best friends...' },
  { type: 'their', from: 'hudson', text: 'The chemistry thing is a little embarrassing' },
  { type: 'auto', text: 'Why embarrassing.' },
  { type: 'their', from: 'hudson', text: 'Because it\'s so obvious' },
  { type: 'auto', text: 'What is?' },
  { type: 'their', from: 'hudson', text: 'That I just like you a normal amount' },
  { type: 'auto', text: 'A normal amount.' },
  { type: 'their', from: 'hudson', text: 'An entirely normal best friend amount' },
  { type: 'auto', text: 'Sure, Huddy.' },
  { type: 'their', from: 'hudson', text: 'Stop smiling' },
  { type: 'auto', text: 'I\'m not smiling.' },
  { type: 'their', from: 'hudson', text: 'Hey are you still at the studio' },
  { type: 'auto', text: 'Wrapping up, why?' },
  { type: 'their', from: 'hudson', text: 'Come over when you\'re done' },
  { type: 'their', from: 'hudson', text: 'I\'ll make dinner' },
  { type: 'auto', text: 'You can\'t cook.' },
  { type: 'their', from: 'hudson', text: 'Fine, I ordered Sweetgreens' },
  { type: 'auto', text: 'I\'ll be there in an hour.' },
  { type: 'their', from: 'hudson', text: '💙' },
  { type: 'chapter_complete', title: 'Private Messages: The End', subtitle: 'Chapter 3 Complete', message: 'We finally gave it a name.\nThis is the real us. ❤️' },
];

const warmB = [ // Connor directs Hudson
  { type: 'auto', text: 'You were perfect in the big scene today.' },
  { type: 'their', from: 'hudson', text: 'You\'re just saying that' },
  { type: 'auto', text: 'I never just say things.' },
  { type: 'their', from: 'hudson', text: '... No, you don\'t' },
  { type: 'their', from: 'hudson', text: 'Thank you, Con' },
  { type: 'auto', text: 'Don\'t thank me, you did all the work!' },
  { type: 'their', from: 'hudson', text: 'You\'re a good director you know' },
  { type: 'their', from: 'hudson', text: 'Distractingly intense but good' },
  { type: 'auto', text: 'Distractingly intense?' },
  { type: 'their', from: 'hudson', text: 'It\'s a compliment' },
  { type: 'their', from: 'hudson', text: 'Hey are you still at the studio' },
  { type: 'auto', text: 'Wrapping up, why?' },
  { type: 'their', from: 'hudson', text: 'Come over when you\'re done' },
  { type: 'their', from: 'hudson', text: 'I want to show you an idea for tomorrow\'s scene' },
  { type: 'their', from: 'hudson', text: 'And I ordered Sweetgreens' },
  { type: 'auto', text: 'I\'ll be there in an hour.' },
  { type: 'their', from: 'hudson', text: '💙' },
  { type: 'chapter_complete', title: 'Private Messages: The End', subtitle: 'Chapter 3 Complete', message: 'We finally gave it a name.\nThis is the real us. ❤️' },
];

const warmC = [ // co-writing
  { type: 'their', from: 'hudson', text: 'Page 47 still doesn\'t work' },
  { type: 'auto', text: 'I know.' },
  { type: 'their', from: 'hudson', text: 'I fixed it though' },
  { type: 'auto', text: 'What? How?' },
  { type: 'their', from: 'hudson', text: 'I changed one word' },
  { type: 'auto', text: 'WHICH WORD??' },
  { type: 'their', from: 'hudson', text: 'Come over and I\'ll show you' },
  { type: 'auto', text: 'Hudson.' },
  { type: 'their', from: 'hudson', text: 'It\'s a writing emergency' },
  { type: 'auto', text: 'It absolutely is not.' },
  { type: 'their', from: 'hudson', text: 'But what if your co-writer is on the verge of death by bad word choice?' },
  { type: 'auto', text: 'Relax. I\'m already in the car.' },
  { type: 'their', from: 'hudson', text: 'I knew you would be, you can\'t refuse me' },
  { type: 'auto', text: 'Shut up.' },
  { type: 'their', from: 'hudson', text: 'Never' },
  { type: 'their', from: 'hudson', text: '💙' },
  { type: 'chapter_complete', title: 'Private Messages: The End', subtitle: 'Chapter 3 Complete', message: 'We finally gave it a name.\nThis is the real us. ❤️' },
];

const warmD = [ // act in Hudson's project
  { type: 'their', from: 'hudson', text: 'How does it feel to be directed by your best friend' },
  { type: 'auto', text: 'Honestly?' },
  { type: 'auto', text: 'Best decision I ever made, baby.' },
  { type: 'their', from: 'hudson', text: 'Yeah?' },
  { type: 'their', from: 'hudson', text: 'Even when I made you do that scene fourteen times' },
  { type: 'auto', text: 'Did you really make me do it fourteen times?' },
  { type: 'their', from: 'hudson', text: 'You were getting it wrong' },
  { type: 'auto', text: 'I was getting it wrong fourteen times?' },
  { type: 'their', from: 'hudson', text: 'You got it right on the fourteenth' },
  { type: 'auto', text: 'I cannot stand you.' },
  { type: 'their', from: 'hudson', text: 'Yes you can' },
  { type: 'auto', text: 'Yes, I can.' },
  { type: 'their', from: 'hudson', text: 'Best decision I ever made too, by the way' },
  { type: 'auto', text: 'The casting or the best friend?' },
  { type: 'their', from: 'hudson', text: 'Yes' },
  { type: 'their', from: 'hudson', text: '💙' },
  { type: 'chapter_complete', title: 'Private Messages: The End', subtitle: 'Chapter 3 Complete', message: 'We finally gave it a name.\nThis is the real us. ❤️' },
];

// ── Script lookup tables ──────────────────────────────────────────

const ROMANTIC_SCRIPTS = { A: romanticA, B: romanticB, C: romanticC, D: romanticD };
const WARM_SCRIPTS     = { A: warmA,     B: warmB,     C: warmC,     D: warmD     };

// ── Wrapper with background image ─────────────────────────────────

function EpiloguePlayer({ bgImage, script }) {
  return (
    <div className="flex-1 min-h-0 flex flex-col relative">
      {/* Background image behind the conversation */}
      <div className="absolute inset-0 z-0">
        <img
          src={getImage(bgImage)}
          alt=""
          className="w-full h-full object-cover opacity-30"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      </div>
      <div className="relative z-10 flex-1 min-h-0 flex flex-col">
        <ConversationPlayer
          contact={{ name: 'Huddy', avatar: 'hudsonAvatar' }}
          script={script}
          immediateFirst
          bgClass="bg-transparent"
        />
      </div>
    </div>
  );
}

// ── Exported screen components ────────────────────────────────────

export function S3_15_Romantic() {
  const flags = useGameStore((s) => s.flags);
  const projectChoice = flags.ch3_project || 'A';
  const script = ROMANTIC_SCRIPTS[projectChoice] || romanticA;
  return <EpiloguePlayer bgImage="epilogueRomantic" script={script} />;
}

export function S3_15_Warm() {
  const flags = useGameStore((s) => s.flags);
  const projectChoice = flags.ch3_project || 'A';
  const script = WARM_SCRIPTS[projectChoice] || warmA;
  return <EpiloguePlayer bgImage="epilogueFriends" script={script} />;
}
