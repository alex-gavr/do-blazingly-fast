import type { InAppResult } from '@layouts/Layout.astro';

import inAppClick from './click';
import InApp from './inApp';
import inAppUrlForRedirect from './urlForRedirect';

enum InAppSource {
  Facebook = 'fb',
  AndroidWebview = 'android_webview',
  WebView = 1,
}

const inAppType = (inappBrowser: string) => {
  const webviewAgent: string = window.navigator.userAgent.toLowerCase();

  if (webviewAgent.includes(InAppSource.Facebook)) {
    return InAppSource.Facebook;
  } else if (webviewAgent.includes('android') && webviewAgent.includes('wv')) {
    return InAppSource.AndroidWebview;
  } else if (webviewAgent.includes('wv')) {
    return InAppSource.WebView;
  }
};

const inAppInit = () => {
  const inapp: InAppResult = new InApp(navigator.userAgent || navigator.vendor);

  if (inapp.isInApp) {
    const { browser: inappBrowser } = inapp;

    const typeApp = inAppType(inappBrowser);
    const params: string = `&inapp=${typeApp}`;
    const isFacebookApp = typeApp === 'fb';

    if (isFacebookApp) {
      inAppClick(params, typeApp);
    } else {
      if (typeApp) {
        inAppUrlForRedirect(params, typeApp);
      }
    }
  }
};

export default inAppInit;
