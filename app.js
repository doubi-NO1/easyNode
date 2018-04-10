/**
 * 服务端入口
 */
const { APP } = require('./core'),
    controllers = require('./controller'),
    conf = require('./conf');

    let app = new APP(conf.dev, controllers);
    app.start();
