import extractAndReformatURLParameters from '@utils/extractAndReformatURLParameters';

// Before we redirect to an AD we push new history, so that if user decides to go back, they will be redirected to /reverse, which will open a new AD for a user :)
export const initBack = (backZone: number) => {
  const searchParams = extractAndReformatURLParameters({ intendedFor: 'frontend', zone: backZone });
  const searchParamsString = searchParams.toString();

  for (let i = 0; i < 2; i += 1) {
    window.history.pushState(null, 'Please wait...', `/back?${searchParamsString}`);
  }
};
