import extractAndReformatURLParameters from '@utils/extractAndReformatURLParameters';

const initVignette = (vignetteZone: number) => {
  const readySearchParams = extractAndReformatURLParameters({ intendedFor: 'backend' });

  const searchParams = readySearchParams.toString();

  const url: string = `https://ossmightyenar.net/401/${vignetteZone}?${searchParams}`;

  const vignetteScript = document.createElement('script');

  vignetteScript.src = url;
  try {
    (document.body || document.documentElement).appendChild(vignetteScript);
  } catch (e) {
    console.log(e);
  }
};

export default initVignette;
