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
  hudsonAvatar:       `${base}hudson-avatar.jpg`,
  victorAvatar:       `${base}victor-avatar.jpg`,
  nickAvatar:         `${base}nick-avatar.jpg`,
  taytayAvatar:       `${base}taytay-avatar.jpg`,
  dogsAvatar:         `${base}dogs-avatar.jpg`,

  // Story photos
  hudsonKissSelfie:   `${base}hudson-kiss_selfie.jpg`,
  connorGoodnight:    `${base}connor-goodnight.jpg`,
  victorHeadshot:     `${base}victor-headshot.jpeg`,
  connorEncouraging:  `${base}connor-encouraging.jpg`,
  hudsonEncouraging:  `${base}hudson-encouraging.jpg`,
  victorTableRead:    `${base}victor-table-read.jpg`,
  connorBlushing:     `${base}connor-blushing.jpg`,
  connorHudsonSunset: `${base}connor-hudson-sunset.jpg`,
  connorTableRead:    `${base}connor-table-read.jpg`,

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
};

/**
 * Helper: get image src by key name.
 * Usage: getImage('hudsonAvatar') → '/assets/hudson-avatar.jpg'
 */
export function getImage(key) {
  return IMAGES[key] || '';
}
