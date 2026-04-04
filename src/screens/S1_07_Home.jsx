import HomeScreen from '../components/HomeScreen';

/**
 * S1_07_HOME — Home screen after S1_06_GOOD
 * Only Instagram is tappable. Player must find it and tap it.
 */
export default function S1_07_Home() {
  return (
    <HomeScreen
      activeApps={['instagram']}
      targets={{ instagram: 'S1_07' }}
    />
  );
}
