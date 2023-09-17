/** @type {import("prettier").Config} */
const config = {
  trailingComma: 'all',
  printWidth: 150,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  jsxSingleQuote: true,
  bracketSameLine: false,
  arrowParens: 'always',
  singleAttributePerLine: false,
  importOrder: [
    '^@db/(.*)$',
    '^@config/(.*)$',
    '^@context/(.*)$',
    '^@layout/(.*)$',
    '^@hooks/(.*)$',
    '^@i18n/(.*)$',
    '^@utils/(.*)$',
    '^@components/(.*)$',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: ['prettier-plugin-tailwindcss', 'prettier-plugin-astro', '@trivago/prettier-plugin-sort-imports'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
};

module.exports = config;
