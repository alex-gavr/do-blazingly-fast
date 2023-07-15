import { useEffect, useState } from 'preact/hooks';
import pushMicroTagScript from './pushMicroTagScript';
import exitZones from '@config/2025';
import { getRandomZone } from '@utils/getRandomZone';

interface IInitPushProps {}

const InitPush = ({}: IInitPushProps) => {
  const [done, setDone] = useState<boolean>(false);
  
  const pushZone = getRandomZone(exitZones.push_zone);;

  useEffect(() => {
    if (pushZone && !done) {
      // pushRequestPermissions()
      pushMicroTagScript({ pushZone: pushZone });
      setDone(true);
    }
  }, [done]);
  return null;
};

export default InitPush;
