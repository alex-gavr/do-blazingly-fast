import { useStore } from '@nanostores/preact';
import { useEffect, useState } from 'preact/hooks';
import { Cookies } from 'typescript-cookie';

import { currentStepState, modalState, rewardisExitsState, rewardisUrlState, surveyLengthState } from '@context/state';

import { useEventListener } from '@hooks/useEventListener';

import justLog from '@utils/justLog';
import { getExitLinkFromBackendWithRotationInMarker } from '@utils/linksHelpers/getExitLinkFromBackendWithRotationInMarker';
import makeExitUrl, { ExitType } from '@utils/linksHelpers/makeExitUrl';
import debug from '@utils/simpleFunctions/isDebug';
import production from '@utils/simpleFunctions/isProduction';
import openUrlInNewTab from '@utils/simpleFunctions/openUrlInNewTab';
import replaceCurrentUrl from '@utils/simpleFunctions/replaceCurrentUrl';

import { initBack } from './Back';

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

  const firstStep = step === 1;
  const lastStep = step === surveyLength;

  const updateCount = () => {
    setCount(THIRTY_SECONDS);
  };

  const initAutoExit = async () => {
    if (isWinningModal) {
      const newTab = rewardisUrl;
      const currentTab = await getExitLinkFromBackendWithRotationInMarker(rewardisZones.mainExit.ipp.currentTab);
      Cookies.set('nonUnique', 'true', { expires: 7 });
      initBack();
      if (currentTab instanceof Error) {
        openUrlInNewTab(newTab);
        replaceCurrentUrl(makeExitUrl(rewardisZones.tabUnder.onclick.currentTab, ExitType.onclick));
      } else {
        openUrlInNewTab(rewardisUrl);
        replaceCurrentUrl(currentTab);
      }
    }

    if (firstStep) {
      const newTab = rewardisZones.autoexit.autoexitBeginning.onclick.newTab;
      const currentTab = rewardisZones.autoexit.autoexitBeginning.onclick.currentTab;

      initBack();

      openUrlInNewTab(makeExitUrl(newTab, ExitType.onclick));
      replaceCurrentUrl(makeExitUrl(currentTab, ExitType.onclick));
    } else if (lastStep) {
      const newTab = rewardisZones.autoexit.autoexitFinal.onclick.newTab;
      const currentTab = rewardisZones.autoexit.autoexitFinal.onclick.currentTab;

      initBack();

      openUrlInNewTab(makeExitUrl(newTab, ExitType.onclick));
      replaceCurrentUrl(makeExitUrl(currentTab, ExitType.onclick));
    } else {
      const newTab = rewardisZones.autoexit.autoexitStep.onclick.newTab;
      const currentTab = rewardisZones.autoexit.autoexitStep.onclick.currentTab;

      initBack();

      openUrlInNewTab(makeExitUrl(newTab, ExitType.onclick));
      replaceCurrentUrl(makeExitUrl(currentTab, ExitType.onclick));
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
        if (production && !debug) {
          initAutoExit();
        } else {
          justLog({ somethingToLog: 'autoexit disabled', type: 'info' });
        }
      }
    }

    return () => clearInterval(interval);
  }, [count]);

  return null;
};

export default AutoExit;
