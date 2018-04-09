
# Simple-Easy-Node - 极简、轻量、可扩展的node框架
  
## 产生背景
&emsp;&emsp;本人从2017年下半年开始对node产生了兴趣，为了学习nodejs，萌生了开发一个简单node框架的想法，一来熟悉node api，二来想通过这个框架来搭建自己的博客，因此Simple-Easy-Node从设计之初就是为了可以快速开发中小型web项目的。

## 简单使用

### 安装
```bash
 npm install Simple-Easy-Node
```

### 制作中间件
中间件的思路借鉴了koa中间件的洋葱模型，每一个中间件都是一个方法，方法会接受3个参数，request、response和next，以body-parser中间件为例:

创建一份body-parser.js文件
```javascript

//post请求请求体处理
module.exports=(req,res,next)=>{
  if (req.method === 'POST') {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      data = decodeURI(data);
      req.body = querystring.parse(data);
      next();
    });
  } else {
    next();
  }
}
```

### 通过controller制作一个接口
框架内置了一个简单的路由，通过路由，可以把请求映射到对应的controller，下面我们制作一个controller

创建一份controller.js文件
```javascript
//type是请求请求类型，如果不定义，就表示既可以支持post，也可以支持get
module.exports = [{
  type: 'get',
  '/queryA': (app, req, res) => {
    res.writeHead('200', {
      'Content-Type': 'text/html'
    });
    res.write('<h1>queryA</h1>');
    res.end();
  }
}, {
  type: 'post',
  '/queryB': (app, req, res) => {
    res.writeHead('200', {
      'Content-Type': 'text/html'
    });
    res.write('<h1>queryB</h1>');
    res.end();
  }
}, {
  '/queryC/:id/:name': (app, req, res, parms) => {
    res.writeHead('200', {
      'Content-Type': 'application/json'
    });
    res.end(JSON.stringify({
      id: parms[0],
      name: decodeURI(parms[1])
    }));
  }
}];
```
注意，路由是基于backbone路由改造而来的，具体路由策略可以参考backbone的官方文档

### 配置
配置包含了服务启动时的端口号、所用到的中间件以及插件

创建一份config.js文件
```javascript
const bodyParser=require('./body-parser.js');

module.exports = {
  port: 8080,//端口号,
  middleWare: [bodyParser],//中间件，处理请求时以队列的形式顺序执行
  plugins:[]//插件
}
```
#### 运行

创建一份app.js文件
``` javascript
  const { APP } = require('easyNode'),
    controllers = require('./controller.js'),
    conf = require('./config.js');

  let app = new APP(conf, controllers);
  app.start();
```

一个最简单的node服务已经写好了，现在只需要在终端运行命令就可以启动服务了
```bash
  node app.js
```
框架还在建设中，喜欢的可以持续关注一波
