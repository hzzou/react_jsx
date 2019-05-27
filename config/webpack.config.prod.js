const paths = require('./paths.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const smp = new SpeedMeasurePlugin();

module.exports = smp.wrap({
  mode:'production',
  resolve:{
    extensions:['.js','.jsx','.json']
  },
  entry:paths.appIndex,
  output:{
    path:paths.appBuild,
    filename:'static/js/[name]-[hash:8].js',
    publicPath:'./'
  },
  devtool:'cheap-module-source-map',
  module:{
    rules:[
      {
        enforce:'pre',
        test:/\.js$/,
        loader:'source-map-loader'
      },
      {
        test:/\.(png|jpg|jpeg|gif|svg)$/,
        loader:'url-loader'
      },
      {
        test:/\.styl$/,
        use:[
          { loader:'style-loader' },
          { loader:MiniCssExtractPlugin.loader },
          { loader:'css-loader' },
          { 
            loader:'postcss-loader',
            options:{
              config:{
                path:'./config/postcss.config.js'
              }
            }
          },
          { loader:'stylus-loader' }
        ]
      },
      {
        test:/\.(js|jsx)/,
        use:{
          loader: 'babel-loader',
          options:{
            presets:['@babel/preset-env','@babel/preset-react'],
            //打包的时候不需要按需导入的插件@babel/plugin-transform-runtime', 
            plugins: ['@babel/plugin-syntax-dynamic-import']
          }
        }
      }
    ]
  },
  optimization:{
    minimizer:[
      new UglifyJsPlugin({
        cache:true,
        sourceMap:true,
        parallel:true //开启多线程
      }),
      new OptimizeCssAssetsPlugin()
    ]
  },
  plugins:[
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title:'React的jsx项目',
      template:paths.appHtml,
      minify:{
        removeComments:true,
        collapseWhitespace:true
      },
      favicon:'./favicon.ico'
    }),
    new MiniCssExtractPlugin({
      filename:'static/css/[name]-[contenthash:8].css'
    })
  ]
})