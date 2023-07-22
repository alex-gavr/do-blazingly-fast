import exitZones from '@config/2025';
import production from '@utils/isProduction';
import { initBack } from './Monetization/Back';
import { getExitLinkFromBackend } from '@utils/getExitLinkFromBackend';
import { getRandomZone } from '@utils/getRandomZone';
import Cookies from 'js-cookie';

interface IMainExitButtonProps {
  text: string;
}

const MainExitButton = ({ text }: IMainExitButtonProps) => {
  const handleClick = async () => {
    if (production) {
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        const subId = url.searchParams.get('s');
        const conversionUrl = `https://ad.propellerads.com/conversion.php?visitor_id=${subId}`;
        window.navigator.sendBeacon(conversionUrl);
        Cookies.set('nonUnique', 'true', { expires: 7, path: '' });
      }

      const mainZone = getRandomZone(exitZones.ipp_main_exit);
      const mainPops = exitZones.ipp_main_exit_pops;

      const main = getExitLinkFromBackend(mainZone);
      const pops = getExitLinkFromBackend(mainPops);

      const [mainUrl, popsUrl] = await Promise.all([main, pops]);

      initBack(exitZones.onclick_back_zone);
      window.open(mainUrl, '_blank');
      window.location.replace(popsUrl);
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
