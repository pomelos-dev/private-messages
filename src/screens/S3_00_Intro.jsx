import useGameStore from '../store/gameStore';
import TransitionScreen from '../components/TransitionScreen';

/**
 * S3_00 — Chapter 3 intro screen
 * Black fade-in with "After a very late night..." before the Instagram feed.
 */
export default function S3_00_Intro() {
  const goToScreen = useGameStore((s) => s.goToScreen);
  return (
    <TransitionScreen
      text="After a very late night…"
      slow
      onTap={() => goToScreen('S3_01')}
    />
  );
}
