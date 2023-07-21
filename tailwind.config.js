/** @type {import('tailwindcss').Config} */
export default {
  plugins: [import('flowbite/plugin')],
  content: ['./node_modules/flowbite/**/*.js'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f6f5ff',
          100: '#edebfe',
          200: '#dcd7fe',
          300: '#cabffd',
          400: '#ac94fa',
          500: '#9161f9',
          600: '#7d3af2',
          700: '#6c2bd9',
          800: '#5521b5',
          900: '#491d96',
          950: '#3c0764',
        },
        danger: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },
      },
    },
  },
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  // variants: {
  //   extend: {},
  // },
};
