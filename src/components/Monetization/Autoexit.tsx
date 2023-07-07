import { useEffect, useState } from 'preact/hooks';
import { setCookie } from 'typescript-cookie';
import { useEventListener } from '@utils/useEventListener';
import exitZones from '@config/2025';
// import { getExitLinkFromBackend } from '@utils/getExitLinkFromBackend';
import { initBack } from './Back';
import makeExitUrl, { ExitType } from '@utils/makeExitUrl';

const THIRTY_SECONDS = 30;
// const FORTY_SECONDS = 40;

const AutoExit = () => {
  const [count, setCount] = useState(THIRTY_SECONDS);

  // AUTO-EXIT
  const updateCount = () => {
    setCount(THIRTY_SECONDS);
  };

  useEventListener('mousemove', updateCount);
  useEventListener('click', updateCount);
  useEventListener('scroll', updateCount);
  useEventListener('touchmove', updateCount);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => currentCount - 1);
    }, 1000);
    if (count === 0) {
      const mainZone = exitZones.onclick_autoexit[Math.floor(Math.random() * exitZones.onclick_autoexit.length)];
      const popsZone = exitZones.onclick_autoexit_pops[Math.floor(Math.random() * exitZones.onclick_autoexit_pops.length)];
      const main = makeExitUrl(mainZone, ExitType.onclick);
      const pops = makeExitUrl(popsZone, ExitType.onclick);

      // We redirect to non-unique users who came back within 30 minutes
      const in30Minutes = 1 / 48;
      setCookie('autoExit', '1', { expires: in30Minutes, path: '' });
      initBack(exitZones.onclick_back_zone);
      window.open(main, '_blank');
      window.location.replace(pops);
    }

    return () => clearInterval(interval);
  }, [count]);

  return null;
};

export default AutoExit;
