/**
 * @description 简单的sql注入拦截器中间件
 * @author 巴神
 */


const url = require('url');

const keyWords = [
  "select",
  "insert",
  "delete",
  "count(",
  "drop table",
  "update",
  "truncate",
  "asc(",
  "mid(",
  "char(",
  "xp_cmdshell",
  "exec",
  "master",
  "net",
  "and",
  "or",
  "where"
];

module.exports = (req, res) => {
  const parms = req.url.search;
  let found = false;
  for (let i = 0; i < keyWords.length; i++) {
    if (parms.indexOf(v) >= 0) {
      found = true;
      break;
    }
  }
  found && res.writeHead(401, {
    'Content-Type': 'text/plain'
  }), res.end('sqlInjection not allowed');
}