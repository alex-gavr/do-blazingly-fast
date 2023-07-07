import { useEffect, useState } from 'preact/hooks';
import MainExitButton from './MainExitButton';
import AutoexitConversion from './Monetization/AutoexitConversion';
import exitZones from '@config/2025';
import { getExitLinkFromBackend } from '@utils/getExitLinkFromBackend';

interface IOfferProps {}

const Offer = ({}: IOfferProps) => {
  const [mainUrl, setMainUrl] = useState<string | null>(null);
  const [popsUrl, setPopsUrl] = useState<string | null>(null);

  console.log(`mainUrl = `, mainUrl?.length);
  console.log(`popsUrl = `, popsUrl?.length);

  useEffect(() => {
    if (mainUrl === null && popsUrl === null) {
      const getMainExitUrls = async () => {
        const mainExitIpp = exitZones.ipp_main_exit[Math.floor(Math.random() * exitZones.ipp_main_exit.length)];
        const mainExitPopsIpp = exitZones.ipp_main_exit_pops[Math.floor(Math.random() * exitZones.ipp_main_exit_pops.length)];

        const main = getExitLinkFromBackend(mainExitIpp);
        const pops = getExitLinkFromBackend(mainExitPopsIpp);
        const [mainUrl, popsUrl] = await Promise.all([main, pops]);

        setMainUrl(mainUrl);
        setPopsUrl(popsUrl);
      };
      getMainExitUrls();
    }
  }, []);

  return (
    <>
      <div
        className={
          'relative z-50 flex min-h-[70vh] max-w-2xl flex-col items-center justify-center gap-4 rounded-md bg-neutral-900 px-2 py-4 md:gap-8'
        }
      >
        <h1 className={'text-2xl font-bold uppercase tracking-widest md:text-4xl'}>Thank you!</h1>
        <p className={' text-center text-sm sm:text-base md:text-xl'}>
          Your Test Result: <span className={'uppercase text-emerald-400'}>excellent</span> (35 out of 35)
        </p>
        <div className={'flex flex-col items-start justify-start gap-4'}>
          <p className={'text-sm sm:text-base md:text-lg'}>
            You are an ideal person for making money online, you may have a chance to earn MUCH MORE THAN{' '}
            <span className={'uppercase text-emerald-400'}>$5,000</span> daily!
          </p>
          <p className={' text-sm sm:text-base md:text-lg'}>
            We have selected for you <span className={'text-emerald-400'}>4 offers</span> for fast online money making.
          </p>
          <p className={' text-sm sm:text-base md:text-lg'}>Follow the instructions below and get your personal offer.</p>
          <p className={' text-sm sm:text-base md:text-lg'}>
            In 40 seconds you will be redirected to the best (<span className={'text-emerald-400'}>most profitable for you</span>) offer.
          </p>
          <p className={' text-sm sm:text-base md:text-lg'}>Click the GET OFFER button to go to the best offer immediately!</p>
        </div>
        <MainExitButton mainUrl={mainUrl ?? ''} popsUrl={popsUrl ?? ''} />
      </div>
      <AutoexitConversion mainUrl={mainUrl ?? ''} popsUrl={popsUrl ?? ''} />
    </>
  );
};

export default Offer;
