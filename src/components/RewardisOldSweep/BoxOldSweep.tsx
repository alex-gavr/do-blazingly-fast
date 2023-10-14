import { useState } from 'preact/hooks';

import { modalState } from '@context/state';

import type { TOldSweepDictionary } from '@i18n/9569/en';

import { cn } from '@utils/cn';

interface IBoxesProps {
  attempt: number;
  setAttempt: (attempt: number) => void;
  index: number;
  t: TOldSweepDictionary['Modal'];
}

const BoxOldSweep = ({ attempt, setAttempt, index, t }: IBoxesProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [winnerBox, setWinnerBox] = useState<boolean>(false);

  const handleOpen = () => {
    if (attempt === 2) {
      return;
    }
    if (attempt === 0) {
      setAttempt(1);
      setIsOpen(true);
      setTimeout(() => {
        modalState.set({
          isOpen: true,
          isWinningModal: false,
          title: t.FirstTry.title,
          description: t.FirstTry.description,
          description2: '',
          imageUrl: '',
          onCloseText: 'OK',
        });
      }, 500);
    }
    if (attempt === 1) {
      setAttempt(2);
      setIsOpen(true);
      setWinnerBox(true);
      setTimeout(() => {
        modalState.set({
          isOpen: true,
          isWinningModal: true,
          imageUrl: '/img/sweep-old/samsung.png',
          title: t.SecondTry.title,
          description: t.SecondTry.description,
          description2: '',
          onCloseText: 'OK',
        });
      }, 1500);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center rounded-md overflow-hidden relative' onClick={handleOpen}>
      {!isOpen && (
        <img
          src={'img/sweep-old/box_c.png'}
          alt=''
          width={241}
          height={184}
          className={cn(
            'animate-fade-up animate-duration-500 w-24 md:w-40 transition-all',
            index === 0 && 'animate-delay-[0s]',
            index === 1 && 'animate-delay-[0.1s]',
            index === 2 && 'animate-delay-[0.2s]',
            index === 3 && 'animate-delay-[0.3s]',
            index === 4 && 'animate-delay-[0.4s]',
            // index === 4 && attempt === 1 && !isOpen && 'animate-wiggle animate-infinite',
            index === 5 && 'animate-delay-[0.5s]',
            index === 6 && 'animate-delay-[0.6s]',
            index === 7 && 'animate-delay-[0.7s]',
            index === 8 && 'animate-delay-[0.8s]',
          )}
        />
      )}
      {isOpen && (
        <>
          <img
            src={'img/sweep-old/box_o_t.png'}
            alt=''
            width={241}
            height={79}
            className='animate-fade-up transition-all w-24 md:w-40 animate-duration-1000 absolute top-1 sm:top-0 z-10'
          />
          {attempt === 2 && winnerBox && (
            <img
              src={'/img/sweep-old/samsung.png'}
              alt=''
              width={377}
              height={252}
              className='absolute top-0 animate-fade-up animate-duration-700 animate-ease-in-out transition-all animate-delay-500 ease-in-out w-14 z-20'
            />
          )}
          <img
            src={'img/sweep-old/box_o_b.png'}
            alt=''
            width={101}
            height={92}
            className='animate-fade-up transition-all w-24 md:w-40 animate-duration-1000 pt-[18px] z-30'
          />
        </>
      )}
    </div>
  );
};

export default BoxOldSweep;
