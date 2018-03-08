/**
 * 接口代理层
 * @author 巴神
 */
'use strict'

class Controller {
  constructor(req,res){
    
  }
}

let _interface = {
  get: {

  },
  post: {

  },
  any: { //any代表既可以post又可以get

  },
  catalog: { //接口目录

  }
};
/** 
 * @description 注册post接口
 * @param url 路由路径,
 * @param fn  对应处理逻辑
 */
let post = (url, fn) => {
  _interface.post[url] = fn;
  _interface.catalog[url] = 'post';
},

  /** 
   * @description 注册get接口
   * @param url 路由路径,
   * @param fn  对应处理逻辑
   */
  get = (url, fn) => {
    _interface.get[url] = fn;
    _interface.catalog[url] = 'get';
  },

  /** 
   * @description 注册一个既支持post又支持get的接口
   * @param url 路由路径,
   * @param fn  对应处理逻辑
   */
  any = (url, fn) => {
    _interface.any[url] = fn;
    _interface.catalog[url] = 'any';
  },

  /**
   * @description 注册(装载)一组路由
   * @param 路由组
   * @example _interface.setup([{
   *         type: 'get',
   *         queryA() {
   *           res += 'queryA'
   *         }
   *       }, {
   *         type: 'post',
   *         queryB() {
   *           res += 'queryB'
   *         }
   *       },
   *       {
   *         queryC() {
   *           res += 'queryC'
   *         }
   *       }
   */
  setup = (_interfaces) => {
    _interfaces.forEach(v => {
      let type, callback, url;
      Object.keys(v).forEach((prop) => {
        prop == 'type' && (type = v[prop]);
        v[prop] instanceof Function && (url = prop, callback = v[prop]);
      });
      callback && (_interface[type || 'any'][url] = callback);
      _interface.catalog[url] = type || 'any';
    });
  },

  /**
   * @description 执行路由对应的处理逻辑
   * @param url 路由地址
   * @param req 请求request
   * @param res 请求response
   */
  handle = (url, req, res) => {
    let type = _interface.catalog[url];
    type && _interface[type][url](req, res);
  };

module.exports = {
  post,
  get,
  any,
  setup,
  handle
};