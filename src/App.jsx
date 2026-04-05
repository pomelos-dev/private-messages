import { Analytics } from '@vercel/analytics/react';
import useGameStore from './store/gameStore';
import PhoneShell from './components/PhoneShell';

// ── Screen imports ───────────────────────────────────────────────
import S0_Menu from './screens/S0_Menu';
import S1_01_TheOffer from './screens/S1_01_TheOffer';
import S1_02_TellHudson from './screens/S1_02_TellHudson';
import S1_03_InstagramBrowse from './screens/S1_03_InstagramBrowse';
import { S1_04_HudsonReacts, S1_04_Good, S1_04_Bad } from './screens/S1_04_HudsonReacts';
import S1_05_VictorReaches from './screens/S1_05_VictorReaches';
import { S1_06_HudsonMisses, S1_06_Good, S1_06_Bad } from './screens/S1_06_HudsonMisses';
import S1_PhoneHome from './screens/S1_PhoneHome';
import S1_07_Home from './screens/S1_07_Home';
import S1_07_FirstPostChoice from './screens/S1_07_FirstPostChoice';

// ── Chapter 2 screens ───────────────────────────────────────────
import S2_01_GoodMood from './screens/S2_01_GoodMood';
import S2_02_AscensionQuote from './screens/S2_02_AscensionQuote';
import S2_03_AscensionAnnouncement from './screens/S2_03_AscensionAnnouncement';
import S2_04_VictorsInvitation from './screens/S2_04_VictorsInvitation';
import S2_05_Spotted from './screens/S2_05_Spotted';
import S2_06_ThePackage from './screens/S2_06_ThePackage';
import S2_06_Good from './screens/S2_06_Good';
import S2_07_Arrival from './screens/S2_07_Arrival';
import S2_08_PRReminder from './screens/S2_08_PRReminder';
import S2_09_WestHollywood from './screens/S2_09_WestHollywood';
import S2_10_TheChoice from './screens/S2_10_TheChoice';

/**
 * Screen registry: maps screen IDs to { component, darkMode }.
 * To add a new screen:
 *   1. Create the screen file in src/screens/
 *   2. Import it above
 *   3. Add an entry here
 */
const SCREENS = {
  'S0':           { component: S0_Menu,             darkMode: true,  time: '11:41' },
  'S1_PHONE_HOME':{ component: S1_PhoneHome,         darkMode: true  },
  'S1_01':        { component: S1_01_TheOffer,      darkMode: false, time: '11:41' },
  'S1_02':        { component: S1_02_TellHudson,    darkMode: true,  time: '11:41' },
  'S1_03':        { component: S1_03_InstagramBrowse, darkMode: false, time: '8:25' },
  'S1_04':        { component: S1_04_HudsonReacts,  darkMode: true,  time: '8:25' },
  'S1_04_GOOD':   { component: S1_04_Good,          darkMode: true,  time: '8:25' },
  'S1_04_BAD':    { component: S1_04_Bad,           darkMode: true,  time: '8:25' },
  'S1_05':        { component: S1_05_VictorReaches, darkMode: true,  time: '6:18' },
  'S1_06':        { component: S1_06_HudsonMisses,  darkMode: true,  time: '6:18' },
  'S1_06_GOOD':   { component: S1_06_Good,          darkMode: true,  time: '6:18' },
  'S1_06_BAD':    { component: S1_06_Bad,           darkMode: true,  time: '6:18' },
  'S1_07_HOME':   { component: S1_07_Home,          darkMode: true,  time: '6:18' },
  'S1_07':        { component: S1_07_FirstPostChoice, darkMode: false, time: '6:18' },

  // ── Chapter 2 ─────────────────────────────────────────────────
  'S2_01':        { component: S2_01_GoodMood,          darkMode: true,  time: '8:38' },
  'S2_02':        { component: S2_02_AscensionQuote,    darkMode: false, time: '2:21' },
  'S2_03':        { component: S2_03_AscensionAnnouncement, darkMode: false, time: '10:14' },
  'S2_04':        { component: S2_04_VictorsInvitation, darkMode: true,  time: '10:14' },
  'S2_05':        { component: S2_05_Spotted,           darkMode: false, time: '10:14' },
  'S2_06':        { component: S2_06_ThePackage,        darkMode: true,  time: '10:14' },
  'S2_06_GOOD':   { component: S2_06_Good,              darkMode: true,  time: '6:29' },
  'S2_07':        { component: S2_07_Arrival,           darkMode: true,  time: '6:50' },
  'S2_08':        { component: S2_08_PRReminder,        darkMode: false, time: '5:21' },
  'S2_09':        { component: S2_09_WestHollywood,     darkMode: true,  time: '5:21' },
  'S2_10':        { component: S2_10_TheChoice,         darkMode: true,  time: '5:21', transition: 'slow_fade' },
};

export default function App() {
  const currentScreen = useGameStore((s) => s.currentScreen);
  const sessionId = useGameStore((s) => s.sessionId);

  const screen = SCREENS[currentScreen];

  if (!screen) {
    return (
      <PhoneShell>
        <div className="flex-1 flex items-center justify-center bg-black text-red-400 text-sm p-8 text-center">
          Screen "{currentScreen}" not found. Check App.jsx screen registry.
        </div>
      </PhoneShell>
    );
  }

  const ScreenComponent = screen.component;

  return (
    <>
      <PhoneShell darkMode={screen.darkMode} time={screen.time}>
        <div key={`${currentScreen}_${sessionId}`} className={`${screen.transition === 'slow_fade' ? 'animate-fade-in-slow' : screen.transition === 'fade' ? 'animate-fade-in' : 'animate-slide-in-right'} flex-1 min-h-0 flex flex-col overflow-hidden`}>
          <ScreenComponent />
        </div>
      </PhoneShell>
      <Analytics />
    </>
  );
}
