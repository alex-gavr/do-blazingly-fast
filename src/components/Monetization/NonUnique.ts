import exitZones from '@config/2025';
import { getExitLinkFromBackend } from '@utils/getExitLinkFromBackend';
import { initBack } from './Back';
import { getRandomZone } from '@utils/getRandomZone';
import production from '@utils/isProduction';
import Cookies from 'js-cookie';

const NonUnique = () => {
  const nonUnique = Cookies.get('nonUnique') ?? false;
  const nonUniqueAutoExit = Cookies.get('autoExit') ?? false;
  const nonUniqueTeen = Cookies.get('nonUniqueTeen') ?? false;

  const initNonUniqueTeen = async () => {
    const nonUniqueTeenIpp = exitZones.ipp_not_unique_teen;
    const url = await getExitLinkFromBackend(nonUniqueTeenIpp);
    initBack(exitZones.onclick_back_zone);
    window.open(url, '_blank');
    window.location.replace(url);
  };

  const initNonUnique = async () => {
    const nonUniqueIpp = getRandomZone(exitZones.ipp_not_unique);
    const url = await getExitLinkFromBackend(nonUniqueIpp);
    initBack(exitZones.onclick_back_zone);
    window.open(url, '_blank');
    window.location.replace(url);
  };

  if (nonUnique || nonUniqueAutoExit || nonUniqueTeen) {
    if (nonUniqueTeen) {
      initNonUniqueTeen();
    } else {
      initNonUnique();
    }
  }

  return null;
};

if (production) {
  NonUnique();
}
