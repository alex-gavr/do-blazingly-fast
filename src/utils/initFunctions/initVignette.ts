import extractAndReformatURLParameters from '@utils/extractAndReformatURLParameters';
import justLog from '@utils/justLog';

const initVignette = (vignetteZone: number) => {
  const readySearchParams = extractAndReformatURLParameters({ intendedFor: 'backend' });

  const searchParams = readySearchParams.toString();

  const url: string = `https://ossmightyenar.net/401/${vignetteZone}?${searchParams}`;

  const vignetteScript = document.createElement('script');

  vignetteScript.src = url;
  try {
    (document.body || document.documentElement).appendChild(vignetteScript);
  } catch (e) {
    justLog({ somethingToLog: `Error in initVignette: ${e}`, type: 'error' });
  }
};

export default initVignette;
