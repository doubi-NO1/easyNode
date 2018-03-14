/**
 * @description 实现插件机制，丰富框架的扩展能力
 * @author 巴神
 */

module.exports = (app, plugins) => {
  for (var key in plugins) {
    app[key] = plugins[key];
  }
}