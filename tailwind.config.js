import colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      white: colors.white,
      grey: colors.gray,
      orange: colors.orange,
    },
    extend: {},
  },
  plugins: [],
}
