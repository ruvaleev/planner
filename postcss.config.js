const purgecss = require('@fullhuman/postcss-purgecss')({
  // Specify the paths to all of the template files in your project
  content: [
    'index.html',
    './src/**/*.html',
    './src/**/*.js',
  ],
  // Include any special characters you're using in this regular expression
});

module.exports = {
  plugins: [
    /* eslint global-require: 0 */
    require('tailwindcss'),
    require('autoprefixer'),
    ...(process.env.NODE_ENV === 'production' ? [purgecss] : []),
  ],
};
