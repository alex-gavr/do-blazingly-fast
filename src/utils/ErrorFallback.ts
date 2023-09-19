import { initBack } from '@monetization/Back';

import { errorFallBackZone } from '@context/state';

import makeExitUrl, { ExitType } from '@utils/linksHelpers/makeExitUrl';

import debug from './simpleFunctions/isDebug';
import production from './simpleFunctions/isProduction';

const errorFallbackRedirect = async () => {
  const errorFallback = errorFallBackZone.get();
  const fallbackUrl = makeExitUrl(errorFallback, ExitType.onclick);

  initBack();
  window.location.replace(fallbackUrl);
};

if (production && !debug) {
  const captureError = async (error: Error | undefined) => {
    try {
      console.error(error);
      const Sentry = await import('@sentry/browser');

      Sentry.init({
        dsn: import.meta.env.PUBLIC_SENTRY,
        release: '1.0.0',
        tracesSampleRate: 1.0,
      });
      Sentry.captureException(error);

      errorFallbackRedirect();
    } catch (e) {
      console.error('Logging to Sentry failed', e);
      window.onerror = null;
      errorFallbackRedirect();
    }
  };
  window.onerror = (message, url, line, column, error) => captureError(error);
  window.onunhandledrejection = (event) => captureError(event.reason);
}
