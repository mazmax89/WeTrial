const merge = require('webpack-merge');

const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
  devtool: 'eval-source-map',

  entry: {
    'app': [
      'webpack-hot-middleware/client',
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
