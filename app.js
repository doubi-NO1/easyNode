/**
 * 服务端入口
 */
const APP = require('./core'),
    controllers = require('./controller'),
    conf = require('./conf');

(async ()=>{
    //启动服务
    let app = await APP(conf.dev, controllers);
    app.start();
})();
