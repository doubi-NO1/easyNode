/**
 * @author 巴神
 * 2017/6/23
 * mime-type集合
 */

var types = {
  'image/': function () {

  },
  'text/html': function () {

  }
}, empty = function () { };

/**
 * 设置mime-type
 * 
 * @param {string,array,object} key 
 * @param {function} fn 
 */
function set(key, fn) {
  typeof key === string ? (types[key] = fn || empty) : Array.isArray(key) ? (key.forEach((v) => {
    Object.assign(types, v);
  })) : Object.assign(types, key);
  //增加链式调用
  return this;
}

/**
 * 获取mime-type
 * 
 * @param {string} key 
 * @returns 
 */
function get(key) {
  return types[key];
}

/**
 * 移除mime-type
 * 
 * @param {string} key 
 */
function remove(key) {
  types[key] && delete types[key]
}

/**
 * 调用对应的处理函数
 * 
 * @param {string} key 
 */
function handle(key) {
  var promise = new Promise((resolve, reject) => {
    try {
      var result = types[key] && types[key].apply(arguments);
      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
  return promise;
}
//导出
module.exports = {
  set: set,
  get: get,
  handle: handle,
  remove: remove
}