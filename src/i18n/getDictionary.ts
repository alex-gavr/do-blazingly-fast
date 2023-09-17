import type { TValidLocale, TValidOffer, locales, offers } from '@config/globalConfig';

const dictionaries: Record<(typeof offers)[number], Record<(typeof locales)[number], () => Promise<any>>> = {
  0: {
    en: () => import('@i18n/2025/en').then((module) => module.default),
    id: () => import('@i18n/2025/id').then((module) => module.default),
    th: () => import('@i18n/2025/th').then((module) => module.default),
    tl: () => import('@i18n/2025/tl').then((module) => module.default),
    de: () => import('@i18n/2025/de').then((module) => module.default),
    es: () => import('@i18n/2025/es').then((module) => module.default),
    fr: () => import('@i18n/2025/fr').then((module) => module.default),
    it: () => import('@i18n/2025/it').then((module) => module.default),
    pt: () => import('@i18n/2025/pt').then((module) => module.default),
  },
  10864: {
    en: () => import('@i18n/10864/en').then((module) => module.default),
    id: () => import('@i18n/10864/id').then((module) => module.default),
    th: () => import('@i18n/10864/th').then((module) => module.default),
    tl: () => import('@i18n/10864/tl').then((module) => module.default),
    de: () => import('@i18n/10864/de').then((module) => module.default),
    es: () => import('@i18n/10864/es').then((module) => module.default),
    fr: () => import('@i18n/10864/fr').then((module) => module.default),
    it: () => import('@i18n/10864/it').then((module) => module.default),
    pt: () => import('@i18n/10864/pt').then((module) => module.default),
  },
};

export const getDictionary = async (offer: TValidOffer, locale: TValidLocale) => {
  const dictionary = await dictionaries[offer][locale]();
  return dictionary;
};
