import { useEffect, useRef, useState } from 'preact/hooks';

import { cn } from '@utils/cn';

import SurveyContainer from '@components/SurveyContainer';

import ProgressBar from './ProgressBar';
import { rewardisSurveyTexts } from './surveyOnlyTexsts';

interface ISurveyWithProgressBarProps {}

const SurveyWithProgressBar = ({}: ISurveyWithProgressBarProps) => {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [isSticky, setSticky] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.boundingClientRect.top < 0) {
            // Element has been scrolled past
            setSticky(true);
          } else {
            // Element is above the fold
            setSticky(false);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
      },
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={elementRef}>
      <div
        className={cn(
          isSticky &&
            'fixed top-0 left-0 bg-slate-100 px-2 py-2 transition-all duration-200 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10',
          'z-10 w-full flex flex-col justify-center items-center gap-2 transition-all duration-200',
        )}
      >
        <div className='flex justify-center items-center gap-2 px-2 mt-8'>
          <ProgressBar />
          <img src='/img/sweep-rewardis/samsung.webp' alt='phone' className='w-1/12' width={300} height={643} loading={'eager'} />
        </div>

        <SurveyContainer
          texts={rewardisSurveyTexts}
          offerId={9560}
          classNameText='text-black'
          classNameAnswersContainer='grid-cols-2'
          buttonVariant={'rewardisSweep'}
          rounded={'xl'}
          fontSize={'base'}
          padding={'bigger'}
          className='uppercase tracking-wider'
        />
      </div>
    </div>
  );
};

export default SurveyWithProgressBar;
