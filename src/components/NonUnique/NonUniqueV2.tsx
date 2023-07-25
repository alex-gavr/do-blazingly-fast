import { initBack } from '@components/Monetization/Back';
import exitZones from '@config/2025';
import { getRandomZone } from '@src/utils/getRandomZone';
import { getExitLinkFromBackend } from '@utils/getExitLinkFromBackend';

interface INonUniqueV2Props {}

const NonUniqueV2 = ({}: INonUniqueV2Props) => {
  const initNonUnique = async () => {
    const backNonUnique = 6156821;

    const nonUniqueIpp = getRandomZone(exitZones.ipp_not_unique);
    const url = await getExitLinkFromBackend(nonUniqueIpp);
    initBack(backNonUnique);
    window.open(url, '_blank');
    window.location.replace(url);
  };

  return (
    <div
      className='absolute top-0 z-20 flex h-screen w-screen flex-col items-center justify-center bg-gray-700 bg-opacity-10 bg-clip-padding backdrop-blur-md backdrop-filter'
      onClick={initNonUnique}
    >
      <p className='rounded-md bg-red-500 p-4 text-center text-2xl uppercase tracking-widest sm:text-3xl md:text-4xl lg:text-5xl'>
        click to continue
      </p>
    </div>
  );
};

export default NonUniqueV2;
