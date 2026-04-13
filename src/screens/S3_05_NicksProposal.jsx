import { useState, useEffect } from 'react';
import useGameStore from '../store/gameStore';
import { getImage } from '../assets/images';
import EmailViewer from '../components/EmailViewer';

/**
 * S3_05 — Nick's Proposal
 * Nick's email with three PR options — styled like S2_02.
 * Option cards inside the email body, blue choice buttons fixed at bottom,
 * reply slides up as a white sheet when chosen, then navigates after delay.
 */

const EMAIL_INTRO = `Connor,

I know it's early but I wanted to get ahead of this before it spirals further.

Sarah and I have been talking through options. Nothing is off the table, but we need a response from you by noon if we're going to get anything into the afternoon news cycle.`;

const EMAIL_OPTIONS = [
  {
    label: 'Option A',
    title: 'Put out a statement',
    desc: 'Hudson\'s team is drafting a quote about Keira. We\'ll coordinate and have you go on record: you were being a supportive friend, nothing more.',
  },
  {
    label: 'Option B',
    title: 'Create a distraction',
    desc: 'Move up the Ascension PR with Victor. One private photo of you two, and we let the Internet connect the dots. Take the heat off Hudson.',
  },
  {
    label: 'Option C',
    title: 'Do nothing',
    desc: 'No statement, no Victor angle. Ride it out and hope the attention burns itself out on its own. Risky, but it\'s an option.',
  },
];

const EMAIL_FOOTER = `This is your call, Connor.

Nick`;

const OPTIONS = [
  { label: 'I think... the statement.',    flag: 'statement',   reply: 'Good. I\'ll coordinate with Hudson\'s team now.',   next: 'S3_06_A' },
  { label: 'I think... the distraction.', flag: 'distraction', reply: 'Got it. I\'ll loop in Victor\'s team right away.',    next: 'S3_06_B' },
  { label: 'I think... do nothing.',      flag: 'nothing',     reply: 'OK. I\'ll hold off. Keep your head down today.',    next: 'S3_06_C' },
];

export default function S3_05_NicksProposal() {
  const setFlag = useGameStore((s) => s.setFlag);
  const goToScreen = useGameStore((s) => s.goToScreen);
  const pushNotification = useGameStore((s) => s.pushNotification);
  const [chosen, setChosen] = useState(null);
  const [showReply, setShowReply] = useState(false);

  const handleChoice = (opt) => {
    setFlag('ch3_strategy', opt.flag);
    setChosen(opt);
    setShowReply(true);
    // If distraction: Victor's tag notification appears straight away on the email
    if (opt.flag === 'distraction') {
      setTimeout(() => {
        pushNotification({
          id: 'n_s3_05_victor_tag',
          from: 'victorhallberg',
          avatar: 'victorAvatar',
          preview: 'victorhallberg tagged you in a photo.',
          target: 'S3_06_B',
        });
      }, 600);
    }
  };

  useEffect(() => {
    if (!showReply || !chosen) return;
    const t = setTimeout(() => goToScreen(chosen.next), 4000);
    return () => clearTimeout(t);
  }, [showReply]);

  return (
    <div className="flex-1 min-h-0 flex flex-col relative">
      <EmailViewer
        from={{ name: 'Nick Vasquez', avatar: 'nickAvatar' }}
        subject="Moving up the Victor conversation"
        body={EMAIL_INTRO}
      >
        {/* Styled option cards inside the email body */}
        <div className="space-y-2 mt-1 mb-4">
          {EMAIL_OPTIONS.map((opt) => (
            <div key={opt.label} className="rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2.5">
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-0.5">{opt.label}</p>
              <p className="text-sm font-semibold text-neutral-900 leading-snug">{opt.title}</p>
              <p className="text-sm text-neutral-600 leading-relaxed mt-0.5">{opt.desc}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div>
          {EMAIL_FOOTER.split('\n').map((line, i) => (
            <p key={i} className={`text-sm text-neutral-800 leading-relaxed ${line === '' ? 'h-3' : ''}`}>{line}</p>
          ))}
        </div>
      </EmailViewer>

      {/* Choice buttons — fixed bottom bar, blue style like S2_02 */}
      {!chosen && (
        <div className="flex-shrink-0 flex flex-col gap-2 p-4 bg-white border-t border-neutral-200">
          {OPTIONS.map((opt) => (
            <button
              key={opt.flag}
              onClick={() => handleChoice(opt)}
              className="w-full px-4 py-2.5 rounded-2xl border border-blue-400 bg-blue-50 text-blue-700 text-sm text-left active:bg-blue-100 active:scale-[0.98] transition-all"
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      {/* Nick's reply — white sheet slides up from bottom, S2_02 style */}
      {showReply && chosen && (
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-white rounded-t-3xl shadow-2xl border-t border-neutral-100 animate-slide-up">
          {/* Sheet handle */}
          <div className="w-10 h-1 bg-neutral-300 rounded-full mx-auto mt-3 mb-4" />
          <div className="px-5 pb-7">
            {/* Sender row */}
            <div className="flex items-center gap-3 mb-3">
              <img
                src={getImage('nickAvatar')}
                alt=""
                className="w-9 h-9 rounded-full object-cover bg-neutral-200 flex-shrink-0"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <div>
                <p className="text-sm font-semibold text-neutral-900">Nick Vasquez</p>
                <p className="text-xs text-neutral-500">to me</p>
              </div>
            </div>
            {/* Subject */}
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3">
              Re: Moving up the Victor conversation
            </p>
            {/* Body */}
            <div className="space-y-2 text-sm text-neutral-800 leading-relaxed">
              <p>{chosen.reply}</p>
              <p className="text-neutral-500">— Nick</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
