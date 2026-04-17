import { useState, useEffect } from 'react';
import useGameStore from '../store/gameStore';
import { getImage } from '../assets/images';
import EmailViewer from '../components/EmailViewer';

/**
 * S3_10 — The Project
 * Nick's email about Hudson's indie project pitch.
 * S2_02-style: email body + blue choice buttons in fixed bottom bar
 * + white reply sheet slides up → Huddy calling notification → S3_11.
 */

const EMAIL_BODY = `Connor,

Got a call from Hudson's people just now.

They're pitching a collaborative indie project. Sounds like they're open to all creative avenues between you two.

I know the last months have been hard. If you want to clear the air, bringing the focus back to work isn't a bad way to do it. The money will be there with both of you attached. And of course, you can make of it what you like publicly.

Let me know if you want to set up a call this week.

Nick`;

const OPTIONS = [
  { label: 'What if we acted opposite each other again?',             flag: 'A', reply: 'Ha. I thought you might say that. Let\'s set up the call.' },
  { label: 'I\'ve always wanted to direct Hudson in a project.',      flag: 'B', reply: 'Interesting. That\'s a new angle. I\'ll put some feelers out.' },
  { label: 'Hudson and I co-writing a movie could be incredible.',    flag: 'C', reply: 'Interesting. That\'s a new angle. I\'ll put some feelers out.' },
  { label: 'I\'ve always wanted to act in one of Hudson\'s projects.', flag: 'D', reply: 'Ha. I thought you might say that. Let\'s set up the call.' },
];

export default function S3_10_TheProject() {
  const setFlag = useGameStore((s) => s.setFlag);
  const pushNotification = useGameStore((s) => s.pushNotification);
  const [chosen, setChosen] = useState(null);
  const [showReply, setShowReply] = useState(false);

  const handleChoice = (opt) => {
    setFlag('ch3_project', opt.flag);
    setChosen(opt);
    setShowReply(true);
  };

  useEffect(() => {
    if (!showReply || !chosen) return;
    const t = setTimeout(() => {
      pushNotification({
        id: 'n_s3_10_huddy_call',
        from: 'Huddy',
        avatar: 'hudsonAvatar',
        preview: 'Huddy is calling you',
        target: 'S3_11',
      });
    }, 2000);
    return () => clearTimeout(t);
  }, [showReply]);

  return (
    <div className="flex-1 min-h-0 flex flex-col relative">
      <EmailViewer
        from={{ name: 'Nick Vasquez', avatar: 'nickAvatar' }}
        subject="Hudson's team reached out"
        body={EMAIL_BODY}
      />

      {/* Choice buttons — fixed bottom bar, blue style */}
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

      {/* Nick's reply — white sheet slides up from bottom */}
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
              Re: Hudson's team reached out
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
