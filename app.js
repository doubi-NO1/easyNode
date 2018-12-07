/**
 * 服务端入口
 */
const { APP } = require('./core'),
    routers = require('./router'),
    conf = require('./conf');

    let app = new APP(conf.dev, routers);
    app.start();
