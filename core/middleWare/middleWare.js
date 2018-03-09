/**
 * @description 中间件装饰器（与koa中间件的洋葱模型类似），暂不支持await next()方式，后续补上
 * @param {Function} middleWare 某个中间件模型
 * @returns {Function} 返回装饰后的函数
 */

const decorator = (middleWare, handle) => {
  return (...args) => {
    return new Promise(async (resolve, reject) => {
      try {
        handle && handle(...args);
        middleWare(...args);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  };
}

module.exports = (middleWares) => {
  let handle = ()=>{};
  middleWares.forEach(middleWare => {
    handle = decorator(middleWare, handle);
  });
  return handle;
}