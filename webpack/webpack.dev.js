const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',

 plugins:[ new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'src/client/html/index.html',
  }),],

  optimization: {
    minimize: false
  }
});
