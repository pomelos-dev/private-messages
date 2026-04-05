import { useMemo } from 'react';
import InstagramBrowser from '../components/InstagramBrowser';

/**
 * S2_05 — Spotted
 * Player is tagged in a @hudsonw_updates post (Hudson at the airport).
 * Player browses freely. Tapping "Follow" on @hudsonw_updates triggers
 * a notification from Huddy → S2_06.
 *
 * All Chapter 1 profiles remain accessible.
 */

// ── @hudsonw_updates (new fan account) ──────────────────────────
const HUDSON_UPDATES_PROFILE = {
  username: 'hudsonw_updates',
  displayName: 'Hudson W. Updates',
  avatar: 'hudsonwUpdatesAvatar',
  isFollowing: false,
  bio: 'your #1 source for all things hudson w. \uD83C\uDF41',
  followers: '284K',
  posts: [
    {
      id: 'hwu_1',
      image: 'hudsonAirport',
      caption: 'GUYS. someone just sent us this from Vancouver airport this morning \uD83D\uDC40 (if you saw me tag his soulmate earlier, no i didn\'t)',
      comments: [
        { username: 'ilyad0wnbad', text: 'WAIT WAIT WAIT' },
        { username: 'berthardy', text: 'he looks so good omg the hat' },
        { username: 'hudconstrong', text: 'THE TIMING. I\'m not okay' },
        { username: 'genz_movies', text: 'nobody connecting dots faster than this fandom' },
        { username: 'pomelos_writes', text: 'vacation era or something else era \uD83D\uDC40' },
        { username: 'wingedfane', text: 'if he\'s going to see connor I will cry' },
        { username: 'merryhudconmas', text: 'he always looks soft when he\'s about to see a certain someone \uD83D\uDE42' },
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
      caption: 'throwback to him being absolutely unreal on set \uD83C\uDFAC',
      comments: [
        { username: 'hudconstrong', text: 'this man was BORN to be famous' },
        { username: 'berthardy', text: 'miss this era so much' },
        { username: 'genz_movies', text: 'can we get a new project announcement please' },
      ],
    },
  ],
};

// ── Existing profiles from Chapter 1 ────────────────────────────
const CONNOR_PROFILE = {
  username: 'connor_s',
  displayName: 'Connor S.',
  avatar: 'connorAvatar',
  isFollowing: true,
  posts: [
    { id: 'cs_0', image: 'connorHudsonSunset', caption: 'Written in the stars for a reason \u2728', comments: [{ username: 'hudson_w', text: '\u2764\uFE0F\u2764\uFE0F\u2764\uFE0F' }] },
    { id: 'cs_1', image: 'connorIg1', caption: 'Early morning espresso. Worth it.', comments: [] },
    { id: 'cs_2', image: 'connorIg2', caption: 'Should I learn ballet next?', comments: [] },
    { id: 'cs_3', image: 'connorIg3', objectPosition: 'top', caption: '\uD83D\uDCCDWest Hollywood, baby.', comments: [{ username: 'victorhalberg', text: 'You are so special' }] },
  ],
};

const TAYTAY_PROFILE = {
  username: 'taytay',
  displayName: 'Tayler S.',
  avatar: 'taytayAvatar',
  isFollowing: true,
  posts: [
    { id: 'tt_1', image: 'taytayIg1', objectPosition: 'top', caption: 'Proud of my brother even when he won\'t pick up the phone \uD83D\uDE44\u2764\uFE0F', comments: [] },
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

// ── Trigger: follow @hudsonw_updates → notification from Huddy ──
const TRIGGERS = [
  {
    id: 't_s2_05_follow',
    when: 'follow',
    profile: 'hudsonw_updates',
    action: 'notification',
    notification: {
      from: 'Huddy',
      avatar: 'hudsonAvatar',
      preview: 'Hey, you staying in tonight?',
      target: 'S2_06',
    },
  },
];

export default function S2_05_Spotted() {
  const profiles = useMemo(() => ({
    hudsonw_updates: HUDSON_UPDATES_PROFILE,
    connor_s: CONNOR_PROFILE,
    taytay: TAYTAY_PROFILE,
    dogtherapy: DOGTHERAPY_PROFILE,
    hudson_w: HUDSON_PROFILE,
    victorhalberg: VICTOR_PROFILE,
  }), []);

  // Move hudsonw_updates to the end of the profile navigation bar
  const profilesOrdered = useMemo(() => ({
    connor_s: CONNOR_PROFILE,
    taytay: TAYTAY_PROFILE,
    dogtherapy: DOGTHERAPY_PROFILE,
    hudson_w: HUDSON_PROFILE,
    victorhalberg: VICTOR_PROFILE,
    hudsonw_updates: profiles.hudsonw_updates,
  }), [profiles]);

  return (
    <InstagramBrowser
      profiles={profilesOrdered}
      initialProfile="hudsonw_updates"
      triggers={TRIGGERS}
    />
  );
}
