'use strict'

/**
 * http server构造器
 * @author 巴神
 */
let http = require('http'),
    log4j = require('log4js'),
    log4jconf = require('../conf/config.log4j'),
    plugin = require('../plugin'),
    Route = require('../route'),
    middleWare = require('../middleWare');
    
    log4j.configure(log4jconf);
    global.console = log4j.getLogger('console');
    global.setLog = log4j.getLogger('logInfo'); 
/**
 * 
 * @description 创建一个http实例
 * @param {Object} config 启动服务的配置
 * @param {Array} routers
 * @return (Object) server实例
 */
class APP {
    constructor(config, routers) {
        this.config = Object.assign({}, {
            port: 8080,
            middleWare: []
        }, config);
        plugin(this, this.config.plugins);
        this.middleWare = middleWare(this.config.middleWare);
        this.router = new Route(routers);
        this.server = http.createServer(async (req, res) => {
            await this.middleWare(req, res);
            const body = await this.router.handle(this, req, res);
            res.end(body);
        });
        this.server.on('clientError', (err, socket) => {
            socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
        });
    }
    /**
     * @description 启动服务
     * @return {Promise} resolve返回server实例
     */
    start() {
        return new Promise((resolve, reject) => {
            try {
                this.server.listen(this.config.port, 0, 0, 0, 0);
                console.log('The server is running at port:' + this.config.port);
                resolve(this);
            } catch (e) {
                console.log(e);
                reject(e, this);
            }
        });
    }
    /**
     * @description 停止服务
     * @return {Promise} resolve返回server实例
     */
    stop() {
        return new Promise((resolve, reject) => {
            try {
                console.log('The server is stopping');
                this.server.close(() => {
                    console.log('The server has been stopped...');
                    resolve(this);
                });
            } catch (e) {
                reject(e, this);
            }
        });
    }
    /**
     * @description 重启服务
     * @return {Promise} resolve返回server实例
     */
    restart() {
        return new Promise(async (resolve, reject) => {
            try {
                await this.stop();
                resolve(await this.start());
            } catch (e) {
                console.log(e);
                reject(e, this);
            }
        });
    }
}

module.exports = APP;