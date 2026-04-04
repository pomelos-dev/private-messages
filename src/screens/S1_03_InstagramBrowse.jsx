import { useState } from 'react';
import InstagramBrowser from '../components/InstagramBrowser';

/**
 * S1_03 — Instagram Browse
 *
 * Player browses Instagram freely. Two triggers:
 * 1. Viewing Hudson's profile → Victor comments notification
 * 2. Following Victor → Hudson messages notification → S1_04
 *
 * Victor's profile becomes accessible after trigger 1 fires.
 */

// ── Profile data ─────────────────────────────────────────────────

const CONNOR_PROFILE = {
  username: 'connor_s',
  displayName: 'Connor S.',
  avatar: 'connorAvatar',
  isFollowing: true, // it's your own profile
  posts: [
    {
      id: 'cs_1',
      image: 'connorIg1',
      caption: 'Early morning espresso. Worth it.',
      comments: [],
    },
    {
      id: 'cs_2',
      image: 'connorIg2',
      caption: 'Should I learn ballet next?',
      comments: [],
    },
    {
      id: 'cs_3',
      image: 'connorIg3',
      caption: '📍West Hollywood, baby.',
      comments: [
        // Victor's comment appears after trigger 1
      ],
    },
  ],
};

const HUDSON_PROFILE = {
  username: 'hudson_w',
  displayName: 'Hudson W.',
  avatar: 'hudsonAvatar',
  isFollowing: true,
  posts: [
    {
      id: 'hw_1',
      image: 'hudsonIg1',
      caption: 'Sometimes it feels like we exist in two different worlds',
      comments: [],
    },
    {
      id: 'hw_2',
      image: 'hudsonIg2',
      caption: 'I blinked and you were gone',
      comments: [],
    },
    {
      id: 'hw_3',
      image: 'hudsonIg3',
      caption: 'I wish next month would hurry up and get here, already',
      comments: [],
    },
  ],
};

const TAYTAY_PROFILE = {
  username: 'taytay',
  displayName: 'Tayler S.',
  avatar: 'taytayAvatar',
  isFollowing: true,
  posts: [
    {
      id: 'tt_1',
      image: 'taytayIg1',
      caption: 'Proud of my brother even when he won\'t pick up the phone 🙄❤️',
      comments: [],
    },
    {
      id: 'tt_2',
      image: 'taytayIg2',
      caption: 'Texas forever honestly',
      comments: [],
    },
    {
      id: 'tt_3',
      image: 'taytayIg3',
      caption: 'Main character behavior starts now',
      comments: [],
    },
  ],
};

const DOGTHERAPY_PROFILE = {
  username: 'dogtherapy',
  displayName: 'Dog Therapy',
  avatar: 'dogsAvatar',
  isFollowing: true,
  posts: [
    {
      id: 'dt_1',
      image: 'dogsIg1',
      caption: 'I don\'t know what you\'re going through but I think you should pet me',
      comments: [],
    },
    {
      id: 'dt_2',
      image: 'dogsIg2',
      caption: 'Availability: always. Judgment: never.',
      comments: [],
    },
    {
      id: 'dt_3',
      image: 'dogsIg3',
      caption: 'Psychiatrist said take it easy. This is me taking it easy',
      comments: [],
    },
  ],
};

const VICTOR_PROFILE = {
  username: 'victorhalberg',
  displayName: 'Victor Halberg',
  avatar: 'victorAvatar',
  isFollowing: false, // player needs to follow him
  posts: [
    {
      id: 'vh_1',
      image: 'victorIg1',
      caption: 'Some artistic partnerships are impossible to define. That\'s what makes them worth exploring. Honored to play Bruhn opposite @connor_s\'s Nureyev.',
      comments: [],
    },
    {
      id: 'vh_2',
      image: 'victorIg2',
      caption: 'Stockholm in the summer.',
      comments: [],
    },
    {
      id: 'vh_3',
      image: 'victorIg3',
      caption: 'The work asks everything of you. Give it.',
      comments: [],
    },
  ],
};

// ── Triggers ─────────────────────────────────────────────────────

const triggers = [
  {
    id: 'victor_comment',
    when: 'view_profile',
    profile: 'hudson_w',
    action: 'notification',
    notification: {
      from: 'victorhalberg',
      avatar: 'victorAvatar',
      preview: 'You are so special',
      target: null, // handled by onTap below
    },
    postTarget: { profile: 'connor_s', postId: 'cs_3' },
    once: true,
  },
  {
    id: 'hudson_message',
    when: 'follow',
    profile: 'victorhalberg',
    action: 'notification',
    notification: {
      from: 'Huddy',
      avatar: 'hudsonAvatar',
      preview: 'Looks like someone\'s excited to work with you 👀',
      target: 'S1_04',
    },
    once: true,
  },
];

// ── Component ────────────────────────────────────────────────────

export default function S1_03_InstagramBrowse() {
  const [victorUnlocked, setVictorUnlocked] = useState(false);

  // Build profiles — Victor only included after trigger fires
  const baseProfiles = {
    connor_s: CONNOR_PROFILE,
    hudson_w: HUDSON_PROFILE,
    taytay: TAYTAY_PROFILE,
    dogtherapy: DOGTHERAPY_PROFILE,
  };

  // When Victor's comment trigger fires, add his comment to Connor's post
  // and make his profile accessible
  const profiles = victorUnlocked
    ? {
        ...baseProfiles,
        connor_s: {
          ...CONNOR_PROFILE,
          posts: CONNOR_PROFILE.posts.map((post) =>
            post.id === 'cs_3'
              ? { ...post, comments: [{ username: 'victorhalberg', text: 'You are so special' }] }
              : post
          ),
        },
        victorhalberg: VICTOR_PROFILE,
      }
    : baseProfiles;

  const handleEvent = (trigger) => {
    if (trigger.id === 'victor_comment') {
      setVictorUnlocked(true);
    }
  };

  return (
    <InstagramBrowser
      profiles={profiles}
      initialProfile="connor_s"
      triggers={triggers}
      onEvent={handleEvent}
    />
  );
}
