let middleWares = [

];

/**
 * @description
 * @param {中间件} middleWare 
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
  let handle;
  middleWares.forEach(middleWare => {
    handle = decorator(middleWare, handle);
  });
  return handle;
}