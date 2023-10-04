import { useEffect, useState } from 'preact/compat';

import { rewardisExitsState } from '@context/state';

import executeExitFlow, { ExitFlowType } from '@utils/executeExitFlow';
import { getRandomZoneIfArray } from '@utils/simpleFunctions/getRandomZoneIfArray';

interface TimerProps {
  timeLimitInMinutes: number;
}

const Timer = ({ timeLimitInMinutes }: TimerProps) => {
  const [secondsLeft, setSeconds] = useState<number>(timeLimitInMinutes * 60);

  const [preparedTime, setPreparedTime] = useState<{ minutes: number; seconds: number }>({
    minutes: Math.floor((timeLimitInMinutes * 60) / 60),
    seconds: (timeLimitInMinutes % 60) - 1,
  });

  useEffect(() => {
    const interval = setInterval(startTimer, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft]);

  useEffect(() => {
    if (secondsLeft === 1) {
      const rewardisZones = rewardisExitsState.get();
      console.log('time is up');
      executeExitFlow({
        type: ExitFlowType.justOnclick,
        onclickZones: [
          getRandomZoneIfArray(rewardisZones.autoexit.autoexitBeginning.onclick.newTab),
          getRandomZoneIfArray(rewardisZones.autoexit.autoexitBeginning.onclick.currentTab),
        ],
      });
    }
  }, [secondsLeft]);

  function startTimer() {
    if (secondsLeft > 0) {
      setSeconds(secondsLeft - 1);

      setPreparedTime({
        minutes: Math.floor(secondsLeft / 60),
        seconds: secondsLeft % 60,
      });
    }
  }

  return (
    <div className='grid grid-cols-customTimer gap-1'>
      {preparedTime.minutes < 10 ? (
        <div className='w-full h-full'>
          <div className='flex gap-[2px]'>
            <span className='flex p-2 h-10 flex-1 flex-col justify-center items-center ga-2 text-white text-center rounded-lg bg-slate-700'>0</span>
            <span className='flex p-2 h-10 flex-col flex-1 justify-center items-center ga-2 text-white text-center rounded-lg bg-slate-700'>
              {preparedTime.minutes}
            </span>
          </div>
          <div className='text-slate-400 mt-1 text-xs sm:text-sm'>minutes</div>
        </div>
      ) : (
        <div className='w-full h-full'>
          <div className='flex gap-[2px]'>
            <span className='flex p-2 h-10 flex-col justify-center items-center ga-2 text-white text-center rounded-lg bg-slate-700 flex-1'>
              {preparedTime.minutes.toString()[0]}
            </span>
            <span className='flex p-2 h-10 flex-col justify-center items-center ga-2 text-white text-center rounded-lg bg-slate-700 flex-1'>
              {preparedTime.minutes.toString()[1]}
            </span>
          </div>
          <div className='text-slate-400 mt-1 text-xs sm:text-sm'>minutes</div>
        </div>
      )}

      <span className='text-slate-200 flex justify-center text-2xl'>:</span>

      {preparedTime.seconds < 10 ? (
        <div className='w-full h-full'>
          <div className='flex gap-[2px]'>
            <span className='flex p-2 h-10 flex-col justify-center items-center ga-2 text-white text-center rounded-lg bg-slate-700 flex-1'>0</span>
            <span className='flex p-2 h-10 flex-col justify-center items-center ga-2 text-white text-center rounded-lg bg-slate-700 flex-1'>
              {preparedTime.seconds}
            </span>
          </div>
          <div className='text-slate-400 mt-1 text-xs sm:text-sm'>seconds</div>
        </div>
      ) : (
        <div className='w-full h-full'>
          <div className='flex gap-[2px]'>
            <span className='flex p-2 h-10 flex-col justify-center items-center ga-2 text-white text-center rounded-lg bg-slate-700 flex-1'>
              {preparedTime.seconds.toString()[0]}
            </span>
            <span className='flex p-2 h-10 flex-col justify-center items-center ga-2 text-white text-center rounded-lg bg-slate-700 flex-1'>
              {preparedTime.seconds.toString()[1]}
            </span>
          </div>
          <div className='text-slate-400 mt-1 text-xs sm:text-sm'>seconds</div>
        </div>
      )}
    </div>
  );
};

export default Timer;
