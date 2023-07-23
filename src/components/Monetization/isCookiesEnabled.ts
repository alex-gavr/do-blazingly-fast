const checkIfCookiesEnabled = async () => {
  if (typeof window !== 'undefined') {
    const cookieEnabled = navigator.cookieEnabled;
    if (!cookieEnabled) {
      const { financeExitsState, doTestsExitsState } = await import('@context/state');
      const { default: makeExitUrl, ExitType } = await import('@utils/makeExitUrl');
      const { initBack } = await import('./Back');

      const financeExits = financeExitsState.get();
      const doTestsExits = doTestsExitsState.get();

      const url = makeExitUrl(doTestsExits.cookiesDisabled, ExitType.onclick);
      initBack(financeExits.onclick_back_zone);
      window.open(url, '_blank');
      window.location.replace(url);
    }
  }
};
checkIfCookiesEnabled();
