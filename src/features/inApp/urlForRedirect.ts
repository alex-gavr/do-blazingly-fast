import inAppRedirect from './redirect';

const inAppUrlForRedirect = (curPageParams: string, typeApp: string | number) => {
  const currentPageUrl: string = `//${window.location.host}${window.location.pathname || ''}${window.location.search}${curPageParams || ''}`;

  let InAppTB: number | string = 5896608;

  inAppRedirect(currentPageUrl, InAppTB, typeApp);
};

export default inAppUrlForRedirect;
