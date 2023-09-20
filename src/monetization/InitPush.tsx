import { useEffect, useState } from 'preact/hooks';

import { financeExitsState } from '@context/state';

import { useClientSearchParams } from '@hooks/useClientSearchParams';

import justLog from '@utils/justLog';
import { getRandomZoneIfArray } from '@utils/simpleFunctions/getRandomZoneIfArray';
import debug from '@utils/simpleFunctions/isDebug';
import production from '@utils/simpleFunctions/isProduction';

import pushMicroTagScript from './pushMicroTagScript';

type InitPushProps = {
  zone: number | number[] | undefined;
  disabled?: boolean;
};

const InitPush = ({ zone, disabled }: InitPushProps) => {
  const [done, setDone] = useState<boolean>(false);
  const { push } = useClientSearchParams();
  const pushDisabled = disabled || push === '0' || zone === undefined || !production || debug;

  const startPush = () => {
    // This is zone from context
    const financeExits = financeExitsState.get();
    const pushZone = getRandomZoneIfArray(financeExits.push_zone);

    if (zone !== undefined) {
      pushMicroTagScript({ pushZone: pushZone | getRandomZoneIfArray(zone) });
      setDone(true);
    }
  };

  useEffect(() => {
    if (!done && push !== '0') {
      if (!pushDisabled) {
        startPush();
      } else {
        justLog({ somethingToLog: 'push is disabled in debug mode', type: 'info' });
      }
    }
  }, [done]);
  return null;
};

export default InitPush;
