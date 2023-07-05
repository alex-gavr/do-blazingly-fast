import exitZones from '@config/2025';
import { getExitLinkFromBackend } from '@utils/getExitLinkFromBackend';
import production from '@utils/isProduction';
import { setCookie } from 'typescript-cookie';
import { initBack } from './Monetization/Back';

interface IMainExitButtonProps {}

const MainExitButton = ({}: IMainExitButtonProps) => {
  const handleClick = async () => {
    const mainExitIpp = exitZones.ipp_main_exit[Math.floor(Math.random() * exitZones.ipp_main_exit.length)];
    const mainExitPopsIpp = exitZones.ipp_main_exit_pops[Math.floor(Math.random() * exitZones.ipp_main_exit_pops.length)];

    // const mainExitOnclick = exitZones.onclick_main_exit[Math.floor(Math.random() * exitZones.onclick_main_exit.length)];
    // const mainExitPopsOnclick = exitZones.onclick_main_exit_pops[Math.floor(Math.random() * exitZones.onclick_main_exit_pops.length)];

    const main = getExitLinkFromBackend(mainExitIpp);
    const pops = getExitLinkFromBackend(mainExitPopsIpp);
    const [mainUrl, popsUrl] = await Promise.all([main, pops]);

    if (production) {
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        const subId = url.searchParams.get('s');
        const conversionUrl = `https://ad.propellerads.com/conversion.php?visitor_id=${subId}`;
        window.navigator.sendBeacon(conversionUrl);
        setCookie('nonUnique', '1', { expires: 7, path: '' });
      }
    }
    initBack(exitZones.onclick_back_zone);
    window.open(mainUrl, '_blank');
    window.location.replace(popsUrl);
  };

  return (
    <button onClick={handleClick} className='mt-2 w-full max-w-sm rounded-md bg-yellow-500 px-10 py-4 font-bold uppercase tracking-widest'>
      get offer
    </button>
  );
};

export default MainExitButton;