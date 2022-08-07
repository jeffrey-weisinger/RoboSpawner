const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    game: './src/client/js/index.js',
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {

rules: [
  
  {
    test: /\.(jpg|png)$/,
    use: {
      loader: 'url-loader',
    },
  },
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        presets: ['@babel/preset-env'],
      },
    },
  },
  {
    test: /\.css$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader, //pretty sure this extracts css into a new file for us. 
      },
      'css-loader',
    ],
  },
  {
    test: /\.(gltf)$/,
    use: [
      {
        loader: "gltf-webpack-loader"
      }
    ]
  },
  {
    test: /\.(bin)$/,
    use: [
      {
        loader: 'file-loader',
        options: {}
      }
    ]
  }
],
},
  plugins: [
    new MiniCssExtractPlugin({ //we define this here i believe
      filename: '[name].[contenthash].css',
    })//,
    //new CleanWebpackPlugin()
  ],
};