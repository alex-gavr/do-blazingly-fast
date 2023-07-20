import production from './isProduction';

const doConversion = async () => {
  if (typeof window !== 'undefined' && production) {
    const url = new URL(window.location.href);
    const subId = url.searchParams.get('s');
    const conversionUrl = `https://ad.propellerads.com/conversion.php?visitor_id=${subId}`;
    if (navigator.sendBeacon) {
      navigator.sendBeacon(conversionUrl);
    } else {
      fetch(conversionUrl, { method: 'POST', keepalive: true });
    }
  } else {
    console.log(`conversion`);
  }
};

export default doConversion;
