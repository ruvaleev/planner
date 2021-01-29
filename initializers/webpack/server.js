const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  devtool: 'eval',
  mode: 'production',
  target: 'node',
  externals: [nodeExternals()],
  entry: {
    server: './initializers/server/index.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(process.cwd(), 'dist/server'),
  },
  resolve: {
    modules: [path.resolve(process.cwd(), 'initializers/server'), path.resolve(process.cwd(), 'src'), 'node_modules'],
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, loader: 'ignore-loader' },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        loader: 'url-loader',
        options: {
          limit: 8192,
        },
      },
    ],
  },
};
