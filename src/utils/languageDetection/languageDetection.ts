import langParser from 'accept-language-parser';

import { type TValidLocale, defaultLocale, uniqueLanguages } from '@config/globalConfig';

type TLocaleSource = {
  locale: TValidLocale;
};

export const getLocalePartsFrom = ({ locale }: TLocaleSource) => {
  const localeParts = locale?.toLowerCase().split('-');
  const lang = localeParts ? localeParts[0] : defaultLocale;
  return {
    lang,
  };
};

export const findBestMatchingLocale = (acceptLangHeader: string) => {
  // parse the locales acceptable in the header, and sort them by priority (q)
  const parsedLangs = langParser.parse(acceptLangHeader);

  const filteredLangs = parsedLangs.map((lang) => {
    return { locale: lang.code };
  });

  const matchedLanguage = uniqueLanguages.find((locale) => {
    const { lang } = getLocalePartsFrom({ locale });
    return filteredLangs.find((filteredLang) => filteredLang.locale === lang);
  });

  if (matchedLanguage) {
    return matchedLanguage;
  } else {
    return defaultLocale;
  }
};
