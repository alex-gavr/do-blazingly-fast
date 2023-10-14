import { useEffect, useState } from 'preact/hooks';

import { cn } from '@utils/cn';

interface IConfettiProps {}

const Confetti = ({}: IConfettiProps) => {
  const [isConfettiVisible, setIsConfettiVisible] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsConfettiVisible(false);
    }, 3000);
  }, []);

  return <div className={cn('raiConfetti opacity-75 transition-all duration-1000', !isConfettiVisible && 'opacity-0 pointer-events-none')} />;
};

export default Confetti;
