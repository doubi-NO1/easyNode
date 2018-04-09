/**
 * @description xss防御中间件
 * @author 巴神
 */

//参考资料:https://github.com/leizongmin/js-xss
var xss = require('xss');


//依赖body-parser中间件
module.exports = (req, res) => {
  req.url=xss(req.url);
  if (req.method=='POST'){
    
  }
};