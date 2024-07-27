/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        main: {
          50: '#f9edfb',
          100: '#f4daf7',
          200: '#e9b5ef',
          300: '#dd90e7',
          400: '#d26bdf',
          500: '#c746d7',
          600: '#9f38ac',
          700: '#772a81',
          800: '#501c56',
          900: '#280e2b',
        },
        gold: {
          50: '#fff7e9',
          100: '#ffefd3',
          200: '#ffdfa7',
          300: '#ffd07b',
          400: '#ffc04f',
          500: '#ffb023',
          600: '#cc8d1c',
          700: '#996a15',
          800: '#66460e',
          900: '#332307',
        },
      },
    },
  },
  plugins: [],
};
