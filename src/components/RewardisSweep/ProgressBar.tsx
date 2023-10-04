import { useStore } from '@nanostores/preact';

import { currentStepState, surveyLengthState } from '@context/state';

interface ProgressBarProps {}

const ProgressBar = ({}: ProgressBarProps) => {
  const value = useStore(currentStepState);
  const max = useStore(surveyLengthState);
  const progress = `${Math.round((value / max) * 100)}%`;

  return (
    <div className='flex flex-row justify-center items-center gap-2 w-full'>
      <p className={'text-xs flex-shrink-0 text-emerald-500 tracking-wider font-bold'}>
        {value} / {max}
      </p>
      <div className='rounded-full bg-gray-300 h-1 min-w-[100px] relative w-full overflow-hidden'>
        <div
          className='absolute left-0 top-0 bottom-0 h-1 rounded-full bg-emerald-500 transition-all duration-1000 w-1/2'
          style={{ width: progress }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
