import { useState, useEffect, useRef } from 'react';
import useGameStore from '../store/gameStore';
import EmailViewer from '../components/EmailViewer';

/**
 * S2_08 — PR Reminder
 * Email from Nick about keeping Connor and Hudson's brands separate.
 * After scroll to bottom (or 5s fallback) → notification from Huddy → S2_09.
 */

export default function S2_08_PRReminder() {
  const pushNotification = useGameStore((s) => s.pushNotification);
  const [triggered, setTriggered] = useState(false);
  const timerRef = useRef(null);

  const triggerNotification = () => {
    if (triggered) return;
    setTriggered(true);
    if (timerRef.current) clearTimeout(timerRef.current);

    pushNotification({
      id: 'n_s2_08',
      from: 'Huddy',
      avatar: 'hudsonAvatar',
      preview: 'What are you up to?',
      target: 'S2_09',
    });
  };

  // Fallback timer in case email content isn't long enough to scroll
  useEffect(() => {
    timerRef.current = setTimeout(triggerNotification, 5000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  return (
    <EmailViewer
      from={{ name: 'Nick Vasquez', avatar: 'nickAvatar' }}
      subject="Quick check in on press strategy"
      body={`Connor,

I'm sure you've seen the airport photos circulating online.

We've worked hard to keep your and Hudson's brands separate. I know there's always demand, but let's continue managing that carefully.

Nothing changes on our end. We'll keep your public presence focused on Ascension and your own directorial projects. We're in a good place with Victor's team on cross-promotion, so let's keep that momentum going.

Just wanted to check in and make sure we're still aligned. All good?

Nick`}
      onScrollEnd={triggerNotification}
    />
  );
}
