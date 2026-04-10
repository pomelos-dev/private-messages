import { useState, useEffect } from 'react';
import { getImage } from '../assets/images';
import VisualChoiceScreen from '../components/VisualChoiceScreen';
import GameOverPopup from '../components/GameOverPopup';
import EndingAnimation from '../components/EndingAnimation';

/**
 * S2_10 — The Choice
 * Hudson stands in Connor's apartment, asking him to go out together.
 *
 * MAJOR BRANCH:
 *   "Fuck it. Let's go." → GOOD (chapter complete)
 *   "We shouldn't risk it right now." → BAD (ending animation → game over)
 *
 * Transitions use full-bleed images (same style as the VisualChoiceScreen).
 */

// Full-bleed image view used for both ending transitions
function FullBleedTransition({ imageKey, onTap, slow = false }) {
  return (
    <button
      onClick={onTap}
      className="flex-1 flex flex-col bg-black relative"
      style={{ display: 'flex' }}
    >
      <img
        src={getImage(imageKey)}
        alt=""
        className="absolute inset-0 w-full h-full object-cover animate-fade-in"
        style={{ animationDuration: slow ? '3s' : '1s' }}
        onError={(e) => { e.target.className = 'absolute inset-0 w-full h-full bg-neutral-900'; }}
      />
      <div className="absolute bottom-8 left-0 right-0 text-center z-10">
        <p className="text-white/50 text-xs">Tap anywhere to continue</p>
      </div>
    </button>
  );
}

export default function S2_10_TheChoice() {
  // 'choice' | 'fading_good' | 'fading_bad' | 'transition_good' | 'transition_bad' | 'animation_bad' | 'popup_good' | 'popup_bad'
  const [phase, setPhase] = useState('choice');

  // After a short fade-to-black, move to the transition image
  useEffect(() => {
    if (phase === 'fading_good') {
      const t = setTimeout(() => setPhase('transition_good'), 600);
      return () => clearTimeout(t);
    }
    if (phase === 'fading_bad') {
      const t = setTimeout(() => setPhase('transition_bad'), 1800);
      return () => clearTimeout(t);
    }
  }, [phase]);

  if (phase === 'choice' || phase === 'fading_good' || phase === 'fading_bad') {
    return (
      <div className="flex-1 flex flex-col relative">
        <VisualChoiceScreen
          image="hudsonFacingCamera"
          speaker="Hudson"
          quote="Go out with me tonight? Like we used to do, before everything blew up. Who cares what people say?"
          options={[
            {
              text: 'Fuck it. Let\'s go.',
              onSelect: () => setPhase('fading_good'),
            },
            {
              text: 'We shouldn\'t risk it right now.',
              onSelect: () => setPhase('fading_bad'),
            },
          ]}
        />
        {/* Fade-to-black overlay when choice is made */}
        {(phase === 'fading_good' || phase === 'fading_bad') && (
          <div
            className="absolute inset-0 bg-black animate-fade-in pointer-events-none"
            style={{ animationDuration: phase === 'fading_bad' ? '1.2s' : '0.5s', animationFillMode: 'forwards' }}
          />
        )}
      </div>
    );
  }

  if (phase === 'transition_good') {
    return (
      <FullBleedTransition
        imageKey="hudsonConnorWestHollywood"
        onTap={() => setPhase('animation_good')}
        slow
      />
    );
  }

  if (phase === 'animation_good') {
    return (
      <div className="flex-1 flex flex-col bg-black relative">
        <EndingAnimation type="good" onDone={() => setPhase('popup_good')} />
      </div>
    );
  }

  if (phase === 'transition_bad') {
    return (
      <FullBleedTransition
        imageKey="hudsonConnorApartment"
        onTap={() => setPhase('animation_bad')}
      />
    );
  }

  if (phase === 'animation_bad') {
    return (
      <div className="flex-1 flex flex-col bg-black relative">
        <EndingAnimation type="bad" onDone={() => setPhase('popup_bad')} />
      </div>
    );
  }

  // popup_good / popup_bad
  return (
    <div className="flex-1 flex flex-col bg-black relative">
      {phase === 'popup_good' && (
        <GameOverPopup
          title="Chapter 2 Complete"
          message="You agreed to hang out with Hudson in public, for better or for worse. You've unlocked Chapter 3."
          variant="good"
          options={[
            { text: 'Try a different response', action: 'S2_09' },
            { text: 'Replay Chapter 2', action: 'S2_01' },
            { text: 'Return to main menu', action: 'S0' },
          ]}
        />
      )}
      {phase === 'popup_bad' && (
        <GameOverPopup
          title="Game Over"
          message="Hudson goes without you. You spend the evening alone, feeling despondent."
          variant="bad"
          options={[
            { text: 'Try a different response', action: 'S2_09' },
            { text: 'Restart Chapter 2', action: 'S2_01' },
            { text: 'Return to main menu', action: 'S0' },
          ]}
        />
      )}
    </div>
  );
}
