import exitZones from '@config/2025';

import doConversion from '@utils/doConversion';
import fetchAndOpenUrls from '@utils/fetchAndOpenUrls';
import { getExitLinkFromBackend } from '@utils/getExitLinkFromBackend';
import { getRandomZone } from '@utils/getRandomZone';
import production from '@utils/isProduction';
import openUrlInNewTab from '@utils/openUrlInNewTab';

import { initBack } from './Monetization/Back';

interface IMainExitButtonProps {
  text: string;
}

const MainExitButton = ({ text }: IMainExitButtonProps) => {
  const handleClick = async () => {
    if (production) {
      doConversion();

      const mainZone = getRandomZone(exitZones.ipp_main_exit);
      const mainPops = exitZones.ipp_main_exit_pops;

      const main = getExitLinkFromBackend(mainZone);
      const pops = getExitLinkFromBackend(mainPops);

      initBack(exitZones.onclick_back_zone);
      await fetchAndOpenUrls([main, pops]);
    } else {
      console.log('button click with conversion');
    }
  };

  return (
    <button onClick={handleClick} className='mt-2 w-full max-w-sm rounded-md bg-yellow-500 px-10 py-4 font-bold uppercase tracking-widest'>
      {text}
    </button>
  );
};

export default MainExitButton;
