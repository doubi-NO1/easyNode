/**
 * http server构造器
 * @author 巴神
 */
var http = require('http');
var config = require('../conf/index.js');
var filter = require('./filter.js');
var controller = require('./controller.js');

/**
 * 
 * 创建一个http实例
 * 
 */
function APP(port){
  if(!(this instanceof APP)){
    return new APP();
  }
  this.port = port || config.port;
  controller.setup();
  this.server = http.createServer((req,res)=>{
    var answer = filter(req,res) || router(req,res);
    answer.isEnd || (res.writeHead(answer.status,answer.headers),
    res.end(answer.content));
  });
}

APP.prototype={
  start(){
    this.server.listen(this.port,0,0,0,0);
    console.log('server is running at port:'+this.port);
  },
  stop(){
    this.server.close();
  },
  restart(){
    this.server.close();
    this.server.listen(this.port,0,0,0,0);
  }
};

module.exports=APP;
