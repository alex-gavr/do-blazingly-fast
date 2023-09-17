/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      keyframes: {
        widthGrowth: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
      animation: {
        widthGrowth: 'widthGrowth',
      },
    },
  },
  plugins: [require('tailwindcss-animated')],
};
