import { useStore } from '@nanostores/preact';
import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';
import type { JSX } from 'preact';
import { setCookie } from 'typescript-cookie';

import { currentStepState, doTestsExitsState, financeExitsState } from '@context/state';

import { useClientSearchParams } from '@hooks/useClientSearchParams';

import { cn } from '@utils/cn';
import doConversion from '@utils/doConversion';
import fetchAndOpenUrls from '@utils/linksHelpers/fetchAndOpenUrls';
import { getExitLinkFromBackendWithRotationInMarker } from '@utils/linksHelpers/getExitLinkFromBackendWithRotationInMarker';
import { getIppIfErrorGetOnclick } from '@utils/linksHelpers/getIppIfErrorGetOnclick';
import { getRandomZone } from '@utils/simpleFunctions/getRandomZone';
import getSearchParams from '@utils/simpleFunctions/getSearchParams';
import debug from '@utils/simpleFunctions/isDebug';
import production from '@utils/simpleFunctions/isProduction';

export type IExitsTypes =
  | 'mainExit'
  | 'mainPops'
  | 'teenExit'
  | 'teenPops'
  | 'autoExit'
  | 'reverse'
  | 'backButton'
  | 'nonUniqueExit'
  | 'accessAutoExit'
  | 'photoExit'
  | 'noThankYou'
  | 'motivatedYes'
  | 'noThankYouPops';

export type IButtonExits = Exclude<IExitsTypes, 'autoExit' | 'reverse' | 'nonUniqueExit' | 'accessAutoExit' | 'photoExit'>;

const buttonVariants = cva(
  'active:scale-95 tracking-widest min-w-[120px] inline-flex items-center justify-center rounded-md text-xs sm:text-base transition-colors duration-500 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-slate-900 text-white hover:bg-slate-800',
        primary: 'bg-indigo-800 text-slate-50 hover:bg-cyan-500',
        secondary: 'border bg-indigo-50 border-neutral-800 bg-transparent text-gray-950',
        success: 'bg-emerald-600 text-neutral-50 hover:bg-emerald-300 hover:text-neutral-900',
        successSecondary: 'border border-emerald-600 text-neutral-900',
        danger: 'bg-red-700 text-neutral-50 hover:bg-red-600 hover:text-neutral-50',
        luxury: 'bg-purple-900 text-slate-50 border border-purple-700 hover:bg-purple-800 hover:border-purple-600 hover:shadow-xl',
        luxurySecondary: 'border border-purple-800 text-slate-900 hover:bg-purple-900 hover:text-slate-50',
        backButton: 'border border-red-300 bg-neutral-900 text-gray-200 hover:bg-gray-950 hover:text-gray-100',
        lazada: 'bg-gradient-to-r from-red-600 to-amber-500 text-neutral-100 border border-neutral-400',
        lazadaSecondary: 'border bg-gradient-to-r from-sky-200 to-indigo-200 border-slate-500 text-neutral-900 uppercase',
      },
      buttonSize: {
        default: 'p-4',
        sm: 'p-2',
        lg: 'px-6 py-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      buttonSize: 'default',
    },
  },
);

type IButtonStyles = VariantProps<typeof buttonVariants>;
export type IButtonVariants = IButtonStyles['variant'];
interface IButtonProps extends JSX.HTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  to: IButtonExits | 'beginSurvey' | 'nextQuestion' | 'thankYouPage';
  isLoading?: boolean;
}

const Button = ({ children, type, variant, disabled, buttonSize, className, to, ...props }: IButtonProps) => {
  const financeExits = useStore(financeExitsState);
  const doTestsExits = useStore(doTestsExitsState);

  // console.log('🚀 ~ financeExitsState:', financeExitsState);
  const { offerId } = useClientSearchParams();
  const oldSearchParams = getSearchParams();

  const handleClick = async () => {
    if (to === 'beginSurvey') {
      window.location.replace(`/survey${oldSearchParams}`);
    }
    if (to === 'nextQuestion') {
      currentStepState.set(currentStepState.get() + 1);
      // dispatch({ type: ActionsType.incrementStep });
    }
    if (to === 'teenExit') {
      // ONLY FOR SHOPPING SURVEY TESTING
      if (offerId === 10864) {
        if (production) {
          // const [url, urlPops] = await Promise.all([teenExit, teenPops]);
          const teenZoneMain = getRandomZone(financeExits.ipp_teen);

          const teenExit = getExitLinkFromBackendWithRotationInMarker(teenZoneMain);
          const teenPops = getExitLinkFromBackendWithRotationInMarker(financeExits.ipp_teen_pops);

          await fetchAndOpenUrls([teenExit, teenPops]);
        } else {
          console.log('shopping survey teen exit');
        }
      } else {
        if (production) {
          const teenExit = getIppIfErrorGetOnclick(doTestsExits.teenExitIpp, doTestsExits.teenExit);
          const teenPops = getIppIfErrorGetOnclick(doTestsExits.teenPopsIpp, doTestsExits.teenPops);

          await fetchAndOpenUrls([teenExit, teenPops]);
        } else {
          console.log('teen exit');
        }
      }
    }
    if (to === 'thankYouPage') {
      window.location.replace(`/thank-you${oldSearchParams}`);
    }

    if (to === 'mainExit') {
      if (offerId === 10864) {
        doConversion();
        const mainExitZone = getRandomZone(financeExits.ipp_main_exit);

        const mainExit = getExitLinkFromBackendWithRotationInMarker(mainExitZone);
        const mainPops = getExitLinkFromBackendWithRotationInMarker(financeExits.ipp_main_exit_pops);

        await fetchAndOpenUrls([mainExit, mainPops]);
      } else {
        const mainExit = getIppIfErrorGetOnclick(doTestsExits.mainExitIpp, doTestsExits.mainExit);
        const mainPops = getIppIfErrorGetOnclick(doTestsExits.mainPopsIpp, doTestsExits.mainPops);

        !debug && setCookie('nonUnique', 'true', { path: '/', expires: 7, secure: true });
        await fetchAndOpenUrls([mainExit, mainPops]);
      }
    }
  };

  return (
    <button type={type} onClick={handleClick} disabled={disabled} className={cn(buttonVariants({ variant, buttonSize, className }))} {...props}>
      {children}
    </button>
  );
};

export default Button;
