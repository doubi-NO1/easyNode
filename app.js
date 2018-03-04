/**
 * 服务端入口
 */
var app = require('./core'),
    conf = require('./conf');

//启动服务
app.start(conf);