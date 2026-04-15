import { useState } from 'react';
import useGameStore from '../store/gameStore';
import { getImage } from '../assets/images';
import VisualChoiceScreen from '../components/VisualChoiceScreen';

/**
 * S3_13 — The Arrival
 * Hudson in his doorway. Full-screen visual with flavor choices.
 * Both options lead to hudconSleeping image (slow fade in) →
 * tap → slow fade to black → S3_14.
 */

export default function S3_13_TheArrival() {
  const goToScreen = useGameStore((s) => s.goToScreen);
  const [phase, setPhase] = useState('choice'); // 'choice' | 'image' | 'fading'

  const handleSelect = () => setPhase('image');

  const handleImageTap = () => {
    setPhase('fading');
    setTimeout(() => goToScreen('S3_14'), 2700);
  };

  if (phase === 'image' || phase === 'fading') {
    return (
      <div className="flex-1 relative bg-black overflow-hidden">
        {/* Sleeping image — very slow fade in from black */}
        <img
          src={getImage('hudconSleeping')}
          alt=""
          className="absolute inset-0 w-full h-full object-cover animate-fade-in-very-slow"
          onError={(e) => { e.target.style.display = 'none'; }}
        />

        {/* Caption overlay */}
        {phase === 'image' && (
          <div className="absolute bottom-24 left-0 right-0 px-8 text-center animate-fade-in-delayed pointer-events-none z-10">
            <p className="text-white/80 text-sm italic">Reunited at last...</p>
          </div>
        )}

        {/* Tap target — only active during image phase */}
        {phase === 'image' && (
          <button
            onClick={handleImageTap}
            className="absolute inset-0 z-10"
          />
        )}

        {/* "Tap anywhere to continue" hint */}
        {phase === 'image' && (
          <p className="absolute bottom-8 left-0 right-0 text-center text-white/40 text-xs animate-fade-in-delayed z-10 pointer-events-none">
            Tap anywhere to continue
          </p>
        )}

        {/* Fade to black overlay on tap */}
        {phase === 'fading' && (
          <div className="absolute inset-0 bg-black animate-fade-to-black-very-slow z-20 pointer-events-none" />
        )}
      </div>
    );
  }

  return (
    <VisualChoiceScreen
      image="hudsonReunion"
      speaker="Hudson"
      quote="Connor... I'm so glad you're here."
      options={[
        { text: 'Next time don\'t make me wait six months!', onSelect: handleSelect },
        { text: 'I missed you so much, Huddy.',             onSelect: handleSelect },
      ]}
    />
  );
}
