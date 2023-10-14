export const defaultLocale = 'en';
export const defaultCountry = '??';
export const defaultOffer = 2025;

// export const locales = [defaultLocale, 'id', 'th', 'tl', 'it', 'de', 'fr', 'pt', 'es'] as const;
export const offers = [defaultOffer, 9560, 9569, 10864] as const;

export type TValidOffer = (typeof offers)[number];

export type TLanguage = {
  language: TValidLocale;
};

export const offersWithLanguages = [
  {
    offer: 2025,
    languages: ['en', 'id', 'th', 'tl', 'it', 'de', 'fr', 'pt', 'es'],
  },
  {
    offer: 9569,
    languages: ['de', 'en', 'es', 'fil', 'fr', 'id', 'it', 'ms', 'pt', 'th', 'vi'],
  },
  {
    offer: 10864,
    languages: ['en', 'id', 'th', 'tl', 'it', 'de', 'fr', 'pt', 'es'],
  },
] as const;

export const uniqueLanguages = Array.from(new Set(offersWithLanguages.flatMap((offer) => offer.languages)));
export type TValidLocale = (typeof uniqueLanguages)[number];

export const offersWithTranslations = offersWithLanguages.map((item) => item.offer);
type OffersWithLanguages = typeof offersWithLanguages;
export type OffersWithTranslations = (typeof offersWithLanguages)[number]['offer'];

export type SpecificDictionaryType<K extends number> = {
  [Lang in (typeof offersWithLanguages)[number] extends { offer: K }
    ? (typeof offersWithLanguages)[number]['languages'][number]
    : never]: () => Promise<any>;
};

export type DictionaryType = {
  [K in OffersWithLanguages[number]['offer']]: SpecificDictionaryType<K>;
};
