import type { ComponentChildren } from 'preact';

import executeExitFlow from '@utils/executeExitFlow';
import justLog from '@utils/justLog';
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
      const noThankYouIpp = 5973161;

      const noThankYouOnclick = 5892040;
      const noThankYouPopsOnclick = 5892041;

      await executeExitFlow({
        type: 'noRotationInMarker',
        ippZones: [noThankYouIpp, noThankYouIpp],
        onclickZones: [noThankYouOnclick, noThankYouPopsOnclick],
      });
    } else {
      justLog({ somethingToLog: 'not interested pressed', type: 'log' });
    }
  };

  return (
    <Button type='button' onClick={handleClick} variant={variant ?? 'luxurySecondary'} to='noThankYou' className={className}>
      {children}
    </Button>
  );
};

export default NoThankYou;
