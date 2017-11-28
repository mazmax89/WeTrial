const webpack = require('webpack');
const merge = require('webpack-merge');
const helpers = require('./helpers');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
  entry: {
    'app': [
      helpers.root('client/index')
    ]
  },

  output: {
    filename: 'js/[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },

  plugins: [
    new UglifyJsPlugin({
      uglifyOptions: {
        ie8: false,
        ecma: 6,
        output: {
          comments: false,
          beautify: false,
          ecma: 6,
        },
        warnings: false
      }
    })

  ]
});
