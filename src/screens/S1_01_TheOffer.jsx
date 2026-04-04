import { useEffect } from 'react';
import useGameStore from '../store/gameStore';
import EmailViewer from '../components/EmailViewer';

/**
 * S1_01 — The Offer
 * Email from Nick confirming Connor booked Ascension.
 * After 3 seconds, a notification from Hudson appears.
 */
export default function S1_01_TheOffer() {
  const pushNotification = useGameStore((s) => s.pushNotification);

  useEffect(() => {
    const timer = setTimeout(() => {
      pushNotification({
        id: 'n_s1_01',
        from: 'Huddy',
        avatar: 'hudsonAvatar',
        preview: 'Just wrapped. I\'m beat. Talk tomorrow',
        target: 'S1_02',
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <EmailViewer
      from={{ name: 'Nick Vasquez', avatar: 'nickAvatar' }}
      subject="Congratulations — you got it"
      body={`Connor,

I know it's late, so I figured I'd let you get your beauty sleep and send you an email instead of calling. But I wanted you to hear this tonight.

You booked Ascension.

Nureyev is yours. It was unanimous. Victor Halberg has also confirmed as Erik Bruhn. We'll talk tomorrow and I'll walk you through the full timeline.

Congrats again. I know how much you wanted this.

Best,
Nick

Nick Vasquez
NVA Artist Management`}
    />
  );
}
