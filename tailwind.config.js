module.exports = {
  purge: {
    mode: 'layers',
    layers: ['components', 'utilities'],
    content: ['./src/**/*.js'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      padding: {
        '30vh': '30vh',
      },
    },
    fontFamily: {
      helvetica: 'Helvetica',
    },
    fontSize: {
      '2xl': '1.5rem',
      base: '1rem',
      big: '2.065rem',
    },
    minWidth: {
      '20em': '20em',
      '1rem': '1rem',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
