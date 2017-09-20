let should = require('should');
let mocha = require('mocha');
let dbMongo = require('../core/db/dbMongo.js');
let runtime = require('babel-plugin-transform-runtime');
let polyfill = require('babel-polyfill');

let address = 'mongodb://47.94.207.219:27017/test';
let tbName = 'tb_test';
let allLength = 0;
let searchTerms = "";

(async () => {
  try {
    describe('Mongo构造函数方法', () => {
      describe('#find()', () => {
        it("查找所有信息", async () => {
          let mongo1 = await dbMongo({
            'dbAddress': address
          });
          let data = await mongo1.find({
            'tbName': tbName
          });
          console.log(data);
          // data.list.should.have.length(0);
        });
      });
    });
  } catch(e) {
    console.log(e);
  }
})();


