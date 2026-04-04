import { create } from 'zustand';

/**
 * Global game state.
 *
 * currentScreen — which screen is showing (e.g. 'S0', 'S1_01', 'S1_02')
 * choices       — record of player choices: { 'S1_02_c1': 'Option A text', ... }
 * flags         — boolean flags for story progression
 * notifications — queue of notification banners to show
 */
const useGameStore = create((set, get) => ({
  // ── Current screen ──────────────────────────────────────────────
  currentScreen: 'S0',
  sessionId: 0,

  goToScreen: (screenId) =>
    set((state) => ({
      currentScreen: screenId,
      notifications: [],
      sessionId: state.sessionId + 1,
    })),

  // ── Player choices ──────────────────────────────────────────────
  choices: {},

  makeChoice: (choiceId, selectedText) =>
    set((state) => ({
      choices: { ...state.choices, [choiceId]: selectedText },
    })),

  // ── Flags ───────────────────────────────────────────────────────
  flags: {
    followedVictor: false,
    viewedHudsonProfile: false,
    chapter1Complete: false,
  },

  setFlag: (flagName, value) =>
    set((state) => ({
      flags: { ...state.flags, [flagName]: value },
    })),

  // ── Notifications ───────────────────────────────────────────────
  // Each: { id, from, avatar, preview, target }
  notifications: [],

  pushNotification: (notification) =>
    set((state) => ({
      notifications: [...state.notifications, notification],
    })),

  dismissNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),

  // ── Reset ───────────────────────────────────────────────────────
  resetGame: () =>
    set({
      currentScreen: 'S0',
      sessionId: 0,
      choices: {},
      flags: {
        followedVictor: false,
        viewedHudsonProfile: false,
        chapter1Complete: false,
      },
      notifications: [],
    }),
}));

export default useGameStore;
