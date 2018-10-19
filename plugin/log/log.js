/**
 * @description 日志处理插件
 * @author 巴神
 */

var log4j = require("log4js");

log4j.configure({
  appenders: [
    { type: 'console' },
    { type: 'file', filename: 'cheese.log', category: 'cheese' }
  ]
});