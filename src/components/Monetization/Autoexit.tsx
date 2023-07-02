import { useEffect, useState } from 'preact/hooks';
import makeExitUrl, { ExitType } from '@utils/makeExitUrl';
import { setCookie } from 'typescript-cookie';
import { useEventListener } from '@utils/useEventListener';
import exitZones from '@config/2025';
import getExitLinkWithMediation from '@utils/getExitLinkWithMediation';

const THIRTY_SECONDS = 30;
// const FORTY_SECONDS = 40;

// WARNING: Autoexit works only in game.
const AutoExit = () => {
  const [count, setCount] = useState(THIRTY_SECONDS);
  const [autoExitUrl, setAutoExitUrl] = useState<string | null>(null);
  const [autoExitPopsUrl, setAutoExitPopsUrl] = useState<string | null>(null);

  // AUTO-EXIT
  const updateCount = () => {
    setCount(THIRTY_SECONDS);
  };

  useEventListener('mousemove', updateCount);
  useEventListener('click', updateCount);
  useEventListener('scroll', updateCount);
  useEventListener('touchmove', updateCount);

  useEffect(() => {
    if (autoExitUrl === null || autoExitPopsUrl === null) {
      const autoExitIpp = exitZones.ipp_autoexit[Math.floor(Math.random() * exitZones.ipp_autoexit.length)];
      const autoExitPopsIpp = exitZones.ipp_autoexit_pops;

      const autoExitOnclick = exitZones.onclick_autoexit[Math.floor(Math.random() * exitZones.onclick_autoexit.length)];
      const autoExitPopsOnclick = exitZones.onclick_autoexit_pops[Math.floor(Math.random() * exitZones.onclick_autoexit_pops.length)];

      const getUrls = async () => {
        const main = getExitLinkWithMediation(autoExitIpp, autoExitOnclick);
        const pops = getExitLinkWithMediation(autoExitPopsIpp, autoExitPopsOnclick);
        const [mainUrl, popsUrl] = await Promise.all([main, pops]);
        setAutoExitUrl(mainUrl);
        setAutoExitPopsUrl(popsUrl);
      };
      // Fetch IPP
      getUrls();
    }
  }, [autoExitUrl, autoExitPopsUrl]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => currentCount - 1);
    }, 1000);
    if (count === 0) {
      // const urlPops =
      if (autoExitUrl) {
        // We redirect to non-unique users who came back within 30 minutes
        setCookie('autoExit', '1', { expires: 1, path: '' });
        window.open(autoExitUrl, '_blank');
        if (autoExitPopsUrl) {
          window.location.replace(autoExitPopsUrl);
        }
      }
    }

    return () => clearInterval(interval);
  }, [count]);

  return null;
};

export default AutoExit;
