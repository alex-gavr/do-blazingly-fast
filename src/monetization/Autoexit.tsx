import { useStore } from '@nanostores/preact';
import { useEffect, useState } from 'preact/hooks';

import { currentStepState, surveyLengthState } from '@context/state';

import { useClientSearchParams } from '@hooks/useClientSearchParams';
import { useEventListener } from '@hooks/useEventListener';

import executeExitFlow from '@utils/executeExitFlow';
import { getRandomZoneIfArray } from '@utils/simpleFunctions/getRandomZoneIfArray';
import debug from '@utils/simpleFunctions/isDebug';
import production from '@utils/simpleFunctions/isProduction';

import { initBack } from './Back';

const THIRTY_SECONDS = 30;

type AutoExitProps = {
  zoneFirstStep: number | number[];
  zoneFirstStepPops: number | number[];
  zoneMiddleSteps: number | number[];
  zoneMiddleStepsPops: number | number[];
  zoneLastStep: number | number[];
  zoneLastStepPops: number | number[];
};

const AutoExit = ({
  zoneFirstStep = 4292614, // Onclick autoexit
  zoneFirstStepPops = 5206508, // Onclick autoexit pops
  zoneMiddleSteps = 5381339, //IPP autoexit
  zoneMiddleStepsPops = 5381332, //IPP autoexit pops
  zoneLastStep = 4292523, // IPP main exit
  zoneLastStepPops = 5128285, // IPP main exit pops
}: AutoExitProps) => {
  // ability to disable any time of autoexit
  const { autoexit, autoexitStart, autoexitMiddle, autoexitEnd } = useClientSearchParams();

  const [count, setCount] = useState(THIRTY_SECONDS);
  const step = useStore(currentStepState);
  const surveyLength = useStore(surveyLengthState);
  const firstStep = step === 1;
  const lastStep = step === surveyLength;

  const updateCount = () => {
    setCount(THIRTY_SECONDS);
  };

  const initAutoExit = () => {
    initBack();

    if (firstStep && autoexitStart !== '0') {
      executeExitFlow({
        type: 'justOnclick',
        onclickZones: [getRandomZoneIfArray(zoneFirstStep), getRandomZoneIfArray(zoneFirstStepPops)],
      });
    } else if (lastStep && autoexitEnd !== '0') {
      executeExitFlow({
        type: 'withRotationInMarker',
        ippZones: [getRandomZoneIfArray(zoneLastStep), getRandomZoneIfArray(zoneLastStepPops)],
        executeConversion: true,
      });
    } else if (autoexitMiddle !== '0') {
      executeExitFlow({
        type: 'withRotationInMarker',
        ippZones: [getRandomZoneIfArray(zoneMiddleSteps), getRandomZoneIfArray(zoneMiddleStepsPops)],
      });
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
        if ((production && !debug) || (production && autoexit !== '0')) {
          initAutoExit();
        }
      }
    }

    return () => clearInterval(interval);
  }, [count]);

  return null;
};

export default AutoExit;
