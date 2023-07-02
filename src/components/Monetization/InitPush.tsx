import { useEffect, useState } from 'preact/hooks';
import pushMicroTagScript from './pushMicroTagScript';
import exitZones from '@config/2025';
import production from '@utils/isProduction';
import pushRequestPermissions from './requestPermission';

interface IInitPushProps {}

const InitPush = ({}: IInitPushProps) => {
  const [done, setDone] = useState<boolean>(false);
  const pushZone = exitZones.push_zone[Math.floor(Math.random() * exitZones.push_zone.length)];

  useEffect(() => {
    if (pushZone && production && !done) {
      pushRequestPermissions()
      pushMicroTagScript({ pushZone: pushZone });
      setDone(true);
    }
  }, [done]);
  return null;
};

export default InitPush;
