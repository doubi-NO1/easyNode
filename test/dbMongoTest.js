let should = require('should');
let dbMongo = require('../core/db/dbMongo.js');
let runtime = require('babel-plugin-transform-runtime');
let polyfill = require('babel-polyfill');

// function getMongo1(){
//   return  dbMongo({
//     dbAddress: "mongodb://47.94.207.219:27017/test"
//   });
// };
// function getMongo2(){
//   return dbMongo({
//     dbAddress: "mongodb://47.94.207.219:27017/test"
//   });
// };
// function getMongo3(){
//   return dbMongo({
//     dbAddress: "mongodb://47.94.207.219:27017/test"
//   });
// };

(async () => {
  console.log('aaa');
  // try {
  //   // let [mongo1,mongo2,mongo3] = await Promise.all([getMongo1(), getMongo2(), getMongo3()]);
  //   // let mongo1 = getMongo1();
  //   describe("Mongo构造函数", async () =>{
  //     it("Mongo的实例应该是唯一的", () => {
  //       // mongo1.should.be.eql(mongo2);
  //       "1".should.be.eql("1");
  //     });
  //   });
  // } catch(e){
  //   console.log(e);
  // }
})();
  // it("实例化Mongo时，传入参数的属性dbAddress值如果为空应该返回'不能没有数据库地址'", function(){

  // });
  // it("实例化Mongo时，如果传入参数的属性dbAddress有值，应该可以连上此数据库", function(){

  // });

// describe("Mongo构造函数原型对象", function(){
//   it("", function(){

//   });
// });
