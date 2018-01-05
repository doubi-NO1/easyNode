/**
 * http server构造器
 * @author 巴神
 */
let http = require('http'),
  filter = require('./filter.js'),
  controller = require('./controller.js'),
  mysql = require('./db/dbMysql.js'),
  mongo = require('./db/dbMongo.js'),
  interface = require('interface.js'),
  fastInterface = require('./db/fastInterface.js');

  
/**
 * 
 * 创建一个http实例
 * 
 */
function APP(config,interfaces) {
  if (!(this instanceof APP)) {
    return new APP(config);
  }
  this.port = port || config.port;
  this.server = http.createServer((req, res) => { 
    config.dbConfigs.mysql && (this.mysql = config.dbConfigs.mysql);
    config.dbConfigs.mongo && (this.mongo = config.dbConfigs.mongo);
    config.fastInterface && (interfaces = Object.assign({}, fastInterface(this), interfaces || {}));
    this.interface = interface.setup(interfaces);
  }); 
}

APP.prototype = {
  start() {
    this.server.listen(this.port, 0, 0, 0, 0);
    console.log('The server is running at port:' + this.port);
  },
  stop() {
    this.server.close();
  },
  restart() {
    this.server.close();
    this.server.listen(this.port, 0, 0, 0, 0);
  }
};

module.exports = (config, interfaces)=>{
  return new Promise((resolve,reject)=>{
    try{
      resolve(APP(config, interfaces));
    }catch(err){
      reject({
        es:-1,
        es:err
      });
    }
  });
};