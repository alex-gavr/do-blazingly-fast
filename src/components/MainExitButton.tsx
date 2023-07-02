import exitZones from '@config/2025';
import getExitLinkWithMediation from '@utils/getExitLinkWithMediation';

interface IMainExitButtonProps {}

const MainExitButton = ({}: IMainExitButtonProps) => {

  const handleClick = async () => {
    const mainExitIpp = exitZones.ipp_main_exit[Math.floor(Math.random() * exitZones.ipp_main_exit.length)];
    const mainExitPopsIpp = exitZones.ipp_main_exit_pops[Math.floor(Math.random() * exitZones.ipp_main_exit_pops.length)];

    const mainExitOnclick = exitZones.onclick_main_exit[Math.floor(Math.random() * exitZones.onclick_main_exit.length)];
    const mainExitPopsOnclick = exitZones.onclick_main_exit_pops[Math.floor(Math.random() * exitZones.onclick_main_exit_pops.length)];

    const main = getExitLinkWithMediation(mainExitIpp, mainExitOnclick);
    const pops = getExitLinkWithMediation(mainExitPopsIpp, mainExitPopsOnclick);
    const [mainUrl, popsUrl] = await Promise.all([main, pops]);

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
