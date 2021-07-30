const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      white: colors.white,
      grey: colors.gray,
      orange: colors.orange,
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
