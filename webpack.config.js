const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const htmlPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: './index.html',
});
const Favicon = new FaviconsWebpackPlugin({
  logo: './src/img/logo.png', // svg works too!
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
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]_[local]_[hash:base64]',
              sourceMap: true,
              minimize: true,
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [htmlPlugin, Favicon],
};
