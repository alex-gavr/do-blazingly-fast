const checkIfCookiesEnabled = async () => {
  if (typeof window !== 'undefined') {
    const cookieEnabled = navigator.cookieEnabled;
    if (!cookieEnabled) {
      window.location.replace('https://www.google.com');
    }
  }
};
checkIfCookiesEnabled();
