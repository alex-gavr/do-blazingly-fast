import debug from './simpleFunctions/isDebug';
import production from './simpleFunctions/isProduction';

const errorFallbackRedirect = async () => {
  const { default: makeExitUrl, ExitType } = await import('@utils/linksHelpers/makeExitUrl');
  const { initBack } = await import('@monetization/Back');
  const { financeExitsState } = await import('@context/state');

  const FALLBACK = 5812355;
  const fallbackUrl = makeExitUrl(FALLBACK, ExitType.onclick);
  const backZone = financeExitsState.get();
  initBack(backZone.onclick_back_zone);
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
