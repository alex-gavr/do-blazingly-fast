import { useStore } from '@nanostores/preact';
import { useEffect, useState } from 'preact/hooks';
import { Cookies } from 'typescript-cookie';

import { currentStepState, modalState, rewardisExitsState, rewardisUrlState, surveyLengthState } from '@context/state';

import { useEventListener } from '@hooks/useEventListener';

import getUrlFromContextBasedOnZone from '@utils/getUrlFromContext';
import makeExitUrl, { ExitType } from '@utils/linksHelpers/makeExitUrl';
import openUrlInNewTab from '@utils/simpleFunctions/openUrlInNewTab';
import replaceCurrentUrl from '@utils/simpleFunctions/replaceCurrentUrl';

import { initBack } from './Back';
import { IPPZones } from './NonUnique';

const THIRTY_SECONDS = 30;

type AutoExitProps = {};

const AutoExit = ({}: AutoExitProps) => {
  // ability to disable any time of autoexit

  const [count, setCount] = useState(THIRTY_SECONDS);
  const step = useStore(currentStepState);
  const surveyLength = useStore(surveyLengthState);
  const { isWinningModal } = useStore(modalState);
  const rewardisUrl = useStore(rewardisUrlState);
  const rewardisZones = useStore(rewardisExitsState);

  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  const boxes = pathname.includes('boxes');

  const firstStep = step === 1;
  const lastStep = step === surveyLength;

  const updateCount = () => {
    setCount(THIRTY_SECONDS);
  };

  const conversionAutoExit = () => {
    const newTab = rewardisUrl;
    // const currentTab = getUrlFromContextBasedOnZone({ exitZone: IPPZones.mainExitCurrentTab });
    const currentTab = getUrlFromContextBasedOnZone({ exitZone: IPPZones.tabUnderCurrentTab });

    try {
      Cookies.set('nonUnique', 'true', { expires: 7 });
      openUrlInNewTab(newTab);
      replaceCurrentUrl(currentTab);
    } catch (error) {
      throw new Error("conversion autoexit didn't work");
    }
  };

  const firstStepAutoExit = () => {
    const newTab = makeExitUrl(rewardisZones.autoexit.autoexitBeginning.onclick.newTab, ExitType.onclick);
    const currentTab = makeExitUrl(rewardisZones.autoexit.autoexitBeginning.onclick.currentTab, ExitType.onclick);

    try {
      openUrlInNewTab(newTab);
      replaceCurrentUrl(currentTab);
    } catch (error) {
      throw new Error("first step autoexit didn't work");
    }
  };

  const lastStepAutoExit = () => {
    const newTab = makeExitUrl(rewardisZones.autoexit.autoexitFinal.onclick.newTab, ExitType.onclick);
    const currentTab = makeExitUrl(rewardisZones.autoexit.autoexitFinal.onclick.currentTab, ExitType.onclick);

    try {
      openUrlInNewTab(newTab);
      replaceCurrentUrl(currentTab);
    } catch (error) {
      throw new Error("last step autoexit didn't work");
    }
  };

  const stepAutoExit = () => {
    const newTab = makeExitUrl(rewardisZones.autoexit.autoexitStep.onclick.newTab, ExitType.onclick);
    const currentTab = makeExitUrl(rewardisZones.autoexit.autoexitStep.onclick.currentTab, ExitType.onclick);

    try {
      openUrlInNewTab(newTab);
      replaceCurrentUrl(currentTab);
    } catch (error) {
      throw new Error("step autoexit didn't work");
    }
  };

  useEventListener('mousemove', updateCount);
  useEventListener('click', updateCount);
  useEventListener('scroll', updateCount);
  // useEventListener('touchmove', updateCount);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => currentCount - 1);
    }, 1000);
    if (count === 0) {
      initBack();
      if (isWinningModal) {
        conversionAutoExit();
      }
      if (firstStep && !boxes) {
        firstStepAutoExit();
      }
      if (lastStep) {
        lastStepAutoExit();
      }
      if ((boxes && !isWinningModal) || (!boxes && !lastStep && !firstStep)) {
        stepAutoExit();
      }
    }

    return () => clearInterval(interval);
  }, [count, step, surveyLength, isWinningModal, rewardisUrl, rewardisZones]);

  return null;
};

export default AutoExit;
