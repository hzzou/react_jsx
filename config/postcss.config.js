module.exports = {
  plugins:[
    require('autoprefixer'),
    require('postcss-flexbugs-fixes'),
    require('postcss-preset-env')({
      stage:3
    }),
    require('postcss-pxtorem')({
      rootValue:75,
      propList:['*','!font*'],
      minPixelValue:2,
      selectorBlackList:[] //保留为px
    })
  ]
}