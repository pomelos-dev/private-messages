import useGameStore from '../store/gameStore';
import VisualChoiceScreen from '../components/VisualChoiceScreen';

/**
 * S3_13 — The Arrival
 * Hudson in his doorway. Full-screen visual with flavor choices.
 * Both options lead to S3_14.
 */

export default function S3_13_TheArrival() {
  const goToScreen = useGameStore((s) => s.goToScreen);

  return (
    <VisualChoiceScreen
      image="hudsonReunion"
      speaker="Hudson"
      quote="Connor... I'm so glad you're here."
      options={[
        { text: 'Next time don\'t make me wait six months!', onSelect: () => goToScreen('S3_14') },
        { text: 'I missed you so much, Huddy.',             onSelect: () => goToScreen('S3_14') },
      ]}
    />
  );
}
