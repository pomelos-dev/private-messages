import { useState } from 'react';
import useGameStore from '../store/gameStore';
import InstagramBrowser from '../components/InstagramBrowser';
import GameOverPopup from '../components/GameOverPopup';
import EndingAnimation from '../components/EndingAnimation';

/**
 * S1_07 — First Post Choice
 * Connor's IG profile with a New Post button.
 * Player chooses between two posts → GOOD or BAD ending.
 *
 * Flow after posting:
 *   1. Post appears in Connor's feed (with comment)
 *   2. Notification banners (Hudson or Victor reacted)
 *   3. Player taps notification → browser opens the new post (comment visible)
 *   4. 2.5s pause on the post
 *   5. Ending animation plays (fireworks or sad)
 *   6. Final popup appears
 */

// ── Post options (Ascension first, Hudson second) ─────────────────
const postOptions = [
  {
    id: 'bad',
    image: 'connorTableRead',
    caption: 'First read with the Ascension team today! I look forward to getting to know you better, too @victorhalberg 🔥',
  },
  {
    id: 'good',
    image: 'connorHudsonSunset',
    caption: 'Some people make everything easier. I couldn\'t do it without you 💙',
  },
];

// ── Base Connor profile (before posting) ─────────────────────────
const baseConnorProfile = {
  username: 'connor_s',
  displayName: 'Connor S.',
  avatar: 'connorAvatar',
  isFollowing: true,
  posts: [
    { id: 'cs_1', image: 'connorIg1', caption: 'Early morning espresso. Worth it.', comments: [] },
    { id: 'cs_2', image: 'connorIg2', caption: 'Should I learn ballet next?', comments: [] },
    { id: 'cs_3', image: 'connorIg3', objectPosition: 'top', caption: '📍West Hollywood, baby.', comments: [{ username: 'victorhalberg', text: 'You are so special' }] },
  ],
};

const TAYTAY_PROFILE = {
  username: 'taytay',
  displayName: 'Tayler S.',
  avatar: 'taytayAvatar',
  isFollowing: true,
  posts: [
    { id: 'tt_1', image: 'taytayIg1', objectPosition: 'top', caption: 'Proud of my brother even when he won\'t pick up the phone 🙄❤️', comments: [] },
    { id: 'tt_2', image: 'taytayIg2', caption: 'Texas forever honestly', comments: [] },
    { id: 'tt_3', image: 'taytayIg3', caption: 'Main character behavior starts now', comments: [] },
  ],
};

const DOGTHERAPY_PROFILE = {
  username: 'dogtherapy',
  displayName: 'Dog Therapy',
  avatar: 'dogsAvatar',
  isFollowing: true,
  posts: [
    { id: 'dt_1', image: 'dogsIg1', caption: 'I don\'t know what you\'re going through but I think you should pet me', comments: [] },
    { id: 'dt_2', image: 'dogsIg2', caption: 'Availability: always. Judgment: never.', comments: [] },
    { id: 'dt_3', image: 'dogsIg3', caption: 'Psychiatrist said take it easy. This is me taking it easy', comments: [] },
  ],
};

const HUDSON_PROFILE = {
  username: 'hudson_w',
  displayName: 'Hudson W.',
  avatar: 'hudsonAvatar',
  isFollowing: true,
  posts: [
    { id: 'hw_1', image: 'hudsonIg1', caption: 'Sometimes it feels like we exist in two different worlds', comments: [] },
    { id: 'hw_2', image: 'hudsonIg2', caption: 'I blinked and you were gone', comments: [] },
    { id: 'hw_3', image: 'hudsonIg3', caption: 'I wish next month would hurry up and get here, already', comments: [] },
  ],
};

const VICTOR_PROFILE = {
  username: 'victorhalberg',
  displayName: 'Victor Halberg',
  avatar: 'victorAvatar',
  isFollowing: true,
  posts: [
    { id: 'vh_1', image: 'victorIg1', caption: 'Some artistic partnerships are impossible to define. That\'s what makes them worth exploring. Honored to play Bruhn opposite @connor_s\'s Nureyev.', comments: [] },
    { id: 'vh_2', image: 'victorIg2', caption: 'Stockholm in the summer.', comments: [] },
    { id: 'vh_3', image: 'victorIg3', objectPosition: 'top', caption: 'The work asks everything of you. Give it.', comments: [] },
  ],
};

export default function S1_07_FirstPostChoice() {
  const goToScreen = useGameStore((s) => s.goToScreen);
  const pushNotification = useGameStore((s) => s.pushNotification);

  // null = browsing, 'good' or 'bad' = post selected
  const [selectedPost, setSelectedPost] = useState(null);
  // true once the notification has been tapped → browser opens new post
  const [notifTapped, setNotifTapped] = useState(false);
  // 'idle' | 'animating' | 'done'
  const [endingStage, setEndingStage] = useState('idle');

  const handleNewPost = (option) => {
    setSelectedPost(option.id);

    const isGood = option.id === 'good';

    // Push the reaction notification
    pushNotification({
      id: `n_s1_07_${option.id}`,
      from: isGood ? 'hudson_w' : 'victorhalberg',
      avatar: isGood ? 'hudsonAvatar' : 'victorAvatar',
      preview: isGood ? '❤️❤️❤️' : 'My Rudolf 🔥',
      target: null, // handled by onTap
      onTap: () => {
        setNotifTapped(true);
        // Hold on the post for 2.5s, then play the ending animation
        setTimeout(() => {
          setEndingStage('animating');
        }, 2500);
      },
    });
  };

  const handleAnimationDone = () => {
    setEndingStage('done');
  };

  // Build profiles based on state
  const buildProfiles = () => {
    let connorProfile = { ...baseConnorProfile };

    if (selectedPost === 'good') {
      connorProfile = {
        ...connorProfile,
        posts: [
          {
            id: 'cs_new',
            image: 'connorHudsonSunset',
            caption: 'Some people make everything easier. I couldn\'t do it without you 💙',
            comments: [{ username: 'hudson_w', text: '❤️❤️❤️' }],
          },
          ...connorProfile.posts,
        ],
      };
    } else if (selectedPost === 'bad') {
      connorProfile = {
        ...connorProfile,
        posts: [
          {
            id: 'cs_new',
            image: 'connorTableRead',
            caption: 'First read with the Ascension team today! I look forward to getting to know you better, too @victorhalberg 🔥',
            comments: [{ username: 'victorhalberg', text: 'My Rudolf 🔥' }],
          },
          ...connorProfile.posts,
        ],
      };
    }

    return {
      connor_s: connorProfile,
      taytay: TAYTAY_PROFILE,
      dogtherapy: DOGTHERAPY_PROFILE,
      hudson_w: HUDSON_PROFILE,
      victorhalberg: VICTOR_PROFILE,
    };
  };

  const showPopup   = endingStage === 'done';
  const showAnimation = endingStage === 'animating';

  return (
    <div className="flex-1 flex flex-col relative">
      <InstagramBrowser
        profiles={buildProfiles()}
        initialProfile="connor_s"
        triggers={[]}
        newPostOptions={selectedPost ? null : postOptions}
        onNewPost={handleNewPost}
        autoViewPost={notifTapped ? { profile: 'connor_s', postId: 'cs_new' } : null}
      />

      {/* Ending animation overlay */}
      {showAnimation && (
        <EndingAnimation
          type={selectedPost === 'good' ? 'good' : 'bad'}
          onDone={handleAnimationDone}
        />
      )}

      {/* Chapter Complete popup (GOOD ending) */}
      {showPopup && selectedPost === 'good' && (
        <GameOverPopup
          title="Chapter 1 Complete"
          message="Hudson got the message. You've unlocked chapter 2."
          variant="good"
          options={[
            { text: 'Stay and browse your phone', action: 'close', onClose: () => goToScreen('S1_07') },
            { text: 'Replay Chapter 1', action: 'S1_01' },
            { text: 'Return to main menu', action: 'S0' },
          ]}
        />
      )}

      {/* Game Over popup (BAD ending) */}
      {showPopup && selectedPost === 'bad' && (
        <GameOverPopup
          title="Game Over"
          message="That was insensitive."
          variant="bad"
          retryScreen="S1_07"
        />
      )}
    </div>
  );
}
