const config = require('./webpack.config.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// Try the environment variable, otherwise use root

config.mode = 'production';

config.optimization = {
  splitChunks: {
    chunks: 'all',
  },
};
(config.output.publicPath = './'),
  (config.plugins = config.plugins.concat([
    new UglifyJsPlugin({
      sourceMap: true,
      extractComments: true,
    }),
  ]));

module.exports = config;
