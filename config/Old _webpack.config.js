const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const htmlPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: './index.html',
});
const Favicon = new FaviconsWebpackPlugin({
  logo: './src/assets/img/logo.png', // svg works too!
  mode: 'webapp', // optional can be 'webapp' or 'light' - 'webapp' by default
  devMode: 'webapp', // optional can be 'webapp' or 'light' - 'light' by default
  favicons: {
    appName: 'Sprinler',
    appDescription: 'Sprinler Control',
    developerName: 'pgiani',
    developerURL: null, // prevent retrieving from the nearest package.json
    background: '#2196f3',
    theme_color: '#ffffff',
    icons: {
      coast: false,
      yandex: false,
    },
  },
});

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: process.env.NODE_ENV || 'development',
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        loaders: ['file-loader'],
      },
    ],
  },
  plugins: [htmlPlugin, Favicon],
};
