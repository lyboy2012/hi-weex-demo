// You can install more packages below to config more as you like:
// eslint
// babel-eslint
// eslint-config-standard
// eslint-loader
// eslint-plugin-html
// eslint-plugin-promise
// eslint-plugin-standard
// postcss-cssnext


//console.log('NODE_ENV',process.env.NODE_ENV)
var fs = require('fs');
var path = require('path')
var webpack = require('webpack')
var atImport = require('postcss-import')
var nested = require('postcss-nested')
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin

var bannerPlugin = new webpack.BannerPlugin(
  '// { "framework": "Vue" }\n',
  { raw: true }
)

function getBaseConfig () {

  var proDir = process.cwd(); //当前项目目录
  var srcDir = path.resolve(proDir, 'src');
  var entries = genEntries(srcDir);
  //console.log(entries)
  return {
    /*entry:{
        app:'./src/entry/index.js'
    },*/
    entry: entries,
    output: {
      path: 'dist',
    },
    module: {
      // // You can use ESLint now!
      // // Please:
      // // 1. npm install {
      // //   babel-eslint
      // //   eslint
      // //   eslint-config-standard
      // //   eslint-loader
      // //   eslint-plugin-html
      // //   eslint-plugin-promise
      // // } --save-dev
      // // 2. set .eslintrc
      // //   take { "extends": "standard" } for example
      // //   so you need: npm install eslint-plugin-standard --save-dev
      // // 3. set the config below
      // preLoaders: [
      //   {
      //     test: /\.vue$/,
      //     loader: 'eslint',
      //     exclude: /node_modules/
      //   },
      //   {
      //     test: /\.js$/,
      //     loader: 'eslint',
      //     exclude: /node_modules/
      //   }
      // ],
      loaders: [
       
        {
          test: /\.js(\?[a-z0-9=&.]+)?$/,
          loader: 'babel',
          exclude: /node_modules/
        }, {
          test: /\.vue(\?[^?]+)?$/,
          loaders: []
        }
      ]
    },
     resolve: {
    // resolve file extensions
      extensions: ['.jsx', '.js', '']
    },
    vue: {
      // // You can use PostCSS now!
      // // Take cssnext for example:
      // // 1. npm install postcss-cssnext --save-dev
      // // 2. write `var cssnext = require('postcss-cssnext')` at the top
      // // 3. set the config below
      // postcss: [cssnext({
      //   features: {
      //     autoprefixer: false
      //   }
      // })]
      postcss: [nested,
       atImport({
        root: path.resolve(process.cwd(), 'src')
       })]
    },
    plugins: [bannerPlugin]
  }
}

function genEntries(srcDir) {
  var entryDir = path.resolve(srcDir, 'entry');
  //console.log(entryDir)
  var names = fs.readdirSync(entryDir);

  var map = {};
  names.forEach(function(name) {
    var m = name.match(/(.+)\.js$/);
    var entry = m ? m[1] : '';
    var entryPath = entry ? path.resolve(entryDir, name) : '';
    var paths = [];
    paths.push(entryPath + '?entry=true');
    if (entry) map[entry] = paths;
  });
  return map;
}

var webConfig = getBaseConfig()
webConfig.output.filename = '[name].web.js'
webConfig.module.loaders[1].loaders.push('vue')


var weexConfig = getBaseConfig()
weexConfig.output.filename = '[name].weex.js'
weexConfig.module.loaders[1].loaders.push('weex')
// 不能直接使用 webpack -p，否则压缩后会丢掉 banner，使得 jsfm 无法判断用 vue 2.0 版本解析
  // 自己配置 uglify plugin，并且放在 banner 的前面

if(process.env.NODE_ENV!=='production'){
  webConfig.plugins.unshift(new UglifyJsPlugin());
  weexConfig.plugins.unshift(new UglifyJsPlugin());
}
module.exports = [webConfig, weexConfig]
