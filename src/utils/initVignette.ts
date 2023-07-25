import traverseSearchParams from './traverseSearchParams';

const initVignette = (vignetteZone: number) => {
  const readySearchParams = traverseSearchParams();

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
