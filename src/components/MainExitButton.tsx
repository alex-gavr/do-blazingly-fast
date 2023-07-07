import exitZones from '@config/2025';
import production from '@utils/isProduction';
import { setCookie } from 'typescript-cookie';
import { initBack } from './Monetization/Back';
import makeExitUrl, { ExitType } from '@utils/makeExitUrl';

interface IMainExitButtonProps {
  mainUrl: string;
  popsUrl: string;
}

const MainExitButton = ({ mainUrl, popsUrl }: IMainExitButtonProps) => {
  const handleClick = () => {
    if (mainUrl.length > 1) {
      if (production) {
        if (typeof window !== 'undefined') {
          const url = new URL(window.location.href);
          const subId = url.searchParams.get('s');
          const conversionUrl = `https://ad.propellerads.com/conversion.php?visitor_id=${subId}`;
          window.navigator.sendBeacon(conversionUrl);
          setCookie('nonUnique', '1', { expires: 7, path: '' });
        }
        initBack(exitZones.onclick_back_zone);
        window.open(mainUrl, '_blank');
        window.location.replace(popsUrl);
      } else {
        console.log('button click with conversion');
        console.log(`mainUrl = `, mainUrl);
        console.log(`popsUrl = `, popsUrl);
      }
    } else {
      console.error('Main url is empty, fallback on onclick');
      const url = makeExitUrl(exitZones.onclick_main_exit[0], ExitType.onclick);
      initBack(exitZones.onclick_back_zone);
      window.open(url, '_blank');
      window.location.replace(url);
    }
  };

  return (
    <button onClick={handleClick} className='mt-2 w-full max-w-sm rounded-md bg-yellow-500 px-10 py-4 font-bold uppercase tracking-widest'>
      get offer
    </button>
  );
};

export default MainExitButton;
