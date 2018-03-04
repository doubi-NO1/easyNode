'use strict'

/**
 * http server构造器
 * @author 巴神
 */
let http = require('http'),
  filter = require('../filter'),
  controller = require('../controller'),
  db = require('../db');
  interface = require('../interface'),

  
/**
 * 
 * 创建一个http实例
 * 
 */

  class APP {
    constructor(config, interfaces){
      this.port = port || config.port;
      this.server = http.createServer((req, res) => {
        config.dbConfigs.mysql && (this.mysql = config.dbConfigs.mysql);
        config.dbConfigs.mongo && (this.mongo = config.dbConfigs.mongo);
        config.fastInterface && (interfaces = Object.assign({}, fastInterface(this), interfaces || {}));
        this.interface = interface.setup(interfaces);
      });
    }
    start() {
      this.server.listen(this.port, 0, 0, 0, 0);
      console.log('The server is running at port:' + this.port);
    }
    stop() {
      return new Promise((resolve, reject) => {
        try{
          this.server.close(() => {
            resolve();
          });
        }catch(e){
          reject(e);
        }
      });
    }
    async restart() {
      await this.stop();
      this.server.listen(this.port, 0, 0, 0, 0);
    }
 }

module.exports = (config, interfaces)=>{
  return new Promise((resolve,reject)=>{
    try{
      resolve(new APP(config, interfaces));
    }catch(err){
      reject({
        es:-1,
        es:err
      });
    }
  });
};