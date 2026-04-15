/**
 * Central image registry.
 * Every component references images through this file — never hardcode paths.
 * To swap a placeholder for a real photo, replace the file in /public/assets/
 * and the mapping here stays the same.
 */

const base = '/assets/';

export const IMAGES = {
  // Profile avatars
  connorAvatar:       `${base}connor-avatar.jpg`,
  googleNewsAvatar:   `${base}google-news-avatar.jpeg`,
  sarahChenAvatar:    `${base}sarah-chen-avatar.jpg`,
  hudsonwUpdatesAvatar:`${base}hudsonwupdates-avatar.jpg`,
  hudsonAvatar:       `${base}hudson-avatar.jpg`,
  victorAvatar:       `${base}victor-avatar.jpg`,
  nickAvatar:         `${base}nick-avatar.jpg`,
  taytayAvatar:       `${base}taytay-avatar.jpg`,
  dogsAvatar:         `${base}dogs-avatar.jpg`,

  // Story photos
  hudsonKissSelfie:   `${base}hudson-kiss-selfie.jpg`,
  connorGoodnight:    `${base}connor-goodnight.jpg`,
  victorHeadshot:     `${base}victor-headshot.jpeg`,
  connorEncouraging:  `${base}connor-encouraging.jpg`,
  hudsonEncouraging:  `${base}hudson-encouraging.jpeg`,
  victorTableRead:    `${base}victor-table-read.jpg`,
  connorBlushing:     `${base}connor-blushing.jpg`,
  connorHudsonSunset: `${base}connor-hudson-sunset.jpg`,
  connorTableRead:    `${base}connor-table-read.jpg`,

  // Chapter 2 story photos
  goodMorning:              `${base}good-morning.jpg`,
  secretiveOrKnowingMeme:   `${base}secretive-meme.jpg`,
  connorHeadshot:           `${base}connor-headshot.jpg`,
  hudsonAirport:            `${base}hudson-airport.jpeg`,
  hudsonRedCarpet:          `${base}hudson-red-carpet.jpg`,
  hudsonBTS:                `${base}hudson-bts.jpg`,
  hudsonBegging:            `${base}hudson-begging.jpg`,
  connorHudsonHug:          `${base}hudcon-hug.jpg`,
  hudsonFacingCamera:       `${base}hudson-facing-camera.jpg`,
  hudsonConnorWestHollywood:`${base}hudcon-west-hollywood.jpeg`,
  hudsonConnorApartment:    `${base}hudcon-apartment.jpg`,

  // Instagram post images
  connorIg1:          `${base}connor-ig-1.jpg`,
  connorIg2:          `${base}connor-ig-2.jpg`,
  connorIg3:          `${base}connor-ig-3.jpg`,
  hudsonIg1:          `${base}hudson-ig-1.jpg`,
  hudsonIg2:          `${base}hudson-ig-2.jpg`,
  hudsonIg3:          `${base}hudson-ig-3.jpg`,
  victorIg1:          `${base}victor-ig-1.jpg`,
  victorIg2:          `${base}victor-ig-2.jpg`,
  victorIg3:          `${base}victor-ig-3.jpg`,
  taytayIg1:          `${base}taytay-ig-1.jpg`,
  taytayIg2:          `${base}taytay-ig-2.jpg`,
  taytayIg3:          `${base}taytay-ig-3.jpg`,
  dogsIg1:            `${base}dogs-ig-1.jpg`,
  dogsIg2:            `${base}dogs-ig-2.jpg`,
  dogsIg3:            `${base}dogs-ig-3.jpg`,

  // Chapter 3 story photos
  taytayKids:         `${base}taytay-ig-kids.jpg`,
  dogsBrave:          `${base}dogs-ig-brave.jpg`,
  keiraGossip:        `${base}keira-gossip.jpg`,
  hudsonSad:          `${base}hudson-sad.jpeg`,
  hudconSelfie:       `${base}hudcon-selfie.jpg`,
  connorSleep:        `${base}connor-sleep.jpg`,
  hudconWalking:      `${base}hudcon-walking.jpg`,
  nureyevDancing:     `${base}nureyev.jpeg`,
  taytayCandid:       `${base}taytay-ig-candid.jpg`,
  dogsPresence:       `${base}dogs-ig-presence.jpg`,
  dogsMessage:        `${base}dogs-ig-message.jpg`,
  hudsonSerious:      `${base}hudson-serious.jpg`,
  hudsonThrowback:    `${base}hudson-throwback.jpg`,
  hudsonOutdoors:     `${base}hudson-outdoors.jpeg`,
  hudsonReunion:      `${base}hudson-facing-camera2.jpg`,
  epilogueRomantic:   `${base}hudcon-selfie.jpg`,
  connorTeasing:      `${base}connor-lipbite.jpg`,
  connorWink:         `${base}connor-wink.jpg`,
  hudsonHeadback:     `${base}hudson-headback.jpg`,
  connorSeductive:    `${base}connor-come-hither.jpg`,
  epilogueFriends:    `${base}epilogue-friends.jpeg`,
  faneSad:            `${base}fane-sad.jpg`,
};

/**
 * Helper: get image src by key name.
 * Usage: getImage('hudsonAvatar') → '/assets/hudson-avatar.jpg'
 */
export function getImage(key) {
  return IMAGES[key] || '';
}
