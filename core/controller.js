/**
 * 接口代理层
 * @author 巴神
 */

var Route = require('./route.js');
/**
 * 模块接口注册
 */

module.exports={
  setup(){
    Route.init();
    console.log('all routes have been installed...');
  }
};