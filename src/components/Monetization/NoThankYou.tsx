import { getIppIfErrorGetOnclick } from '@utils/getIppIfErrorGetOnclick';
import debug from '@utils/isDebug';
import production from '@utils/isProduction';
import type { ComponentChildren } from 'preact';
import Button, { IButtonVariants } from '../Button';

interface IProps {
  children: ComponentChildren;
  className?: string;
  variant?: IButtonVariants;
}

const NoThankYou = ({ children, className, variant }: IProps) => {
  const handleClick = async () => {
    if (production && !debug) {
      const nonUniqueIpp = 5973160;
      const noThankYouIpp = 5973161;

      const noThankYouOnclick = 5892040;
      const noThankYouPopsOnclick = 5892041;

      const noThankYouExit = getIppIfErrorGetOnclick(nonUniqueIpp, noThankYouOnclick);
      const noThankYouPops = getIppIfErrorGetOnclick(noThankYouIpp, noThankYouPopsOnclick);

      const [url, urlPops] = await Promise.all([noThankYouExit, noThankYouPops]);

      window.open(url, '_blank');
      window.location.replace(urlPops);
    } else {
      console.log('not interested pressed');
    }
  };

  return (
    <Button type='button' onClick={handleClick} variant={variant ?? 'luxurySecondary'} to='noThankYou' className={className}>
      {children}
    </Button>
  );
};

export default NoThankYou;
