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

// ── Chapter 3 screens ───────────────────────────────────────────
import S3_00_Intro from './screens/S3_00_Intro';
import S3_01_TheFalloutFeed from './screens/S3_01_TheFalloutFeed';
import S3_02_VictorsPerspective from './screens/S3_02_VictorsPerspective';
import S3_03_TheArticle from './screens/S3_03_TheArticle';
import S3_04_HudsonConfides from './screens/S3_04_HudsonConfides';
import S3_05_NicksProposal from './screens/S3_05_NicksProposal';
import S3_06_TheStatement from './screens/S3_06_TheStatement';
import S3_06_TheDistraction from './screens/S3_06_TheDistraction';
import S3_06_DoNothing from './screens/S3_06_DoNothing';
import { S3_07_A, S3_07_B, S3_07_C } from './screens/S3_07_WhatDidYouDo';
import S3_08_UnsentMessages from './screens/S3_08_UnsentMessages';
import S3_09_SixMonths from './screens/S3_09_SixMonths';
import S3_10_TheProject from './screens/S3_10_TheProject';
import S3_11_TheMissedCall from './screens/S3_11_TheMissedCall';
import S3_12_TheText from './screens/S3_12_TheText';
import S3_13_TheArrival from './screens/S3_13_TheArrival';
import S3_14_TheConfession from './screens/S3_14_TheConfession';
import { S3_15_Romantic, S3_15_Warm } from './screens/S3_15_Epilogue';

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

  // ── Chapter 3 ─────────────────────────────────────────────────
  'S3_00':        { component: S3_00_Intro,             darkMode: true,  time: '12:45' },
  'S3_01':        { component: S3_01_TheFalloutFeed,    darkMode: false, time: '12:45' },
  'S3_02':        { component: S3_02_VictorsPerspective,darkMode: true,  time: '12:47' },
  'S3_03':        { component: S3_03_TheArticle,        darkMode: false, time: '1:15'  },
  'S3_04':        { component: S3_04_HudsonConfides,    darkMode: true,  time: '1:22'  },
  'S3_05':        { component: S3_05_NicksProposal,     darkMode: false, time: '8:54'  },
  'S3_06_A':      { component: S3_06_TheStatement,      darkMode: false, time: '3:40'  },
  'S3_06_B':      { component: S3_06_TheDistraction,    darkMode: false, time: '3:40'  },
  'S3_06_C':      { component: S3_06_DoNothing,         darkMode: false, time: '3:40'  },
  'S3_07_A':      { component: S3_07_A,                 darkMode: true,  time: '3:55'  },
  'S3_07_B':      { component: S3_07_B,                 darkMode: true,  time: '3:55'  },
  'S3_07_C':      { component: S3_07_C,                 darkMode: true,  time: '3:55'  },
  'S3_08':        { component: S3_08_UnsentMessages,    darkMode: true,  time: '2:01'  },
  'S3_09':        { component: S3_09_SixMonths,         darkMode: false, time: '11:30' },
  'S3_10':        { component: S3_10_TheProject,        darkMode: false, time: '11:44' },
  'S3_11':        { component: S3_11_TheMissedCall,     darkMode: true,  time: '11:51' },
  'S3_12':        { component: S3_12_TheText,           darkMode: true,  time: '11:51' },
  'S3_13':        { component: S3_13_TheArrival,        darkMode: true,  time: '7:12',  transition: 'slow_fade' },
  'S3_14':        { component: S3_14_TheConfession,     darkMode: true,  time: '11:23' },
  'S3_15_ROMANTIC': { component: S3_15_Romantic,        darkMode: true,  time: '5:35'  },
  'S3_15_WARM':   { component: S3_15_Warm,              darkMode: true,  time: '5:35'  },
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
