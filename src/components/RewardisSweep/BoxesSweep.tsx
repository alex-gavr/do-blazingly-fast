import { useEffect, useState } from 'preact/hooks';

import { modalState } from '@context/state';

import Box from './Box';

interface IBoxesSweepProps {}

const BoxesSweep = ({}: IBoxesSweepProps) => {
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (attempt === 0) {
      setTimeout(() => {
        modalState.set({
          isOpen: true,
          isWinningModal: false,
          title: 'Congratulations',
          description: 'your answers are correct',
          description2: 'Now you have the opportunity to receive a gift',
          imageUrl: '',
          onCloseText: 'Try your luck!',
        });
      }, 500);
    }
  }, []);

  return (
    <>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((box, index) => (
        <Box attempt={attempt} setAttempt={setAttempt} index={index} />
      ))}
    </>
  );
};

export default BoxesSweep;
