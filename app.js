/**
 * 服务端入口
 */
const APP = require('./core'),
    conf = require('./conf');

//启动服务
new APP(conf).start();