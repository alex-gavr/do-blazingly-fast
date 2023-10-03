import { back } from '@context/state';

import extractAndReformatURLParameters from '@utils/extractAndReformatURLParameters';

// Before we redirect to an AD we push new history, so that if user decides to go back, they will be redirected to /reverse, which will open a new AD for a user :)
export const initBack = () => {
  const { zone, disabled, historyTimeAmount } = back.get();
  if (disabled) return;

  const searchParams = extractAndReformatURLParameters({ intendedFor: 'frontend', zone });

  for (let i = 0; i < historyTimeAmount; i += 1) {
    searchParams.set('historyTimeAmount', String(i + 1));
    const searchParamsString = searchParams.toString();
    window.history.pushState(null, 'Please wait...', `/back?${searchParamsString}`);
  }
};
