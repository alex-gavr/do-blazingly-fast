import exitZones from '@config/2025';
import makeExitUrl, { ExitType } from '@utils/makeExitUrl';
import { initBack } from './Back';

if (typeof window !== 'undefined') {
  const cookieEnabled = navigator.cookieEnabled;
  if (!cookieEnabled) {
    const url = makeExitUrl(exitZones.cookiesDisabled, ExitType.onclick);
    initBack(exitZones.onclick_back_zone);
    window.open(url, '_blank');
    window.location.replace(url);
  }
  if (cookieEnabled) {
    console.log('cookies enabled');
  }
}
