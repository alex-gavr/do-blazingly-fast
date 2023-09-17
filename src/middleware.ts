import langParser from 'accept-language-parser';
import { defineMiddleware } from 'astro/middleware';
import { defaultLocale, locales } from './config/globalConfig';
import type { TValidLocale } from './config/globalConfig';

// // const BLOCKED_COUNTRY = 'PH';

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

const findBestMatchingLocale = (acceptLangHeader: string) => {
  // parse the locales acceptable in the header, and sort them by priority (q)
  const parsedLangs = langParser.parse(acceptLangHeader);

  const filteredLangs = parsedLangs.map((lang) => {
    return { locale: lang.code };
  });

  const matchedLanguage = locales.find((locale) => {
    const { lang } = getLocalePartsFrom({ locale });
    return filteredLangs.find((filteredLang) => filteredLang.locale === lang);
  });

  if (matchedLanguage) {
    return matchedLanguage;
  } else {
    return defaultLocale;
  }
};

function changeLocaleInURL(url: string, newValue: string) {
  const newUrl = new URL(url);
  const langPathname = newUrl.pathname.split('/')[2];

  const currentLocale = langPathname;
  const newLocale = `${newValue}`;

  return url.replace(currentLocale, newLocale);
}

// `context` and `next` are automatically typed
export const onRequest = defineMiddleware((context, next) => {
  const langPathname = context.url.pathname.split('/')[2];

  if (context.url.pathname.length === 1) {
    return next();
  } else {
    const getLocale = () => {
      const matchedLocale = findBestMatchingLocale(context.request.headers.get('Accept-Language') || defaultLocale);
      return matchedLocale;
    };

    const language = getLocale();

    if (language === 'en') {
      return next();
    }
    if (language === langPathname) {
      return next();
    } else {
      const resUrl = changeLocaleInURL(context.request.url, language);
      return Response.redirect(resUrl);
    }
  }
});
