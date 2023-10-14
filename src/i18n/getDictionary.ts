import type { DictionaryType, OffersWithTranslations, SpecificDictionaryType } from '@config/globalConfig';

const dictionaries: DictionaryType = {
  2025: {
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
  9569: {
    en: () => import('@i18n/9569/en').then((module) => module.default),
    de: () => import('@i18n/9569/de').then((module) => module.default),
    es: () => import('@i18n/9569/es').then((module) => module.default),
    fil: () => import('@i18n/9569/fil').then((module) => module.default),
    fr: () => import('@i18n/9569/fr').then((module) => module.default),
    id: () => import('@i18n/9569/id').then((module) => module.default),
    it: () => import('@i18n/9569/it').then((module) => module.default),
    ms: () => import('@i18n/9569/ms').then((module) => module.default),
    pt: () => import('@i18n/9569/pt').then((module) => module.default),
    th: () => import('@i18n/9569/th').then((module) => module.default),
    vi: () => import('@i18n/9569/vi').then((module) => module.default),
  },
};

export const getDictionary = async (offer: OffersWithTranslations, locale: string): Promise<any> => {
  const offerDictionary = dictionaries[offer] as SpecificDictionaryType<typeof offer>;

  if (!offerDictionary) {
    throw new Error(`No dictionary found for offer ${offer}`);
  }

  // We assert types here because we've done the runtime checks
  const fetchLocale = offerDictionary[locale as keyof SpecificDictionaryType<typeof offer>];

  if (fetchLocale) {
    return await fetchLocale();
  } else if (offerDictionary.en) {
    return await offerDictionary.en();
  } else {
    throw new Error(`Locale ${locale} or 'en' does not exist for offer ${offer}`);
  }
};

// type DictionaryFunction = () => Promise<any>;
// const createDictionaryEntry = (offer: number, locale: string): DictionaryFunction => {
//   return () => {
//     console.log(`Importing @i18n/${offer}/${locale}`);
//     return import(`@i18n/${offer}/${locale}`).then((module) => {
//       console.log(`Imported module:`, module);
//       return module.default;
//     });
//   };
// };

// type DictionaryLoader = () => Promise<any>;
// type DictionaryConfig = Record<string, DictionaryLoader>;

// const createDictionaryConfig = (offer: OffersWithTranslations): DictionaryConfig => {
//   const languages = offersWithLanguages.find((item) => item.offer === offer)?.languages || [];
//   console.log('🚀 ~ languages:', languages);

//   const config: DictionaryConfig = {};

//   for (let i = 0; i < languages.length; i++) {
//     const lang = languages[i];
//     config[lang] = () => import(`@i18n/${offer}/${lang}`).then((module) => module.default);
//   }
//   console.log('🚀 ~ config:', config);

//   return config;
// };

// const dictionaries: Record<string, DictionaryConfig> = {};

// offersWithTranslations.forEach((offer) => {
//   dictionaries[offer] = createDictionaryConfig(offer);
// });

// console.log('🚀 ~ dictionaries:', dictionaries);

// export const getDictionary = async (offer: OffersWithTranslations, locale: string) => {
//   console.log(dictionaries[offer]);
//   console.log(dictionaries[offer][locale]);
//   // Check if the dictionary exists for the given offer and locale
//   if (dictionaries[offer] && dictionaries[offer][locale]) {
//     return await dictionaries[offer][locale]();
//   }

//   // Fallback to English if the locale doesn't exist for the offer
//   if (dictionaries[offer] && dictionaries[offer]['en']) {
//     console.warn(`Locale ${locale} not found for offer ${offer}. Falling back to 'en'.`);
//     return await dictionaries[offer]['en']();
//   }

//   // If even the English dictionary is not found, throw an error or handle accordingly
//   throw new Error(`Dictionary for offer ${offer} and locale ${locale} not found, and no 'en' fallback available.`);
// };
