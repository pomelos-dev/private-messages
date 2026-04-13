import { useState, useMemo } from 'react';
import useGameStore from '../store/gameStore';
import InstagramBrowser from '../components/InstagramBrowser';
import CommentPicker from '../components/CommentPicker';

/**
 * S3_09 — Six Months Later
 * Builds on S3_01 profile state with six-months-later updates.
 * Victor's connorSleep post visible if ch3_strategy === 'distraction'.
 * CommentPicker only shown when viewing hudson_w's hw_dot post.
 * Comment appears on post ~2s before Nick notification fires → S3_10.
 */

const COMMENT_OPTIONS = [
  { text: 'Handsomest piece of man out there' },
  { text: 'My heart goes...' },
  { text: 'You\'re mine' },
];

// ── @connor_s ────────────────────────────────────────────────────────
const CONNOR_PROFILE = {
  displayName: 'Connor S.',
  avatar: 'connorAvatar',
  isFollowing: true,
  posts: [
    { id: 'cs_ascension', image: 'nureyevDancing', caption: 'Ascension. In theatres now.', comments: [
      { username: 'victorhallberg', text: 'So proud of you.' },
      { username: 'taytay', text: 'my brother is a STAR 🌟' },
    ]},
    { id: 'cs_0', image: 'connorHudsonSunset', caption: 'He matches my enthusiasm ♒️♓️✨', comments: [{ username: 'hudson_w', text: '❤️❤️❤️' }] },
    { id: 'cs_1', image: 'connorIg1', caption: 'Early morning espresso. Worth it.', comments: [] },
    { id: 'cs_2', image: 'connorIg2', caption: 'Should I learn ballet next?', comments: [] },
    { id: 'cs_3', image: 'connorIg3', objectPosition: 'top', caption: '📍West Hollywood, baby.', comments: [{ username: 'victorhallberg', text: 'You are so special' }] },
  ],
};

// ── @victorhallberg ──────────────────────────────────────────────────
// Distraction post (conditionally prepended if ch3_strategy === 'distraction')
const makeVictorProfile = (distractionComment) => ({
  displayName: 'Victor Hallberg',
  avatar: 'victorAvatar',
  isFollowing: true,
  posts: [
    { id: 'vh_ascension', image: 'nureyevDancing', caption: 'Ascension opens this week. I am proud of what we made. @connor_s', comments: [
      { username: 'genz_movies', text: 'this film is EVERYTHING' },
      { username: 'ohmyhollander', text: 'Oscar season incoming' },
    ]},
    ...(distractionComment
      ? [{
          id: 'vh_distraction',
          image: 'connorSleep',
          caption: 'The most bewitching person in the room. @connor_s',
          comments: [
            { username: 'hudconstrong', text: '... please not this again' },
            { username: 'pomelos_writes', text: 'I feel sick' },
            { username: 'ilyad0wnbad', text: 'the way hudson has gone completely silent' },
            { username: 'berthardy', text: 'victor said choose violence' },
            { username: 'genz_movies', text: 'I\'m going to need everyone to calm down including myself' },
            { username: 'merryhudconmas', text: 'real ones are experiencing war flashbacks' },
            { username: 'wingedfane', text: 'someone check on hudson' },
            { username: 'connor_s', text: distractionComment },
          ],
        }]
      : []),
    { id: 'vh_1', image: 'victorIg1', caption: 'Erik Bruhn and Rudolf Nureyev were mirrors, shadows, and something harder to name. I can already tell this film will ask the same of us. Honored to be working opposite @connor_s on Ascension.', comments: [] },
    { id: 'vh_2', image: 'victorIg2', caption: 'Stockholm in the summer.', comments: [] },
    { id: 'vh_3', image: 'victorIg3', objectPosition: 'top', caption: 'The work asks everything of you. Give it.', comments: [] },
  ],
});

// ── @taytay ──────────────────────────────────────────────────────────
const TAYTAY_PROFILE = {
  displayName: 'Tayler S.',
  avatar: 'taytayAvatar',
  isFollowing: true,
  posts: [
    { id: 'tt_checkin', image: 'taytayCandid', caption: 'Checking in on my brother who never checks in on me 🙄❤️', comments: [] },
    { id: 'tt_ascension', image: 'nureyevDancing', caption: 'Ascension was incredible btw. I cried. Don\'t tell him', comments: [
      { username: 'taytay', text: 'he found this post and I\'m not allowed to elaborate' },
    ]},
    { id: 'tt_new', image: 'taytayKids', objectPosition: 'top', caption: 'Haters better stfu 🙂', comments: [] },
    { id: 'tt_1', image: 'taytayIg1', objectPosition: 'top', caption: 'Proud of my brother even when he won\'t pick up the phone 🤧❤️', comments: [] },
    { id: 'tt_2', image: 'taytayIg2', caption: 'Texas forever honestly', comments: [] },
    { id: 'tt_3', image: 'taytayIg3', caption: 'Main character behavior starts now', comments: [] },
  ],
};

// ── @dogtherapy ──────────────────────────────────────────────────────
const DOGS_PROFILE = {
  displayName: 'Dog Therapy',
  avatar: 'dogsAvatar',
  isFollowing: true,
  posts: [
    { id: 'dg_presence', image: 'dogsPresence', caption: 'Absence doesn\'t make the heart grow fonder. Presence does', comments: [] },
    { id: 'dg_message', image: 'dogsMessage', caption: 'My human tells me to use my words to communicate', comments: [] },
    { id: 'dg_new', image: 'dogsBrave', caption: 'when you finally do the scary thing and it doesn\'t kill you', comments: [] },
    { id: 'dg_1', image: 'dogsIg1', caption: 'I don\'t know what you\'re going through but I think you should pet me', comments: [] },
    { id: 'dg_2', image: 'dogsIg2', caption: 'Availability: always. Judgment: never.', comments: [] },
    { id: 'dg_3', image: 'dogsIg3', caption: 'Psychiatrist said take it easy. This is me taking it easy', comments: [] },
  ],
};

// ── @hudsonw_updates ─────────────────────────────────────────────────
const HUDSON_UPDATES_PROFILE = {
  displayName: 'Hudson W. Updates',
  avatar: 'hudsonwUpdatesAvatar',
  isFollowing: true,
  bio: 'your #1 source for all things hudson w. 🍂',
  followers: '329K',
  posts: [
    {
      id: 'hwu_lff',
      image: 'hudsonSerious',
      caption: 'he showed up. that\'s all we\'re getting and we\'re grateful. 📍London Film Festival',
      comments: [
        { username: 'berthardy', text: 'he looks so tired 💔' },
        { username: 'wingedfane', text: 'the lack of smile is sending me to an early grave' },
        { username: 'hudconstrong', text: 'he\'s working and he\'s here and that\'s enough 💙' },
        { username: 'genz_movies', text: 'whatever is going on I hope he\'s OK' },
        { username: 'merryhudconmas', text: 'someone in a different country is also not smiling btw' },
        { username: 'chantalg', text: 'can people stop projecting onto him he\'s just at a press event' },
        { username: 'pomelos_writes', text: 'The eyes though' },
      ],
    },
    {
      id: 'hwu_throwback',
      image: 'hudsonThrowback',
      caption: 'throwing it back because content has been scarce and we miss him.',
      comments: [
        { username: 'berthardy', text: 'he used to post every other day' },
        { username: 'ilyad0wnbad', text: 'the smile in this photo vs what we\'re getting now 💔' },
        { username: 'hudconstrong', text: 'I miss him so much' },
        { username: 'merryhudconmas', text: 'six months of radio silence and I\'m supposed to be normal about it' },
        { username: 'ohmyhollander', text: 'he looks so happy here. whatever happened I hope he finds that again' },
        { username: 'wingedfane', text: 'Why do we always ruin nice things' },
      ],
    },
    {
      id: 'hwu_breaking',
      image: 'hudsonConnorWestHollywood',
      caption: 'BREAKING: they were BOTH there last night. we are not OK. #hudcon',
      comments: [
        { username: 'berthardy', text: 'I need to lie down' },
        { username: 'wingedfane', text: 'the separate branding is DEAD' },
        { username: 'ilyad0wnbad', text: 'hudcontwt has not slept' },
        { username: 'chantalg', text: 'Hudson has a long term girlfriend. You parasocial weirdos.' },
        { username: 'merryhudconmas', text: 'We never lose' },
      ],
    },
    {
      id: 'hwu_1',
      image: 'hudsonAirport',
      caption: 'GUYS. someone just sent us this from Vancouver airport this morning 👀',
      comments: [
        { username: 'ilyad0wnbad', text: 'WAIT WAIT WAIT' },
        { username: 'berthardy', text: 'he looks so good omg the hat' },
        { username: 'hudconstrong', text: 'THE TIMING. I\'m not okay' },
        { username: 'pomelos_writes', text: 'vacation era or something else era 👀' },
      ],
    },
    {
      id: 'hwu_2',
      image: 'hudsonRedCarpet',
      caption: 'never not stunning. that\'s it. that\'s the post.',
      comments: [
        { username: 'claudiemtl', text: 'obsessed with him forever' },
        { username: 'ohmyhollander', text: 'he deserves every award' },
      ],
    },
    {
      id: 'hwu_3',
      image: 'hudsonBTS',
      caption: 'throwback to him being absolutely unreal on set 🎬',
      comments: [
        { username: 'hudconstrong', text: 'this man was BORN to be famous' },
        { username: 'genz_movies', text: 'can we get a new project announcement please' },
      ],
    },
  ],
};

// ── @hudson_w ────────────────────────────────────────────────────────
const makeHudsonProfile = (connorComment) => ({
  displayName: 'Hudson W.',
  avatar: 'hudsonAvatar',
  isFollowing: true,
  posts: [
    {
      id: 'hw_dot',
      image: 'hudsonOutdoors',
      caption: '.',
      comments: [
        { username: 'hudconstrong', text: 'we\'re here for you always 💙' },
        { username: 'berthardy', text: 'i guess you could call that a caption' },
        { username: 'ilyad0wnbad', text: 'He looks like he\'s doing OK and I will not read into it' },
        { username: 'ohmyhollander', text: 'whatever goes on, the face card doesn\'t decline 💔' },
        ...(connorComment
          ? [{ username: 'connor_s', text: connorComment }]
          : []),
      ],
    },
    { id: 'hw_1', image: 'hudsonIg1', caption: 'Sometimes it feels like we exist in two different worlds', comments: [] },
    { id: 'hw_2', image: 'hudsonIg2', caption: 'I blinked and you were gone', comments: [] },
    { id: 'hw_3', image: 'hudsonIg3', caption: 'I wish next month would hurry up and get here, already', comments: [] },
  ],
});

export default function S3_09_SixMonths() {
  const pushNotification = useGameStore((s) => s.pushNotification);
  const ch3Strategy = useGameStore((s) => s.flags?.ch3_strategy);
  const distractionComment = useGameStore((s) => s.flags?.ch3_distraction_comment ?? null);

  const [connorComment, setConnorComment] = useState(null);
  const [commented, setCommented] = useState(false);
  const [viewingHwDot, setViewingHwDot] = useState(false);

  const profiles = useMemo(() => ({
    connor_s: CONNOR_PROFILE,
    victorhallberg: makeVictorProfile(ch3Strategy === 'distraction' ? distractionComment : null),
    taytay: TAYTAY_PROFILE,
    dogtherapy: DOGS_PROFILE,
    hudsonw_updates: HUDSON_UPDATES_PROFILE,
    hudson_w: makeHudsonProfile(connorComment),
  }), [connorComment, ch3Strategy, distractionComment]);

  const handlePostView = (username, postId) => {
    setViewingHwDot(username === 'hudson_w' && postId === 'hw_dot');
  };

  const handleComment = (opt) => {
    setConnorComment(opt.text);
    setCommented(true);
    // Comment appears on post, then after 2s fire Nick notification
    setTimeout(() => {
      pushNotification({
        id: 'n_s3_09_nick',
        from: 'Nick',
        avatar: 'nickAvatar',
        preview: 'Interesting news. Check your inbox.',
        target: 'S3_10',
      });
    }, 2000);
  };

  return (
    <div className="flex-1 min-h-0 flex flex-col bg-white">
      <div className="flex-1 min-h-0">
        <InstagramBrowser
          profiles={profiles}
          initialProfile="connor_s"
          ownUsername="connor_s"
          triggers={[]}
          onPostView={handlePostView}
        />
      </div>

      {/* CommentPicker only when viewing hudson_w's hw_dot post */}
      {viewingHwDot && !commented && (
        <CommentPicker
          options={COMMENT_OPTIONS}
          username="connor_s"
          onSelect={handleComment}
        />
      )}
    </div>
  );
}
