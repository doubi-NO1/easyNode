let should = require('should');
let mocha = require('mocha');
let dbMongo = require('../core/db/dbMongo.js');
let runtime = require('babel-plugin-transform-runtime');
let polyfill = require('babel-polyfill');


(async () => {
  try {
    // let [mongo1,mongo2,mongo3] = await Promise.all([getMongo1(), getMongo2(), getMongo3()]);
    let mongo1 = await getMongo1({
      'dbAddress': 'mongodb://47.94.207.219:27017/test'
    });
    describe("Mongo构造函数查找（find）方法", () =>{
      it("查找表信息", () => {
        mongo1.find({
          'tbName': ''
        })
        // console.log(mongo1,mongo2);
        // mongo1.should.be.eql(mongo2);
        // "1".should.be.eql("1");
      });
    });
  } catch(e){
    console.log(e);
  }
})();
  // it("实例化Mongo时，传入参数的属性dbAddress值如果为空应该返回'不能没有数据库地址'", function(){

  // });
  // it("实例化Mongo时，如果传入参数的属性dbAddress有值，应该可以连上此数据库", function(){

  // });

// describe("Mongo构造函数原型对象", function(){
//   it("", function(){

//   });
// });
