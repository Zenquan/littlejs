# littlejs   -- Little and basic(小又基础)

>本项目是基于[jslib-little](https://github.com/yanhaijing/jslib-little)环境重构littlejs。

## 功能
一般的简单普通页面都用到以下功能库：

1、运动框架（轮播图、按钮渐显渐隐)；

2、选项卡；

3、用ajax实现前后端分离；

4、设置、获取或者删除cookie；

5、支持异步方法之一generator的使用。

## 特性

- ES6编写源码，编译生成生产代码
- 集成 babel-runtime (默认关闭)
- 第三方依赖自动注入
- 支持浏览器原生
- 支持AMD，CMD
- 支持Webpack，Rollup，fis等
- 支持Node
- 集成单元测试环境
- 集成eslint
- 集成[travis-ci](https://www.travis-ci.org/)
- 支持banner

**注意:** 如果不同时使用 export 与 export default 可打开legacy模式，legacy模式下的模块系统可以兼容ie6-8，见rollup配置文件

## 兼容性
单元测试保证支持如下环境：

- Node 4+
- Safari 6+ (Mac)
- iOS 5+ Safari
- Chrome 23+ (Windows, Mac, Android, iOS, Linux, Chrome OS)
- Firefox 4+ (Windows, Mac, Android, Linux)
- Internet Explorer 6+ (Windows, Windows Phone)
- Opera 10+ (Windows, linux, Android)

## 目录介绍

```
.
├── demo 使用demo
├── dist 编译产出代码
├── doc 项目文档
├── src 源代码目录
├── test 单元测试
├── CHANGELOG.md 变更日志
└── TODO.md 计划功能
```

## 如何使用
通过npm下载安装代码

```bash
$ npm install --save littlejs
```

如果你是node环境

```js
var little = require('littlejs');
```

如果你是webpack等环境

```js
import little from 'littlejs';
```

如果你是requirejs环境

```js
requirejs(['node_modules/littlejs/dist/index.aio.js'], function (little) {
    // xxx
})
```

如果你是浏览器环境

```html
<script src="node_modules/littlejs/dist/index.aio.js"></script>
```

在body结束标签结束前引入littlejs.js

```
<script src="./dist/index.js"></script>
```
然后使用函数
```
var ex = new little('div1');
ex.startMove(this, {'opacity': 100});
```
## 线上测试
[库测试](https://www.jomsou.cn/littlejs)

## 文档
[API](https://github.com/Zenquan/littlejs/blob/v0.2.0/doc/api.md)

## 贡献指南
首次运行需要先安装依赖

```bash
$ npm install
```

一键打包生成生产代码

```bash
$ npm run build
```

运行单元测试，浏览器环境需要手动测试，位于`test/browser`

```bash
$ npm test
```

修改package.json中的版本号，修改README.md中的版本号，修改CHANGELOG.md，然后发布新版

```bash
$ npm run release
```

将新版本发布到npm

```bash
$ npm publish
```

可能需要你自己修改的地方如下：

- README.md 中的信息
- package.json 中的信息
- config/rollup.js 中的信息
- test/browser/index.html 中的仓库名称

## 更新日志
[CHANGELOG.md](https://github.com/Zenquan/littlejs/blob/v0.2.0/CHANGELOG.md)

## 计划列表
[TODO.md](https://github.com/Zenquan/littlejs/blob/v0.2.0/TODO.md)

## 谁在使用

- [@jsmini/little](https://github.com/jsmini/little)
- [@jsmini/type](https://github.com/jsmini/type)
- [@jsmini/is](https://github.com/jsmini/is)
- [@jsmini/guid](https://github.com/jsmini/guid)
- [@jsmini/event](https://github.com/jsmini/event)
- [@jsmini/inherits](https://github.com/jsmini/inherits)
- [@jsmini/console](https://github.com/jsmini/console)
