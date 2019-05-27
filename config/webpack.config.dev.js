const path = require('path');
const paths = require('./paths.js');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const smp = new SpeedMeasurePlugin();

module.exports = smp.wrap({
  mode:'development',
  resolve:{
    extensions:['.js','.jsx','.json']
  },
  entry:[
    paths.appIndex
  ],
  devtool:'cheap-eval-source-map',
  output:{
    filename:'bundle.js',
    devtoolModuleFilenameTemplate:info=>path.resolve(info.absoluteResourcePath.replace(/\\/g,'/'))
  },
  module:{
    rules:[
      {
        enforce:'pre',
        test:/\.js$/,
        loader:'source-map-loader'
      },
      {
        test:/\.(png|jpg|jpeg|svg|gif)$/,
        loader:'url-loader'
      },
      {
        test:/\.(js|jsx)$/,
        use:{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env','@babel/preset-react'],
            plugins: ['@babel/plugin-transform-runtime','@babel/plugin-syntax-dynamic-import']
          }
        },
        exclude:/node_modules/
      },
      {
        test:/\.styl$/,
        use:[
          { loader:'style-loader'},
          { loader:'css-loader'},
          { loader:'postcss-loader',
            options:{
              config:{
                path:'./config/postcss.config.js'
              }
            }
          },
          { loader:'stylus-loader'}
        ]
      }
    ]
  },
  plugins:[
    new HtmlPlugin({
      title:'React的JSX项目',
      template:paths.appHtml
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer:{
    historyApiFallback:true,
    disableHostCheck:true,
    host:'localhost',
    port:'8085',
    hot:true,
    inline:true,
    open:true,
    watchContentBase:true,
    clientLogLevel:'none',
  }
});