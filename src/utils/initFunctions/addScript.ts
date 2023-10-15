const addScript = (scriptSrc: string, cb?: () => void) => {
  try {
    if (scriptSrc) {
      const scr: HTMLScriptElement = document.createElement('script');

      scr.src = scriptSrc;
      scr.type = 'text/javascript';
      scr.async = true;
      scr.onload = () => {
        console.log(`script ${scriptSrc} loaded`);
        if (cb) {
          cb();
        }
      };
      document.head.appendChild(scr);
    }
  } catch (error) {
    console.log(error);
  }
};

export default addScript;
