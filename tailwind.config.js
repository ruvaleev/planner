module.exports = {
  purge: {
    mode: 'layers',
    layers: ['components', 'utilities'],
    content: ['./src/**/*.js']
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
