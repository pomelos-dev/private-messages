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
import S1_07_Home from './screens/S1_07_Home';
import S1_07_FirstPostChoice from './screens/S1_07_FirstPostChoice';

/**
 * Screen registry: maps screen IDs to { component, darkMode }.
 * To add a new screen:
 *   1. Create the screen file in src/screens/
 *   2. Import it above
 *   3. Add an entry here
 */
const SCREENS = {
  'S0':           { component: S0_Menu,             darkMode: true  },
  'S1_01':        { component: S1_01_TheOffer,      darkMode: false },
  'S1_02':        { component: S1_02_TellHudson,    darkMode: true  },
  'S1_03':        { component: S1_03_InstagramBrowse, darkMode: false },
  'S1_04':        { component: S1_04_HudsonReacts,  darkMode: true  },
  'S1_04_GOOD':   { component: S1_04_Good,          darkMode: true  },
  'S1_04_BAD':    { component: S1_04_Bad,           darkMode: true  },
  'S1_05':        { component: S1_05_VictorReaches, darkMode: true  },
  'S1_06':        { component: S1_06_HudsonMisses,  darkMode: true  },
  'S1_06_GOOD':   { component: S1_06_Good,          darkMode: true  },
  'S1_06_BAD':    { component: S1_06_Bad,           darkMode: true  },
  'S1_07_HOME':   { component: S1_07_Home,          darkMode: true  },
  'S1_07':        { component: S1_07_FirstPostChoice, darkMode: false },
};

export default function App() {
  const currentScreen = useGameStore((s) => s.currentScreen);

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
    <PhoneShell darkMode={screen.darkMode}>
      <ScreenComponent />
    </PhoneShell>
  );
}
