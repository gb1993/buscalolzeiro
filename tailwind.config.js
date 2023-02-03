/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{jsx,ts,tsx,js}'],
  theme: {
    variants: {
      fontFamily: ['lolfont'],
    },
    fontFamily: {
      lolfont: ['lolfont', 'system-ui'],
    },
    extend: {
      colors: {
        dark: '#201E45',
        neutral: '#404267',
        opaque: '#E4E4EF',
        lightred: '#F07B7B',
        lightblue: '#3d85c6',
        lightpurple: '#7113c1',
      },
    },
  },
  plugins: [],
};
