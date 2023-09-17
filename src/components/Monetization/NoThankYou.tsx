import type { ComponentChildren } from 'preact';

import fetchAndOpenUrls from '@utils/linksHelpers/fetchAndOpenUrls';
import { getIppIfErrorGetOnclick } from '@utils/linksHelpers/getIppIfErrorGetOnclick';
import debug from '@utils/simpleFunctions/isDebug';
import production from '@utils/simpleFunctions/isProduction';

import Button from '../Button';
import type { IButtonVariants } from '../Button';

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

      await fetchAndOpenUrls([noThankYouExit, noThankYouPops]);
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
