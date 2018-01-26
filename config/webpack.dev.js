const merge = require('webpack-merge');
const helpers = require('./helpers');

const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
  devtool: 'eval-source-map',

  entry: {
    'app': [
      'react-hot-loader/patch',
      helpers.root('src/index')
    ]
  },

  output: {
    filename: 'js/[name].js',
    chunkFilename: '[id].chunk.js'
  },
  devServer: {
    contentBase: './public',
    historyApiFallback: true,
    hot: true,
    stats: 'minimal' // none (or false), errors-only, minimal, normal (or true) and verbose
  }
});
