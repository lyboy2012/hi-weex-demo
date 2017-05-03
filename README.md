# hi-weex-demo

> hi-weex

## getting start


### 开发流程
- 安装weex-toolkit
node 版本要求6.0以上
```bash
sudo npm install -g weex-toolkit
```


```bash
npm install
```

##  文件结构

* `app/*.html`: Web 渲染页面
* `src/*`: 源码位置
* `entry/*.js`: weex 入口js
* `build/*`: 最后编译的weex及vue打包js文件
* `dist/*`: 开发调试过程中的webpack 打包js 文件及sourcemap
* `assets/*`: 开发预览相关的js
* `*.html`: web 预览 及js调试二维码地址
* `serve/init.js` serve  动态获得本机ip 及设置serve `CURRENT_IP` 配置
* `.babelrc`: babel 配置 (preset-2015 默认)
* `.eslintrc`: eslint 配置 (标准默认配置)

## npm scripts

```bash
#  针对weex 和 web 通过webpack分别编译 两个文件放到 build
npm run build

# 针对weex 和 web 通过webpack分别编译 两个文件放到 dist 同时实时监听文件变化
npm run dev

# 启动8080端口的web服务便于调试 http://localhost:8080/*.html
npm run serve

# 启动 weex-devtool 来与原生进行调试代码
npm run debug
```

### 添加新weex页面

## notes

You can config more babel, ESLint and PostCSS plugins in `webpack.config.js`.




