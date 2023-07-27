import { initBack } from '@components/Monetization/Back';
import exitZones from '@config/2025';
import { getRandomZone } from '@src/utils/getRandomZone';
import { getExitLinkFromBackend } from '@utils/getExitLinkFromBackend';
import { getCookie } from 'typescript-cookie';
import Captcha from './Captcha';
import PushWindow from './PushWindow';

interface INonUniqueV2Props {}

const NonUniqueV2 = ({}: INonUniqueV2Props) => {
  const url = new URL(window.location.href);
  const abtestParam = url.searchParams.get('abtest') || undefined;

  const nonUniqueTeen = getCookie('nonUniqueTeen') ?? false;
  const nonUniqueTeenDo = getCookie('lead-teenage') ?? false;
  const nonUniqueCrossTeenDo = getCookie('lead-teenage-cross') ?? false;

  const initNonUnique = async () => {
    const backNonUnique = 6156821;
    const nonUniqueIpp = getRandomZone(exitZones.ipp_not_unique);
    const url = await getExitLinkFromBackend(nonUniqueIpp);

    initBack(backNonUnique);
    window.open(url, '_blank');
    window.location.replace(url);
  };

  const initNonUniqueTeen = async () => {
    const backNonUnique = 6156821;
    const nonUniqueTeenIpp = exitZones.ipp_not_unique_teen;
    const url = await getExitLinkFromBackend(nonUniqueTeenIpp);

    initBack(backNonUnique);
    window.open(url, '_blank');
    window.location.replace(url);
  };

  const handleNonUnique = () => {
    if (nonUniqueTeen || nonUniqueTeenDo || nonUniqueCrossTeenDo) {
      initNonUniqueTeen();
    } else {
      initNonUnique();
    }
  };

  return (
    <>
      {abtestParam === '270769111' && <Captcha handleNonUnique={handleNonUnique} />}
      {abtestParam === '270769222' && <PushWindow handleNonUnique={handleNonUnique} />}
    </>
  );
};

export default NonUniqueV2;
