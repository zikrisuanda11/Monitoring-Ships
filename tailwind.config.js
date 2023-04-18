/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.jsx",
  ],
  theme: {
    extend: {
      'input': {
        '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
          '-webkit-appearance': 'none',
          'margin': 0,
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
  theme: {
    fontFamily: {
      sans: ['Inter var', ...defaultTheme.fontFamily.sans],
    }
  }
}