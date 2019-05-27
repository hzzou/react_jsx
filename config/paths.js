const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

console.log(process.cwd())
module.exports = {
  appBuild:resolveApp('build'),
  appPublic:resolveApp('public'),
  appIndex:resolveApp('src/index.jsx'),
  appHtml:resolveApp('public/index.html'),
  appNodeModules:resolveApp('node_modules')
}