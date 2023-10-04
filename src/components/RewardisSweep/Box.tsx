import { useState } from 'preact/hooks';

import { modalState } from '@context/state';

import { cn } from '@utils/cn';

interface IBoxesProps {
  attempt: number;
  setAttempt: (attempt: number) => void;
  index: number;
}

const Box = ({ attempt, setAttempt, index }: IBoxesProps) => {
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
          title: 'Bad Luck! Try again',
          description: '2 attempts left',
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
          title: 'You are participating in a competition.',
          description: 'Proceed to the next step',
          description2: '',
          imageUrl: '',
          onCloseText: 'OK',
        });
      }, 1500);
    }
  };
  return (
    <div className='flex flex-col justify-center items-center bg-slate-50 rounded-md overflow-hidden relative' onClick={handleOpen}>
      {!isOpen && (
        <img
          src={'img/sweep-rewardis/closedBox.svg'}
          alt=''
          width={101}
          height={92}
          className={cn(
            'pl-px pr-3 py-2 animate-fade-up transition-all duration-500',
            index === 0 && 'animate-delay-[0s]',
            index === 1 && 'animate-delay-[0.1s]',
            index === 2 && 'animate-delay-[0.2s]',
            index === 3 && 'animate-delay-[0.3s]',
            index === 4 && 'animate-delay-[0.4s]',
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
            src={'img/sweep-rewardis/emptyBox.svg'}
            alt=''
            width={101}
            height={92}
            className='pl-px pr-3 py-2 animate-jump-in transition-all duration-500'
          />
          {attempt === 2 && winnerBox && (
            <img
              src={'img/sweep-rewardis/phone-full.png'}
              alt=''
              width={134}
              height={276}
              className='absolute top-1 animate-fade-up transition-all duration-500 animate-delay-500 ease-in-out w-3/12'
            />
          )}
        </>
      )}
    </div>
  );
};

export default Box;
