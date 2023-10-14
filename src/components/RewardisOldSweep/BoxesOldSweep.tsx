import { useEffect, useState } from 'preact/hooks';

import { modalState } from '@context/state';

import type { TOldSweepDictionary } from '@i18n/9569/en';

import BoxOldSweep from './BoxOldSweep';

interface IBoxesSweepProps {
  t: TOldSweepDictionary['Modal'];
}

const BoxesOldSweep = ({ t }: IBoxesSweepProps) => {
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (attempt === 0) {
      setTimeout(() => {
        modalState.set({
          isOpen: true,
          isWinningModal: false,
          title: t.Welcome.title,
          description: t.Welcome.description,
          description2: t.Welcome.description2,
          imageUrl: '/img/sweep-old/box_c.png',
          onCloseText: t.Welcome.onCloseText,
        });
      }, 500);
    }
  }, []);

  return (
    <>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((box, index) => (
        <BoxOldSweep attempt={attempt} setAttempt={setAttempt} index={index} t={t} />
      ))}
    </>
  );
};

export default BoxesOldSweep;
