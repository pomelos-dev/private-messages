import { useState } from 'react';
import useGameStore from '../store/gameStore';
import InstagramBrowser from '../components/InstagramBrowser';
import GameOverPopup from '../components/GameOverPopup';

/**
 * S1_07 — First Post Choice
 * Connor's IG profile with a New Post button.
 * Player chooses between two posts → GOOD or BAD ending.
 */

// ── Post options ─────────────────────────────────────────────────
const postOptions = [
  {
    id: 'good',
    image: 'connorHudsonSunset',
    caption: 'Some people make everything easier. I couldn\'t do it without you 💙',
  },
  {
    id: 'bad',
    image: 'connorTableRead',
    caption: 'First read with the Ascension team today! I look forward to getting to know you better, too @victorhalberg 🔥',
  },
];

// ── Base Connor profile (before posting) ─────────────────────────
const baseConnorProfile = {
  username: 'connor_s',
  displayName: 'Connor Storrie',
  avatar: 'connorAvatar',
  isFollowing: true,
  posts: [
    { id: 'cs_1', image: 'connorIg1', caption: '📍West Hollywood, baby.', comments: [] },
    { id: 'cs_2', image: 'connorIg2', caption: 'Should I learn ballet next?', comments: [] },
    { id: 'cs_3', image: 'connorIg3', caption: 'Early morning espresso. Worth it.', comments: [] },
  ],
};

export default function S1_07_FirstPostChoice() {
  const goToScreen = useGameStore((s) => s.goToScreen);

  // null = browsing, 'good' or 'bad' = post selected
  const [selectedPost, setSelectedPost] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleNewPost = (option) => {
    setSelectedPost(option.id);
    // Show the popup after a brief delay so player sees the published post
    setTimeout(() => setShowPopup(true), 1200);
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

    return { connor_s: connorProfile };
  };

  return (
    <div className="flex-1 flex flex-col relative">
      <InstagramBrowser
        profiles={buildProfiles()}
        initialProfile="connor_s"
        triggers={[]}
        newPostOptions={selectedPost ? null : postOptions}
        onNewPost={handleNewPost}
      />

      {/* Chapter Complete popup (GOOD ending) */}
      {showPopup && selectedPost === 'good' && (
        <GameOverPopup
          title="Chapter 1 Complete"
          message="Hudson got the message. You've unlocked chapter 2."
          options={[
            { text: 'Stay and browse your phone', action: 'close', onClose: () => setShowPopup(false) },
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
          retryScreen="S1_07"
        />
      )}
    </div>
  );
}
