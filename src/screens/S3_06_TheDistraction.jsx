import { useState } from 'react';
import useGameStore from '../store/gameStore';
import { getImage } from '../assets/images';
import CommentPicker from '../components/CommentPicker';

/**
 * S3_06_B — The Distraction
 * Phase 0: Instagram app showing. After 2.5s, a local IG notification slides in:
 *   "@victorhallberg tagged you in a photo."
 * User taps it → Phase 1: Victor's post view (back button disabled).
 * Caption: "The most bewitching person in the room. @connor_s" — @connor_s is blue but NOT clickable.
 * User selects a comment → comment appears on post → 2s later Huddy notification → S3_07_B.
 */

const COMMENT_OPTIONS = [
  { text: '😘' },
  { text: '😴' },
  { text: '❤️' },
];

const POST_COMMENTS = [
  { username: 'hudconstrong', text: '... please not this again' },
  { username: 'pomelos_writes', text: 'I feel sick' },
  { username: 'ilyad0wnbad', text: 'the way hudson has gone completely silent' },
  { username: 'berthardy', text: 'victor said choose violence' },
  { username: 'genz_movies', text: 'I\'m going to need everyone to calm down including myself' },
  { username: 'merryhudconmas', text: 'real ones are experiencing war flashbacks' },
  { username: 'wingedfane', text: 'someone check on hudson' },
];

export default function S3_06_TheDistraction() {
  const pushNotification = useGameStore((s) => s.pushNotification);
  const setFlag = useGameStore((s) => s.setFlag);

  const [connorComment, setConnorComment] = useState(null);
  const [commented, setCommented] = useState(false);

  const handleComment = (opt) => {
    setFlag('ch3_distraction_comment', opt.text);
    setConnorComment(opt.text);
    setCommented(true);
    // Let the comment appear on the post for 2s before Huddy notification fires
    setTimeout(() => {
      pushNotification({
        id: 'n_s3_06b_huddy',
        from: 'Huddy',
        avatar: 'hudsonAvatar',
        preview: 'Hey. Can we talk',
        target: 'S3_07_B',
      });
    }, 2000);
  };

  // ── Victor's post view (back button disabled) ─────────────
  const comments = [
    ...POST_COMMENTS,
    ...(connorComment ? [{ username: 'connor_s', text: connorComment }] : []),
  ];

  return (
    <div className="flex-1 min-h-0 flex flex-col bg-white">
      {/* Header — no back button */}
      <div className="flex-shrink-0 flex items-center gap-3 px-4 py-3 border-b border-neutral-200">
        <div className="w-5" />
        <span className="font-semibold text-sm text-black flex-1 text-center">Post</span>
        <div className="w-5" />
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Post author */}
        <div className="flex items-center gap-2 px-4 py-3">
          <img
            src={getImage('victorAvatar')}
            alt=""
            className="w-8 h-8 rounded-full object-cover bg-neutral-200"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <span className="font-semibold text-sm text-black">victorhallberg</span>
        </div>

        {/* Post image */}
        <div className="w-full aspect-square bg-neutral-100">
          <img
            src={getImage('connorSleep')}
            alt=""
            className="w-full h-full object-cover"
            onError={(e) => { e.target.className = 'w-full h-full bg-neutral-200'; }}
          />
        </div>

        {/* Action bar (decorative) */}
        <div className="flex items-center gap-4 px-4 py-3">
          <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
          </svg>
        </div>

        {/* Caption — @connor_s is blue but NOT a button */}
        <div className="px-4 pb-2">
          <p className="text-sm text-black">
            <span className="font-semibold mr-1">victorhallberg</span>
            The most bewitching person in the room.{' '}
            <span className="text-blue-500 font-medium">@connor_s</span>
          </p>
        </div>

        {/* Comments */}
        <div className="px-4 pb-4 space-y-2">
          {comments.map((c, i) => (
            <p key={i} className="text-sm text-black">
              <span className="font-semibold mr-1">{c.username}</span>
              {c.text}
            </p>
          ))}
        </div>
      </div>

      {/* Comment picker — visible until commented */}
      {!commented && (
        <CommentPicker
          options={COMMENT_OPTIONS}
          username="connor_s"
          onSelect={handleComment}
        />
      )}
    </div>
  );
}
