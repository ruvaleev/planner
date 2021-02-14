const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const dotenv = require('dotenv');

const env = dotenv.config().parsed || {};

const envVars = Object.keys(env).reduce((result, key) => {
  result[`process.env.${key}`] = JSON.stringify(process.env[key] || env[key]); // eslint-disable-line no-param-reassign
  return result;
}, {});

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
  plugins: [
    new webpack.DefinePlugin(envVars),
  ],
};
