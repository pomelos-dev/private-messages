import useGameStore from '../store/gameStore';

/**
 * HomeScreen — simulated phone home screen with app icons.
 *
 * Props:
 *   activeApps — array of app names that are tappable: ['messages', 'email', 'instagram']
 *   targets    — map of app name → screen ID: { instagram: 'S1_07' }
 */

const APP_ICONS = {
  messages: {
    label: 'Messages',
    color: 'bg-green-500',
    icon: (
      <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
      </svg>
    ),
  },
  email: {
    label: 'Mail',
    color: 'bg-blue-500',
    icon: (
      <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
  },
  instagram: {
    label: 'Instagram',
    color: 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600',
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  photos: {
    label: 'Photos',
    color: 'bg-white',
    icon: (
      <svg className="w-7 h-7 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
      </svg>
    ),
  },
};

export default function HomeScreen({ activeApps = [], targets = {} }) {
  const goToScreen = useGameStore((s) => s.goToScreen);

  const allApps = ['messages', 'email', 'instagram', 'photos'];

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-black px-6">
      <div className="grid grid-cols-4 gap-6">
        {allApps.map((appName) => {
          const app = APP_ICONS[appName];
          const isActive = activeApps.includes(appName);
          const target = targets[appName];

          return (
            <button
              key={appName}
              onClick={() => {
                if (isActive && target) goToScreen(target);
              }}
              disabled={!isActive}
              className={`flex flex-col items-center gap-1 ${
                isActive ? '' : 'opacity-30'
              }`}
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center ${app.color} ${
                  isActive ? 'active:scale-90 transition-transform' : ''
                }`}
              >
                {app.icon}
              </div>
              <span className="text-white text-[10px]">{app.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
