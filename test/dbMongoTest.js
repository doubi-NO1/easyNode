let dbMongo = require('../plugin/db/dbMongo.js');
let should = require('should');
let mocha = require('mocha');
let runtime = require('babel-plugin-transform-runtime');
let polyfill = require('babel-polyfill');

let address = 'mongodb://127.0.0.1:27017';
let dbName = 'test'
let table = 'tb_test';
let allLength = 0;
let searchTerms = "";

module.exports = async () => {
  try {
    describe('Mongo构造函数传参', () => {
      it('当传入的参数为null时应该抛出类型错误提示信息', async () => {
        try {
          let mongo1 = await dbMongo();
        } catch (e) {
          let msg = e.ok;
          msg.should.eql(-1);
        }
      });
      it('当传入的参数为String时应该抛出"不能没有数据库地址"', async () => {
        try {
          let mongo1 = await dbMongo('172.123.12.1');
        } catch (e) {
          let msg = e.es;
          msg.should.eql('不能没有数据库地址');
        }
      });
      it('当传入的参数为{}时应该抛出"不能没有数据库地址"', async () => {
        try {
          let mongo1 = await dbMongo({});
        } catch (e) {
          let msg = e.es;
          msg.should.eql('不能没有数据库地址');
        }
      });
    });
    describe('数据库地址', () => {
      it('当传入错误的数据库地址时应该抛出错误提示信息', async () => {
        try {
          let mongo1 = await dbMongo({
            'dbAddress': '47.94.207.219:27017',
            dbName: dbName
          });
        } catch (e) {
          let msg = e.ok;
          msg.should.eql(-1);
        }
      });
    });
    describe('Mongo构造函数方法', () => {
      describe('#insert()', () => {
        it("插入数据后返回的对象的n属性应该为插入的条数", async () => {
          let mongo1 = await dbMongo({
            'dbAddress': address,
            dbName:dbName
          });
          let data = await mongo1.insert({
            table: table,
            data: [{
              "name": "liwei",
              "age": "12",
              "sex": "男"
            }, {
              "name": "张三",
              "age": "23",
              "sex": "nv"
            }]
          });
          data.n.should.eql(2);
        });
        it("插入的为空数据会抛出错误", async () => {
          try {
            let mongo1 = await dbMongo({
              'dbAddress': address,
              dbName: dbName
            });
            let data = await mongo1.insert({
              table: table,
              data: []
            });
          } catch (e) {
            let ok = e.ok;
            ok.should.eql(-1);
          }
        });
        it("没有传data参数时会抛出错误", async () => {
          try {
            let mongo1 = await dbMongo({
              'dbAddress': address,
              dbName: dbName
            });
            let data = await mongo1.insert({
              table: table
            });
          } catch (e) {
            let ok = e.ok;
            ok.should.eql(-1);
          }
        });
      });
      describe('#find()', () => {
        it("#find() 查找所有信息", async () => {
          let mongo1 = await dbMongo({
            'dbAddress': address,
            dbName: dbName
          });
          let data = await mongo1.find({
            'table': table
          });
          let list = data.list;
          list.should.not.be.empty;
        });
        it("调用find方法时传入错误的数据库地址时应该抛出错误信息", async () => {
          try {
            let mongo1 = await dbMongo({
              'dbAddress': '47.94.207.219:27017',
              dbName: dbName
            });
            let data = await mongo1.find({
              'table': table
            });
          } catch (e) {
            console.log(e);
            let msg = e.ok;
            msg.should.eql(-1);
          }
        });
        it('#findOne()查找符合条件的信息', async () => {
          let mongo1 = await dbMongo({
            'dbAddress': address,
            dbName: dbName
          });
          let data = await mongo1.findOne({
            'table': table,
            'terms': {
              'name': '张三'
            }
          });
          let name = data.obj.name;
          name.should.be.eql('张三');
        });
      });
      describe('#update()', () => {
        it('将name值为liwei的全部替换成lili', async () => {
          let mongo1 = await dbMongo({
            'dbAddress': address,
            dbName: dbName
          });
          let data = await mongo1.update({
            'table': table,
            'terms': {
              'name': 'liwei'
            },
            'data': {
              'name': 'lili'
            }
          });
          let ok = data.ok;
          ok.should.be.eql(1);
        });
        it('terms为空时会把数据库里所有的数据都替换', async () => {
          let mongo1 = await dbMongo({
            'dbAddress': address,
            dbName: dbName
          });
          let data = await mongo1.update({
            'table': table,
            'terms': {},
            'data': {
              'name': 'lili'
            }
          });
          let ok = data.ok;
          ok.should.be.eql(1);
        });
        it('data为空时会抛出错误信息', async () => {
          try {
            let mongo1 = await dbMongo({
              'dbAddress': address,
              dbName: dbName
            });
            let data = await mongo1.update({
              'table': table,
              'terms': {},
              'data': {}
            });

          } catch (e) {
            let ok = e.ok;
            ok.should.be.eql(-1);
          }

        });
        it('不传terms对象时会抛出错误信息', async () => {
          try {
            let mongo1 = await dbMongo({
              'dbAddress': address,
              dbName: dbName
            });
            let data = await mongo1.update({
              'table': table,
              'data': {}
            });
          } catch (e) {
            let ok = e.ok;
            ok.should.be.eql(-1);
          }
        });
        it('不传data对象时会抛出错误信息', async () => {
          try {
            let mongo1 = await dbMongo({
              'dbAddress': address,
              dbName: dbName
            });
            let data = await mongo1.update({
              'table': table,
              'terms': {}
            });
          } catch (e) {
            let ok = e.ok;
            ok.should.be.eql(-1);
          }
        });
      });
      describe('#remove()', () => {
        it('删除相应条件的数据', async () => {
          let mongo1 = await dbMongo({
            'dbAddress': address,
            dbName: dbName
          });
          let data = await mongo1.remove({
            'table': table,
            'terms': {
              'name': 'lili',
              'age': '12'
            }
          });
          let ok = data.ok;
          ok.should.be.eql(1);
        });
        it('terms为空对象时将所有的数据都删除', async () => {
          let mongo1 = await dbMongo({
            'dbAddress': address,
            dbName: dbName
          });
          let data = await mongo1.remove({
            'table': table,
            'terms': {}
          });
          let ok = data.ok;
          ok.should.eql(1);
        });
        it('不传terms对象时会删除所有数据', async () => {
          let mongo1 = await dbMongo({
            'dbAddress': address,
            dbName: dbName
          });
          let data = await mongo1.remove({
            'table': table
          });
          let ok = data.ok;
          ok.should.eql(1);
        });
      });
    });
  } catch (e) {
    console.log(e);
  }
};