import { useStore } from '@nanostores/preact';
import { useEffect, useState } from 'preact/hooks';
import { getCookie, setCookie } from 'typescript-cookie';

import { doTestsExitsState } from '@context/state';

import { cn } from '@utils/cn';
import makeExitUrl, { ExitType } from '@utils/linksHelpers/makeExitUrl';
import debug from '@utils/simpleFunctions/isDebug';
import production from '@utils/simpleFunctions/isProduction';
import openUrlInNewTab from '@utils/simpleFunctions/openUrlInNewTab';
import replaceCurrentUrl from '@utils/simpleFunctions/replaceCurrentUrl';

const TIMER = 120;
const MINUTE = 60;

interface IProps {
  freeAccess?: string;
  secondsWord?: string;
  offerExpired?: string;
  className?: string;
}
const CountDown = ({ freeAccess = 'free access ends in', secondsWord = 'seconds', offerExpired = 'offer expired', className }: IProps) => {
  const doTestExits = useStore(doTestsExitsState);
  const [time, setTime] = useState(TIMER);
  const alreadyAccessAutoExit = getCookie('accessAutoExit');

  useEffect(() => {
    if (alreadyAccessAutoExit) {
      if (doTestExits.accessAutoExit) {
        const url = makeExitUrl(doTestExits.accessAutoExit, ExitType.onclick);
        window.open(url, '_blank');
        window.location.replace(url);
      }
    }

    const interval = setInterval(() => {
      setTime((currentCount) => currentCount - 1);
    }, 1000);

    if (time < 0 && production && !debug) {
      const in30Minutes = 1 / 48;
      setCookie('accessAutoExit', 'true', { path: '/', expires: in30Minutes });

      if (doTestExits.accessAutoExit) {
        const url = makeExitUrl(doTestExits.accessAutoExit, ExitType.onclick);
        openUrlInNewTab(url);
        replaceCurrentUrl(url);
      }
    }

    return () => clearInterval(interval);
  }, [time]);

  return (
    <div className='flex flex-row items-center justify-center gap-2'>
      {time > 0 ? (
        <>
          <p className='text-center text-xs text-slate-950 sm:text-sm'>{freeAccess}</p>
          <p className={cn('rounded-lg bg-indigo-200 px-2 py-1 text-xs text-slate-950 sm:text-sm', className)}>
            {/* 0{minutes}: */}
            {time} {secondsWord}
          </p>
        </>
      ) : (
        <p>{offerExpired}</p>
      )}
    </div>
  );
};

export default CountDown;
