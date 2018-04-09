/**
 * @description 处理post请求体中间件
 * @author 巴神
 */
const querystring = require('querystring');

module.exoprts = async (req, res, next) => {
  if (req.method === 'POST') {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      data = decodeURI(data);
      let dataObject = querystring.parse(data);
      next();
    });
  } else {
    next();
  }
};