'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    main: [path.join(__dirname, 'app/main.jsx')]
  },
  output: {
    path: path.join(__dirname, '/server/dist/'),
    filename: '[name].min.js'
  },
  resolve: {
    modules: [
      path.join(__dirname, "/app"),
      "node_modules"
    ]
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new ExtractTextPlugin({
      filename: "style.min.css",
      disable: false, allChunks: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: {
          comments: false
      },
      mangle: true,
      sourcemap: false,
      debug: false,
      minimize: true,
      compress: {
          warnings: false,
          screw_ie8: true,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true
      }
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  module: {
    rules:[
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        options: {
          plugins: [
            ['import', { libraryName: "antd-mobile", style: true }]
          ]
        },
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        loader: 'file-loader?name=[name].[ext]',
      },
      {
        test: /\.less$/,
        loader: ["style-loader", "css-loader", "less-loader"]
      },
      {
        test: /\.css$/,
        loader: ["style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        loader: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loader: [
          'file-loader?hash=sha512&digest=hex&name=img/[name].[ext]',
          'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&minetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000'
      }
    ]
  }
};
