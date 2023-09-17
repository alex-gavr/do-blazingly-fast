import justLog from '@utils/justLog';

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
    justLog({ text: `Error in initAdsterraSocialBar: ${e}`, type: 'error' });
  }
};

export default initAdsterraSocialBar;
