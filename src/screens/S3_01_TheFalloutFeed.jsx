import { useMemo } from 'react';
import InstagramBrowser from '../components/InstagramBrowser';

/**
 * S3_01 — The Fallout Feed
 * Starting from the exact profile state at the end of S2_05,
 * with new Chapter 3 posts added on top.
 * Viewing @hudsonw_updates triggers Victor's notification → S3_02.
 */

// ── @connor_s (player) ────────────────────────────────────────────
const CONNOR_PROFILE = {
  displayName: 'Connor S.',
  avatar: 'connorAvatar',
  isFollowing: true,
  posts: [
    { id: 'cs_0', image: 'connorHudsonSunset', caption: 'He matches my enthusiasm ♒️♓️✨', comments: [{ username: 'hudson_w', text: '❤️❤️❤️' }] },
    { id: 'cs_1', image: 'connorIg1', caption: 'Early morning espresso. Worth it.', comments: [] },
    { id: 'cs_2', image: 'connorIg2', caption: 'Should I learn ballet next?', comments: [] },
    { id: 'cs_3', image: 'connorIg3', objectPosition: 'top', caption: '📍West Hollywood, baby.', comments: [{ username: 'victorhallberg', text: 'You are so special' }] },
  ],
};

// ── @victorhallberg ───────────────────────────────────────────────
const VICTOR_PROFILE = {
  displayName: 'Victor Hallberg',
  avatar: 'victorAvatar',
  isFollowing: true,
  posts: [
    { id: 'vh_1', image: 'victorIg1', caption: 'Erik Bruhn and Rudolf Nureyev were mirrors, shadows, and something harder to name. I can already tell this film will ask the same of us. Honored to be working opposite @connor_s on Ascension.', comments: [] },
    { id: 'vh_2', image: 'victorIg2', caption: 'Stockholm in the summer.', comments: [] },
    { id: 'vh_3', image: 'victorIg3', objectPosition: 'top', caption: 'The work asks everything of you. Give it.', comments: [] },
  ],
};

// ── @taytay ───────────────────────────────────────────────────────
const TAYTAY_PROFILE = {
  displayName: 'Tayler S.',
  avatar: 'taytayAvatar',
  isFollowing: true,
  posts: [
    { id: 'tt_new', image: 'taytayKids', objectPosition: 'top', caption: 'Haters better stfu 🙂', comments: [] },
    { id: 'tt_1', image: 'taytayIg1', objectPosition: 'top', caption: 'Proud of my brother even when he won\'t pick up the phone 🤧❤️', comments: [] },
    { id: 'tt_2', image: 'taytayIg2', caption: 'Texas forever honestly', comments: [] },
    { id: 'tt_3', image: 'taytayIg3', caption: 'Main character behavior starts now', comments: [] },
  ],
};

// ── @dogtherapy ───────────────────────────────────────────────────
const DOGS_PROFILE = {
  displayName: 'Dog Therapy',
  avatar: 'dogsAvatar',
  isFollowing: true,
  posts: [
    { id: 'dg_new', image: 'dogsBrave', caption: 'when you finally do the scary thing and it doesn\'t kill you', comments: [] },
    { id: 'dg_1', image: 'dogsIg1', caption: 'I don\'t know what you\'re going through but I think you should pet me', comments: [] },
    { id: 'dg_2', image: 'dogsIg2', caption: 'Availability: always. Judgment: never.', comments: [] },
    { id: 'dg_3', image: 'dogsIg3', caption: 'Psychiatrist said take it easy. This is me taking it easy', comments: [] },
  ],
};

// ── @hudson_w ─────────────────────────────────────────────────────
const HUDSON_PROFILE = {
  displayName: 'Hudson W.',
  avatar: 'hudsonAvatar',
  isFollowing: true,
  posts: [
    { id: 'hw_1', image: 'hudsonIg1', caption: 'Sometimes it feels like we exist in two different worlds', comments: [] },
    { id: 'hw_2', image: 'hudsonIg2', caption: 'I blinked and you were gone', comments: [] },
    { id: 'hw_3', image: 'hudsonIg3', caption: 'I wish next month would hurry up and get here, already', comments: [] },
  ],
};

// ── @hudsonw_updates ──────────────────────────────────────────────
const HUDSON_UPDATES_PROFILE = {
  displayName: 'Hudson W. Updates',
  avatar: 'hudsonwUpdatesAvatar',
  isFollowing: true,
  bio: 'your #1 source for all things hudson w. 🍂',
  followers: '284K',
  posts: [
    {
      id: 'hwu_breaking',
      image: 'hudsonConnorWestHollywood',
      caption: 'BREAKING: they were BOTH there last night. we are not OK. #hudcon',
      comments: [
        { username: 'berthardy', text: 'I need to lie down' },
        { username: 'wingedfane', text: 'the separate branding is DEAD' },
        { username: 'gizmoforlife', text: 'Did anyone see Keira?' },
        { username: 'mediumhud', text: 'aren\'t you a hudson updates acc why is the other one always there' },
        { username: 'ilyad0wnbad', text: 'hudcontwt has not slept' },
        { username: 'chantalg', text: 'Hudson has a long term girlfriend. You parasocial weirdos.' },
        { username: 'merryhudconmas', text: 'We never lose' },
        { username: 'hudcel9113', text: 'enough about @connor_s he needs to leave Hudson alone' },
        { username: 'genz_movies', text: 'it\'s all part of the new pr plan, trust' },
      ],
    },
    {
      id: 'hwu_1',
      image: 'hudsonAirport',
      caption: 'GUYS. someone just sent us this from Vancouver airport this morning 👀 (if you saw me tag his soulmate earlier, no i didn\'t)',
      comments: [
        { username: 'ilyad0wnbad', text: 'WAIT WAIT WAIT' },
        { username: 'berthardy', text: 'he looks so good omg the hat' },
        { username: 'hudconstrong', text: 'THE TIMING. I\'m not okay' },
        { username: 'genz_movies', text: 'nobody connecting dots faster than this fandom' },
        { username: 'pomelos_writes', text: 'vacation era or something else era 👀' },
        { username: 'wingedfane', text: 'if he\'s going to see connor I will cry' },
        { username: 'merryhudconmas', text: 'he always looks soft when he\'s about to see a certain someone 🙂' },
      ],
    },
    {
      id: 'hwu_2',
      image: 'hudsonRedCarpet',
      caption: 'never not stunning. that\'s it. that\'s the post.',
      comments: [
        { username: 'claudiemtl', text: 'obsessed with him forever' },
        { username: 'vancouverbadnuck', text: 'all time face card' },
        { username: 'ohmyhollander', text: 'he deserves every award' },
      ],
    },
    {
      id: 'hwu_3',
      image: 'hudsonBTS',
      caption: 'throwback to him being absolutely unreal on set 🎬',
      comments: [
        { username: 'hudconstrong', text: 'this man was BORN to be famous' },
        { username: 'berthardy', text: 'miss this era so much' },
        { username: 'genz_movies', text: 'can we get a new project announcement please' },
      ],
    },
  ],
};

export default function S3_01_TheFalloutFeed() {
  const profiles = useMemo(() => ({
    connor_s: CONNOR_PROFILE,
    victorhallberg: VICTOR_PROFILE,
    taytay: TAYTAY_PROFILE,
    dogtherapy: DOGS_PROFILE,
    hudson_w: HUDSON_PROFILE,
    hudsonw_updates: HUDSON_UPDATES_PROFILE,
  }), []);

  const triggers = [
    {
      id: 'view_hwu_s3_01',
      when: 'view_post',
      profile: 'hudsonw_updates',
      post: 'hwu_breaking',
      action: 'notification',
      notification: {
        from: 'Victor Hallberg',
        avatar: 'victorAvatar',
        preview: 'I see you were busy last night.',
        target: 'S3_02',
      },
    },
  ];

  return (
    <InstagramBrowser
      profiles={profiles}
      initialProfile="connor_s"
      ownUsername="connor_s"
      triggers={triggers}
    />
  );
}
