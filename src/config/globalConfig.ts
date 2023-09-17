export const defaultLocale = 'en';
export const defaultCountry = '??';
export const defaultOffer = 0;

export const locales = [defaultLocale, 'id', 'th', 'tl', 'it', 'de', 'fr', 'pt', 'es'] as const;
export const offers = [defaultOffer, 10864] as const;

export type TValidLocale = (typeof locales)[number];
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
    offer: 10864,
    languages: ['en', 'id', 'th', 'tl', 'it', 'de', 'fr', 'pt', 'es'],
  },
];
