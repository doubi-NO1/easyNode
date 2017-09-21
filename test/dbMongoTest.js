let dbMongo = require('../core/db/dbMongo.js');
let should = require('should');
let mocha = require('mocha');
let runtime = require('babel-plugin-transform-runtime');
let polyfill = require('babel-polyfill');

let address = 'mongodb://47.94.207.219:27017/test';
let tbName = 'tb_test';
let allLength = 0;
let searchTerms = "";

(async () => {
  try {
    describe('Mongo构造函数', () => {
      it('当传入的参数为空时应该抛出类型错误提示信息', async () => {
        try {
          let mongo1 = await dbMongo(); 
        } catch(e) {
          console.log(e);
          let msg = e.es;
          msg.should.containEql('null');
        }
      });
      it('当传入的参数为空对象时应该抛出"不能没有数据库地址"', async () => {
        try {
          let mongo1 = await dbMongo({}); 
        } catch(e) {
          let msg = e.es;
          msg.should.eql('不能没有数据库地址');
        }
      });
    });
    describe('Mongo构造函数方法', () => {
      // describe('#insert()', () => {
      //   it("插入数据后返回的对象的n属性应该为插入的条数", async () => {
      //     let mongo1 = await dbMongo({
      //       'dbAddress': address
      //     });
      //     let data = await mongo1.insert({
      //       tbName: tbName,
      //       data: [{
      //         "name": "liwei",
      //         "age": "12",
      //         "sex":"男"
      //       },{
      //         "name": "张三",
      //         "age": "23",
      //         "sex": "nv"
      //       }]
      //     });
      //     data.n.should.eql(2);
      //   });
      // });
        // it("#find() 查找所有信息", async () => {
        //   let mongo1 = await dbMongo({
        //     'dbAddress': address
        //   });
        //   let data = await mongo1.find({
        //     'tbName': tbName
        //   });
        //   let list = data.list;
        //   list.should.not.be.empty;
        // });
        // it('#findOne()查找符合条件的信息', async () => {
        //   let mongo1 = await dbMongo({
        //     'dbAddress': address
        //   });
        //   let data = await mongo1.findOne({
        //     'tbName': tbName,
        //     'terms': {
        //       'name': '张三'
        //     }
        //   });
        //   let name = data.obj.name;
        //   name.should.be.eql('张三');
        // });
        // it('#update()将name值为liwei的全部替换成lili', async () => {
        //   let mongo1 = await dbMongo({
        //     'dbAddress': address
        //   });
        //   let data = await mongo1.update({
        //     'tbName': tbName,
        //     'terms': {
        //       'name': 'liwei'
        //     },
        //     'data':{
        //       'name': 'lili'
        //     }
        //   });
        //   let ok = data.ok;
        //   ok.should.be.eql(1);
        // });
        // it('#remove()删除数据', async () => {
        //   let mongo1 = await dbMongo({
        //     'dbAddress': address
        //   });
        //   let data = await mongo1.remove({
        //     'tbName': tbName,
        //     'terms': {
        //       'name': 'lili',
        //       'age': '12'
        //     }
        //   });
        //   let ok = data.ok;
        //   ok.should.be.eql(1);
        // });
       
    });
  } catch(e) {
    console.log(e);
  }
})();


