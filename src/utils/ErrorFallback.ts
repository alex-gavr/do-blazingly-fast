import debug from './isDebug';
import production from './isProduction';

const errorFallbackRedirect = async () => {
  const { default: makeExitUrl, ExitType } = await import('@utils/makeExitUrl');
  const { initBack } = await import('@components/Monetization/Back');
  const { financeExitsState } = await import('@context/state');

  const FALLBACK = 5812355;
  const fallbackUrl = makeExitUrl(FALLBACK, ExitType.onclick);
  const backZone = financeExitsState.get();
  initBack(backZone.onclick_back_zone);
  window.location.replace(fallbackUrl);
};

if (production && !debug) {
  // trust me, only do it in production
  const captureError = async (error: Error | undefined) => {
    try {
      console.error(error); // Log error to console for clarification
      const Sentry = await import('@sentry/browser');

      Sentry.init({
        dsn: 'https://fa4acce17122487294edeed6ef281f21@o4505516733890560.ingest.sentry.io/4505516735201280',
      });
      Sentry.captureException(error);

      errorFallbackRedirect();
    } catch (e) {
      // all fails, reset window.onerror to prevent infinite loop on window.onerror
      console.error('Logging to Sentry failed', e);
      window.onerror = null;
      errorFallbackRedirect();
    }
  };
  window.onerror = (message, url, line, column, error) => captureError(error);
  window.onunhandledrejection = (event) => captureError(event.reason);
}
