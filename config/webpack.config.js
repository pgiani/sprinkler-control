const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');

const ROOT_DIRECTORY = path.join(__dirname, '..');
const SRC_DIRECTORY = path.join(ROOT_DIRECTORY, 'src');

const htmlPlugin = new HtmlWebpackPlugin({
  template: path.join(SRC_DIRECTORY, 'index.html'),
  apiKeys: {
    rachio: '76980330-8f0b-4659-a341-527364acf134',
  },
});
const copyPlugin = new CopyWebpackPlugin([
  {
    from: path.join(SRC_DIRECTORY, 'assets'),
    to: path.join(ROOT_DIRECTORY, 'build'),
  },
]);

const Favicon = new FaviconsWebpackPlugin({
  logo: './src/assets/images/logo.png', // svg works too!
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

const config = {
  entry: [path.resolve(__dirname, '../src/index.js')],
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  mode: 'development',
  resolve: {
    modules: [path.resolve('node_modules'), 'node_modules'],
  },
  performance: {
    hints: false,
  },
  plugins: [htmlPlugin, copyPlugin, Favicon, new DashboardPlugin()],
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif|pdf)$/,
        use: ['file-loader'],
      },
    ],
  },
};

module.exports = config;
