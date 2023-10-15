import { initBack } from '@monetization/Back';

import makeExitUrl, { ExitType } from '@utils/linksHelpers/makeExitUrl';
import makeExitUrlFromUrl, { UrlType } from '@utils/linksHelpers/makeExitUrlFromUrl';
import storageService from '@utils/storageService';

type ZoneType = number | string;
type AppType = string | number;

const intentLink = (url: string): string => {
  const strippedUrl = url.replace(/^(http(s)?(:)?)?\/\//, '');
  return `intent://${strippedUrl}#Intent;scheme=https;package=com.android.chrome;end`;
};

/**
 * Prepare and open an intent link from the specified URL and traffic back zone.
 *
 * @param url - The current page URL.
 * @param zone - The traffic back zone for redirecting in the webview.
 * @param typeApp - The type of the app (e.g., 'fb' for Facebook).
 */
const inAppRedirect = (url: string, zone: ZoneType, typeApp: AppType): void => {
  window.onbeforeunload = null;

  const replacedUrl = makeExitUrlFromUrl(url, UrlType.onclick);
  const replacedZone = makeExitUrl(zone, ExitType.onclick);
  const intent = intentLink(replacedUrl);
  const isInAppClicked: boolean = Boolean(storageService.get('clickInApp'));

  initBack();

  const isFacebookApp = typeApp === 'fb';

  if (isFacebookApp) {
    if (isInAppClicked) {
      window.location.replace(replacedZone);
    } else {
      window.open(intent, '_system');
      setTimeout(() => window.location.replace(replacedZone), 250);
    }
  } else {
    setTimeout(() => (document.location.href = replacedZone), 1000);
    document.location.href = intent;
  }
};

export default inAppRedirect;
