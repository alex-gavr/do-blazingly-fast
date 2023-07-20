import { initBack } from '@components/Monetization/Back';
import exitZones from '@config/2025';
import makeExitUrl, { ExitType } from '@utils/makeExitUrl';

window.onerror = (message, url, line, column, error) => {
  console.error(error, message, url, line, column);
  const FALLBACK = 5812355;
  const fallbackUrl = makeExitUrl(FALLBACK, ExitType.onclick);
  initBack(exitZones.onclick_back_zone);
  window.location.replace(fallbackUrl);
};
