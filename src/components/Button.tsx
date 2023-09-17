import { useStore } from '@nanostores/preact';
import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';
import type { JSX } from 'preact';

import { currentStepState, doTestsExitsState, financeExitsState } from '@context/state';

import { cn } from '@utils/cn';
import executeExitFlow from '@utils/executeExitFlow';
import { LeadsTo } from '@utils/getSurveyDataTexts';
import justLog from '@utils/justLog';
import { getRandomZone } from '@utils/simpleFunctions/getRandomZone';
import getSearchParams from '@utils/simpleFunctions/getSearchParams';
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
        default: 'bg-slate-900 text-white hover:bg-slate-800 hover:text-slate-200',
        finance: 'bg-yellow-500 text-black hover:bg-yellow-400 hover:text-black',
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
      padding: {
        default: 'px-4 py-2',
        sm: 'p-2',
        wider: 'px-6 py-2',
        widest: 'px-8 py-2',
        bigger: 'px-6 py-4',
        biggest: 'px-8 py-6',
      },
      fontSize: {
        default: 'text-xs sm:text-base md:text-lg lg:text-xl xl:text-2xl',
        base: 'text-xs sm:text-sm md:text-base',
        large: 'text-xs sm:text-sm md:text-base lg:text-lg',
        xl: 'text-xs sm:text-base md:text-lg lg:text-xl',
        '2xl': 'text-xs sm:text-base md:text-lg lg:text-xl xl:text-2xl',
      },
      rounded: {
        default: 'rounded-md',
        none: 'rounded-none',
        sm: 'rounded-sm',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        '2xl': 'rounded-2xl',
        '3xl': 'rounded-3xl',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'default',
      rounded: 'default',
      fontSize: 'default',
    },
  },
);

type IButtonStyles = VariantProps<typeof buttonVariants>;
export type IButtonVariants = IButtonStyles['variant'];
interface IButtonProps extends JSX.HTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  to: IButtonExits | 'beginSurvey' | 'nextQuestion' | 'thankYouPage' | 'toAssessment';
  back?: boolean;
  isLoading?: boolean;
  teenIppZones?: number[];
  mainExitIppZones?: number[];
  mainExitOnclickZones?: number[];
}

const Button = ({ type, children, onClick, disabled, className, variant, padding, rounded, back, loading, fontSize, to, ...props }: IButtonProps) => {
  const financeExits = useStore(financeExitsState);
  const doTestsExits = useStore(doTestsExitsState);

  const oldSearchParams = getSearchParams();

  const handleClick = async () => {
    if (to === LeadsTo.beginSurvey) {
      window.location.replace(`/survey${oldSearchParams}`);
    }
    if (to === LeadsTo.nextQuestion) {
      currentStepState.set(currentStepState.get() + 1);
    }
    if (to === LeadsTo.teenExit) {
      if (production) {
        await executeExitFlow({
          type: 'withRotationInMarker',
          ippZones: [getRandomZone(financeExits.ipp_teen), financeExits.ipp_teen_pops],
        });
      } else {
        justLog({ text: 'teen exit', type: 'info' });
      }
    }
    if (to === LeadsTo.thankYouPage) {
      window.location.replace(`/thank-you${oldSearchParams}`);
    }
    if (to === LeadsTo.toAssessment) {
      const url = new URL(window.location.href);
      if (url.pathname.endsWith('/')) {
        url.pathname += 'assessment';
      } else {
        url.pathname += '/assessment';
      }
      window.location.href = url.href;
    }

    if (to === LeadsTo.mainExit) {
      // TODO: for now it's like that
      const zonesInMarker = true;
      if (zonesInMarker) {
        await executeExitFlow({
          type: 'withRotationInMarker',
          ippZones: [getRandomZone(financeExits.ipp_main_exit), financeExits.ipp_main_exit_pops],
          executeConversion: true,
        });
      } else {
        await executeExitFlow({
          type: 'noRotationInMarker',
          ippZones: [doTestsExits.mainExitIpp, doTestsExits.mainExit],
          onclickZones: [doTestsExits.mainPopsIpp, doTestsExits.mainPops],
          executeConversion: true,
        });
      }
    }
  };

  return (
    <button
      type={type}
      onClick={back ? () => history.back() : handleClick}
      disabled={disabled}
      className={cn(buttonVariants({ variant, padding, rounded, fontSize, className }))}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
