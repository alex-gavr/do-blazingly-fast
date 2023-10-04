/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Adds a new `custom` grid template column definition
        customTimer: '1fr 0.3fr 1fr',
      },
      keyframes: {
        widthGrowth: {
          '0%': { width: '0%' },
          '33%': { width: '33%' },
          '66%': { width: '66%' },
          '100%': { width: '100%' },
        },
      },
      animation: {
        widthGrowth: 'widthGrowth steps(3, end)',
      },
    },
  },
  plugins: [require('tailwindcss-animated')],
};
