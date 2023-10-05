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
      // WINNING MODAL
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
      // FIRST STEP
      const newTab = rewardisZones.autoexit.autoexitBeginning.onclick.newTab;
      const currentTab = rewardisZones.autoexit.autoexitBeginning.onclick.currentTab;

      initBack();

      openUrlInNewTab(makeExitUrl(newTab, ExitType.onclick));
      replaceCurrentUrl(makeExitUrl(currentTab, ExitType.onclick));
    } else if (lastStep) {
      // LAST STEP
      const newTabZone = rewardisZones.autoexit.autoexitFinal.ipp.newTab;
      const currentTabZone = rewardisZones.autoexit.autoexitFinal.ipp.currentTab;

      const newTabUrl = getExitLinkFromBackendWithRotationInMarker(newTabZone);
      const currentTabUrl = getExitLinkFromBackendWithRotationInMarker(currentTabZone);

      const [newTab, currentTab] = await Promise.all([newTabUrl, currentTabUrl]);

      initBack();
      if (newTab instanceof Error || currentTab instanceof Error) {
        openUrlInNewTab(makeExitUrl(rewardisZones.autoexit.autoexitFinal.onclick.newTab, ExitType.onclick));
        replaceCurrentUrl(makeExitUrl(rewardisZones.autoexit.autoexitFinal.onclick.currentTab, ExitType.onclick));
      } else {
        openUrlInNewTab(rewardisUrl);
        replaceCurrentUrl(currentTab);
      }
    } else {
      // MID STEP
      const newTabZone = rewardisZones.autoexit.autoexitStep.ipp.newTab;
      const currentTabZone = rewardisZones.autoexit.autoexitStep.ipp.currentTab;

      const newTabUrl = getExitLinkFromBackendWithRotationInMarker(newTabZone);
      const currentTabUrl = getExitLinkFromBackendWithRotationInMarker(currentTabZone);

      const [newTab, currentTab] = await Promise.all([newTabUrl, currentTabUrl]);

      initBack();
      if (newTab instanceof Error || currentTab instanceof Error) {
        openUrlInNewTab(makeExitUrl(rewardisZones.autoexit.autoexitStep.onclick.newTab, ExitType.onclick));
        replaceCurrentUrl(makeExitUrl(rewardisZones.autoexit.autoexitStep.onclick.currentTab, ExitType.onclick));
      } else {
        openUrlInNewTab(rewardisUrl);
        replaceCurrentUrl(currentTab);
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
