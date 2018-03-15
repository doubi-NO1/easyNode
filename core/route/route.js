'use strict'

const url = require('url'),
  is = require('../utils').is;


/**
 * url路由
 * @author 巴神
 */

/**
 * 引自backbone，非常牛逼的正则
 * @param {Array} route
 * @returns {RegExp}
 */
const getRegExp = (route) => {
  var optionalParam = /\((.*?)\)/g;
  var namedParam = /(\(\?)?:\w+/g;
  var splatParam = /\*\w+/g;
  var escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;
  route = route.replace(escapeRegExp, '\\$&')
    .replace(optionalParam, '(?:$1)?')
    .replace(namedParam, (match, optional) => {
      return optional ? match : '([^/?]+)';
    })
    .replace(splatParam, '([^?]*?)');
  return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
}


/**
 * @param {Array} routes 路由
 * @param {Function} 未匹配到路由时的回调函数
 */
class Route {
  constructor(routes) {
    if (!this instanceof Route) {
      return new Route(routes);
    }
    this.routes = {
      GET: {

      },
      POST: {

      },
      PUT: {

      },
      DELETE: {

      }
    };
    this.defaultAction = (req, res) => {
      res.writeHead('404', {
        'Content-Type': 'text/html'
      });
      res.write('<h1>您访问的地址不存在...</h1>');
      res.end();
    }
    this.setup(routes || []);
  }
  /**
   * @description 注册一个get类型的接口
   * @param {String} path 接口地址
   * @param {Function} callback 对应处理逻辑
   */
  get(path, callback) {
    is.Function(callback) && (this.routes.GET[path] = callback);
    return this;
  }
  /**
   * @description 注册一个post类型的接口
   * @param {String} path 接口地址
   * @param {Function} callback 对应处理逻辑
   */
  post(path, callback) {
    is.Function(callback) && (this.routes.POST[path] = callback);
    return this;
  }
  /**
   * @description 注册一个接口,既支持get，也支持post
   * @param {String} path 接口地址
   * @param {Function} callback 对应处理逻辑
   */
  both(path, callback) {
    is.Function(callback) && (this.routes.POST[path] = callback, this.routes.GET[path] = callback);
    return this;
  }
  /**
   * 
   * @param {Array} routes 接口
   * @example 示例：
   * route.setup([{
   *     type: 'get',
   *     queryA() {
   *       res += 'queryA'
   *     }
   *  }, {
   *     type: 'post',
   *     queryB() {
   *        res += 'queryB'
   *     }
   *  },
   *  {
   *     queryC() {
   *        res += 'queryC'
   *     }
   *   }
   * }])
   */
  setup(routes) {
    if(!is.Array(routes)) return;
    routes.forEach(v => {
      let type, callback, path;
      Object.keys(v).forEach((prop) => {
        prop == 'type' && (type = v[prop]);
        is.Function(v[prop]) && (path = prop, callback = v[prop]);
      });
      callback && (!type ? this.both(path, callback) : type == '*' ? this.defaultAction = callback : this[type](path, callback));
    });
  }
  handle(app, req, res) {
    let found = false,
      _path = url.parse(req.url).pathname;
    const routes = this.routes[req.method];
    for (let path in routes) {
      let reg = getRegExp(path),
        result = reg.exec(_path);
      if (result && result[0] && result[0] != '') {
        routes[path] && routes[path](app, req, res, result.slice(1));
        found = true;
        break;
      }
    }
    if (!found && this.defaultAction) {
      this.defaultAction(app, req, res);
    }
  }
}

module.exports = Route;