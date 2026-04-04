import HomeScreen from '../components/HomeScreen';

/**
 * S1_PHONE_HOME — Phone home screen during Chapter 1.
 * Email and Messages are active; Instagram unlocks later (S1_07_HOME).
 */
export default function S1_PhoneHome() {
  return (
    <HomeScreen
      activeApps={['email', 'messages']}
      targets={{ email: 'S1_01', messages: 'S1_02' }}
    />
  );
}
