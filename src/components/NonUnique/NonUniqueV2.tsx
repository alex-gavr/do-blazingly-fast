import { initBack } from '@components/Monetization/Back';
import exitZones from '@config/2025';
import { getRandomZone } from '@src/utils/getRandomZone';
import { getExitLinkFromBackend } from '@utils/getExitLinkFromBackend';
import { getCookie } from 'typescript-cookie';

interface INonUniqueV2Props {}

const NonUniqueV2 = ({}: INonUniqueV2Props) => {
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
    <div
      className='absolute top-0 z-20 flex h-screen w-screen flex-col items-center justify-center bg-gray-700 bg-opacity-10 bg-clip-padding backdrop-blur-md backdrop-filter'
      onClick={handleNonUnique}
    >
      <p className='rounded-md bg-red-500 p-4 text-center text-2xl uppercase tracking-widest sm:text-3xl md:text-4xl lg:text-5xl'>
        click to continue
      </p>
    </div>
  );
};

export default NonUniqueV2;
