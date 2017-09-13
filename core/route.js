/**
 * url路由中间件
 * @author 巴神
 */
var mimeType = require('./mime-type.js');
var controller = require('./controller.js');
var file = require('./file.js');

/**
 * 引自backbone，非常牛逼的正则
 * @param route
 * @returns {RegExp}
 */
function getRegExp(route) {
  var optionalParam = /\((.*?)\)/g;
  var namedParam = /(\(\?)?:\w+/g;
  var splatParam = /\*\w+/g;
  var escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;
  route = route.replace(escapeRegExp, '\\$&')
    .replace(optionalParam, '(?:$1)?')
    .replace(namedParam, function (match, optional) {
      return optional ? match : '([^/?]+)';
    })
    .replace(splatParam, '([^?]*?)');
  return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
} 

var defaultAction,routes={};

/**
 * 路由入口函数
 * 
 * @param {Object} routes 
 */
function Route(routes, defaultAction) {
  if(this instanceof Route){
    return Route(routes,defaultAction);
  }
  defaultAction = defaultAction;
  routes = routes;
}
  function set(path, fn) {
    typeof path === 'string' ? (routes[path] = fn || defaultAction) : Array.isArray(path) ? (path.forEach((v) => {
      Object.assign(routes, v);
    })) : Object.assign(routes, key);
    //增加链式调用
    return this;
  }
  function get(path) {
    return routes[path];
  }
  function remove(path) {
    routes[path] && delete routes[path];
  }
  function handle() {
    var found = false;
    for (var path in Route.routes) {
      var reg = getRegExp(path);
      var result = reg.exec(url);
      if (result && result[0] && result[0] != '') {
        var handler = Route.routes[path];
        handler && handler.apply(null, result.slice(1));
        found = true;
        break;
      }
    }
    if (!found && defaultAction) {
      defaultAction();
    }
  }

module.exports = {
  init:Route,
  set:set,
  get:get,
  remove:remove,
  handle:handle
};