import { useStore } from '@nanostores/preact';
import { useEffect, useState } from 'preact/hooks';
import { Cookies } from 'typescript-cookie';

import { currentStepState, exitsUrlsState, modalState, rewardisExitsState, rewardisUrlState, surveyLengthState } from '@context/state';

import { useEventListener } from '@hooks/useEventListener';

import justLog from '@utils/justLog';
import { getExitLinkFromBackendWithRotationInMarker } from '@utils/linksHelpers/getExitLinkFromBackendWithRotationInMarker';
import makeExitUrl, { ExitType } from '@utils/linksHelpers/makeExitUrl';
import debug from '@utils/simpleFunctions/isDebug';
import production from '@utils/simpleFunctions/isProduction';
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
  const { isWinningModal } = modalState.get();
  const rewardisUrl = rewardisUrlState.get();
  const rewardisZones = useStore(rewardisExitsState);
  const exitsUrls = useStore(exitsUrlsState);

  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  const boxes = pathname.includes('boxes');

  const firstStep = step === 1;
  const lastStep = step === surveyLength;

  const updateCount = () => {
    setCount(THIRTY_SECONDS);
  };

  const initAutoExit = async () => {
    if (isWinningModal) {
      // WINNING MODAL
      const newTab = rewardisUrl;
      const currentTab = exitsUrls.exitsUrls.filter((exit) => exit.zoneName === IPPZones.mainExitCurrentTab)[0].url;
      if (production) {
        Cookies.set('nonUnique', 'true', { expires: 7 });
        initBack();
        openUrlInNewTab(newTab);
        replaceCurrentUrl(currentTab);
      } else {
        justLog({ somethingToLog: ['autoexit winning modal', newTab, currentTab], type: 'info' });
      }
      return;
    }

    if (firstStep && !boxes) {
      // FIRST STEP
      const newTab = rewardisZones.autoexit.autoexitBeginning.onclick.newTab;
      const currentTab = rewardisZones.autoexit.autoexitBeginning.onclick.currentTab;

      if (production) {
        initBack();
        openUrlInNewTab(makeExitUrl(newTab, ExitType.onclick));
        replaceCurrentUrl(makeExitUrl(currentTab, ExitType.onclick));
      } else {
        justLog({ somethingToLog: ['autoexit first step', newTab, currentTab], type: 'info' });
      }
    } else if (lastStep) {
      // LAST STEP
      const newTab = exitsUrls.exitsUrls.filter((exit) => exit.zoneName === IPPZones.autoExitFinalNewTab)[0].url;
      const currentTab = exitsUrls.exitsUrls.filter((exit) => exit.zoneName === IPPZones.autoExitFinalCurrentTab)[0].url;

      if (production) {
        initBack();
        openUrlInNewTab(newTab);
        replaceCurrentUrl(currentTab);
      } else {
        justLog({ somethingToLog: ['autoexit last step', newTab, currentTab], type: 'info' });
      }
    } else {
      // MID STEP
      const newTab = exitsUrls.exitsUrls.filter((exit) => exit.zoneName === IPPZones.autoExitStepNewTab)[0].url;
      const currentTab = exitsUrls.exitsUrls.filter((exit) => exit.zoneName === IPPZones.autoExitStepCurrentTab)[0].url;

      if (production) {
        initBack();
        openUrlInNewTab(newTab);
        replaceCurrentUrl(currentTab);
      } else {
        justLog({ somethingToLog: ['autoexit mid step', newTab, currentTab], type: 'info' });
      }
    }
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
      if (typeof window !== 'undefined') {
        initAutoExit();
      }
    }

    return () => clearInterval(interval);
  }, [count]);

  return null;
};

export default AutoExit;
