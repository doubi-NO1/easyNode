/**
 * url过滤(拦截)器中间件
 * @author 巴神
 */




function isNormalVisitor(url){
  //检测路径中是否包含 ../
  return !!url.match(/\.\.\//);
}