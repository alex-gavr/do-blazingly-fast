const initAdsterraSocialBar = (url: string) => {
  const adsterraScript = document.createElement('script');

  adsterraScript.src = url;
  adsterraScript.async = true;

  adsterraScript.onerror = (error) => {
    console.error(error);
  };

  try {
    (document.body || document.documentElement).appendChild(adsterraScript);
  } catch (e) {
    console.log(e);
  }
};

export default initAdsterraSocialBar;
