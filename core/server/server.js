'use strict'

/**
 * http server构造器
 * @author 巴神
 */
let http = require('http'),
  controller = require('../controller'),
  db = require('../db'),
  Route = require('../route'),
  middleWare = require('../middleWare');


/**
 * 
 * @description 创建一个http实例
 * @param {Object} config 启动服务的配置
 * @param {Array} controllers
 * @return (Object) server实例
 */
class APP {
  constructor(config, controllers) {
    this.config = Object.assign({}, {
      port:8080,
      middleWare: []
    }, config);
    this.config.dbConfigs.mysql && (this.mysql = this.config.dbConfigs.mysql);
    this.config.dbConfigs.mongo && (this.mongo = this.config.dbConfigs.mongo);
    this.middleWare = middleWare(this.config.middleWare);
    this.config.fastController && (controllers = Object.assign({}, fastController(this), controllers || {}));
    this.router = new Route(controllers, this.config.defaultAction);
    this.server = http.createServer(async (req, res) => {
      //await this.middleWare(req,res);
      this.router.handle(this,req, res);
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

module.exports = (config, interfaces) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(new APP(config, interfaces));
    } catch (err) {
      reject({
        es: -1,
        es: err
      });
    }
  });
};