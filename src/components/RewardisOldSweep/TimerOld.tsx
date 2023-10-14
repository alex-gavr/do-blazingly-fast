import { useEffect, useState } from 'preact/hooks';

import type { TOldSweepDictionary } from '@i18n/9569/en';

interface Props {
  t: TOldSweepDictionary['Counter'];
}

const Counter = ({ t }: Props) => {
  const [timeLeft, setTimeLeft] = useState(150); // 2 minutes 30 seconds
  const [minute, setMinute] = useState(Math.floor(timeLeft / 60));
  const [second, setSecond] = useState(timeLeft % 60);

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
        setMinute(Math.floor((timeLeft - 1) / 60));
        setSecond((timeLeft - 1) % 60);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <p className={'text-xs tracking-wider text-slate-800'}>
      {t.p1}{' '}
      <b>
        {' '}
        {minute} {t.minutes} {t.and} {second < 10 ? `0${second}` : second} {t.seconds}
      </b>{' '}
      {t.p2}.
    </p>
  );
};

export default Counter;
