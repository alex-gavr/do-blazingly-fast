import type { TDefaultDictionary } from '@i18n/2025/en';
import type { TValidLocale, locales } from 'src/config';

const dictionaries: Record<(typeof locales)[number], () => Promise<any>> = {
  en: () => import('@i18n/2025/en').then((module) => module.default),
  id: () => import('@i18n/2025/id').then((module) => module.default),
  th: () => import('@i18n/2025/th').then((module) => module.default),
  tl: () => import('@i18n/2025/tl').then((module) => module.default),
  de: () => import('@i18n/2025/de').then((module) => module.default),
  es: () => import('@i18n/2025/es').then((module) => module.default),
  fr: () => import('@i18n/2025/fr').then((module) => module.default),
  it: () => import('@i18n/2025/it').then((module) => module.default),
  pt: () => import('@i18n/2025/pt').then((module) => module.default),
};

export const getDictionary = async (locale: TValidLocale) => {
  const dictionary = await dictionaries[locale]();
  return dictionary as TDefaultDictionary;
};
