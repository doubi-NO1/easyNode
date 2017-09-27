// let Mysql = require('../core/db/dbMysql.js');
// let mysql = new Mysql({
//   connectionLimit: 10,
//   host: '',
//   port: '3306',
//   user: 'root',
//   password: '7crH5H7KbuHx5YdL',
//   database: 'test',
// });

// (async() => {
//   try {
//     console.log('新增单条成功', await mysql.insert({
//       tbName: 'tb_test',
//       data: {
//         name: '测试数据n',
//         description: '啊哈哈b'
//       }
//     }));
//   } catch (e) {
//     console.log('新增单条失败', e);
//   }
// })();

// (async() => {
//   try {
//     console.log('新增多条成功', await mysql.insert({
//       tbName: 'tb_test',
//       data: [{
//         name: '测试数据4',
//         description: '啊哈哈4'
//       }, {
//         name: '测试数据5',
//         description: '啊哈哈5'
//       }, {
//         name: '测试数据6',
//         description: '啊哈哈6'
//       }]
//     }));
//   } catch (e) {
//     console.log('新增多条失败', e);
//   }
// })();

// (async() => {
//   try {
//     console.log('查询成功', await mysql.select({
//       tbName: 'tb_test',
//       terms: {
//         name: '测试数据n',
//         description: '啊哈哈'
//       }
//     }));
//   } catch (e) {
//     console.log('查询失败', e);
//   }
// })();

// (async() => {
//   try {
//     console.log('更新成功', await mysql.update({
//       tbName: 'tb_test',
//       data: {
//         description: 'description2'
//       },
//       terms: [{
//         field: 'name',
//         value: '%测试数据%',
//         term: 'like'
//       }, {
//         field: 'description',
//         value: '%啊哈哈%',
//         term: 'like'
//       }]
//     }));
//   } catch (e) {
//     console.log('更新失败', e);
//   }
// })();

// (async() => {
//   try {
//     console.log('删除成功', mysql.remove({
//       tbName: 'tb_test1',
//       terms: [{
//         field: 'name',
//         value: '%test%',
//         term: 'like'
//       }]
//     }));
//   } catch (e) {
//     console.log('删除失败', e);
//   }
// })();
let mySql = require('../core/db/dbMysql.js');
let should = require('should');
let mocha = require('mocha');
let runtime = require('babel-plugin-transform-runtime');
let polyfill = require('babel-polyfill');

let tbName = 'tb_test';

(async() => {
    try {
        // describe('mySql简单操作', () => {
        //     describe('#query()', () => {
        //         it('查询数据-select', async () => {
        //             try{
        //                 let sql = await new mySql({
        //                     host: '47.94.207.219',
        //                     port: '3306',
        //                     user: 'root',
        //                     password: '7crH5H7KbuHx5YdL',
        //                     database: 'test',
        //                  });
        //                  let data = await sql.query('select id,name from '+tbName+' where id > 20',{
        //                      tbName: tbName,
        //                      terms: ['id','name']
        //                  });
        //                  data.es.should.be.eql('success');
        //             }catch (e) {
        //                 console.log(e);
        //             }
        //         });
        //     });
        //     describe('#insert()', () => {
        //         it('增加数据-数组格式', async() => {
        //             try {
        //                 let sql = await new mySql({
        //                     host: '47.94.207.219',
        //                     port: '3306',
        //                     user: 'root',
        //                     password: '7crH5H7KbuHx5YdL',
        //                     database: 'test',
        //                 });
        //                 let data = await sql.insert({
        //                     tbName: tbName,
        //                     data: [{
        //                         id:'76',
        //                         name: 'aaa',
        //                         description: 'aaa'
        //                     },{
        //                         id:'77',
        //                         name: 'ccc',
        //                         description: 'ccc'
        //                     },{
        //                         id:'78',
        //                         name: 'vvv',
        //                         description: 'ccc'
        //                     }]
        //                 });
        //                 let total = data.total;
        //                 total.should.be.eql(3);
        //             } catch(e) {
        //                 console.log(e);
        //             }
        //         });
        //         it('增加数据-对象格式', async() => {
        //             try {
        //                 let sql = await new mySql({
        //                     host: '47.94.207.219',
        //                     port: '3306',
        //                     user: 'root',
        //                     password: '7crH5H7KbuHx5YdL',
        //                     database: 'test',
        //                  });
        //                 let data = await sql.insert({
        //                     tbName: tbName,
        //                     data: {
        //                         id:'76',
        //                         name: 'aaa',
        //                         description: 'aaa'
        //                     }
        //                 });
        //                 let total = data.total;
        //                 total.should.be.eql(1);
        //             } catch(e) {
        //                 console.log(e);
        //             }
        //         });
        //     });
        //     describe('#update()', () => {
        //         it('更新数据', async () => {
        //             try {
        //                 let sql = await new mySql({
        //                     connectionLimit: 10,
        //                     host: '47.94.207.219',
        //                     port: '3306',
        //                     user: 'root',
        //                     password: '7crH5H7KbuHx5YdL',
        //                     database: 'test',
        //                 });
        //                 let data = await sql.update({
        //                     tbName: 'tb_test',
        //                     data: {
        //                         description: 'description2'
        //                     },
        //                     terms: [{
        //                         field: 'name',
        //                         value: '%4',
        //                         term: 'like'
        //                     }, {
        //                         field: 'description',
        //                         value: '%2',
        //                         term: 'like'
        //                     }]
        //                 });
        //                 let es = data.es;
        //                 es.should.be.eql('success');
        //             } catch (e) {
        //                 console.log(e);
        //             }
        //         });
        //     });
        //     describe('#select()', () => {
        //         it('选择固定列的数据', async ()=>{
        //             try {
        //                 let sql = await new mySql({
        //                     connectionLimit: 10,
        //                     host: '47.94.207.219',
        //                     port: '3306',
        //                     user: 'root',
        //                     password: '7crH5H7KbuHx5YdL',
        //                     database: 'test',
        //                 });
        //                 let data = await sql.select({
        //                     tbName: tbName,
        //                     fields: ['name','id'],
        //                     terms: {
        //                         name: '146',
        //                         description: 'description2'
        //                     }
        //                 });
        //                 let es = data.es;
        //                 es.should.be.eql('success');
        //             } catch(e) {
        //                 console.log(e);
        //             }
        //         });
        //         it('选择所有列的数据', async ()=>{
        //             try {
        //                 let sql = await new mySql({
        //                     connectionLimit: 10,
        //                     host: '47.94.207.219',
        //                     port: '3306',
        //                     user: 'root',
        //                     password: '7crH5H7KbuHx5YdL',
        //                     database: 'test',
        //                 });
        //                 let data = await sql.select({
        //                     tbName: tbName,
        //                     terms: {
        //                         name: '14',
        //                         description: 'description%'
        //                     }
        //                 });
        //                 let es = data.es;
        //                 es.should.be.eql('success');
        //             } catch(e) {
        //                 console.log(e);
        //             }
        //         });
        //     });
        //    describe('#remove()', () => {
        //         it('移除数据-数组形式', async () => {
        //             try {
        //                 let sql = await new mySql({
        //                     host: '47.94.207.219',
        //                     port: '3306',
        //                     user: 'root',
        //                     password: '7crH5H7KbuHx5YdL',
        //                     database: 'test',
        //                  });
        //                  let data = await sql.remove({
        //                     tbName: 'tb_test1',
        //                     terms: [{
        //                         field: 'name',
        //                         value: '%4',
        //                         term: 'like'
        //                     }]
        //                  });
        //                  let es = data.es;
        //                  es.should.be.eql('事物执行成功');
        //             } catch(e) {
        //                 console.log(e);
        //             }
        //         });
        //         it('移除数据-对象形式', async () => {
        //             try {
        //                 let sql = await new mySql({
        //                     host: '47.94.207.219',
        //                     port: '3306',
        //                     user: 'root',
        //                     password: '7crH5H7KbuHx5YdL',
        //                     database: 'test',
        //                  });
        //                  let data = await sql.remove({
        //                     tbName: 'tb_test1',
        //                     terms: {
        //                         field: 'name',
        //                         value: '%4',
        //                         term: 'like'
        //                     }
        //                  });
        //                  let es = data.es;
        //                  es.should.be.eql('事物执行成功');
        //             } catch(e) {
        //                 console.log(e);
        //             }
        //         });
        //    });
        // });
        describe('mySql事物操作',() => {
            // it('事物构造器实例应该有connection属性', async () => {
            //     try {
            //         let sql = await new mySql({
            //             host: '47.94.207.219',
            //             port: '3306',
            //             user: 'root',
            //             password: '7crH5H7KbuHx5YdL',
            //             database: 'test',
            //         });
            //         let data = await sql.sqlTransaction();
            //         data.should.have.property('connection');
            //     } catch(e) {
            //         console.log(e);
            //     }
            // });
            // it('调用多个操作', async () => {
            //     try{
            //         let sql = await new mySql({
            //             host: '47.94.207.219',
            //             port: '3306',
            //             user: 'root',
            //             password: '7crH5H7KbuHx5YdL',
            //             database: 'test',
            //         });
            //         await sql.insert({
            //             tbName: tbName,
            //             data: [{
            //                 'name':'铭铭',
            //                 'description': 'mignming'
            //             },{
            //                 'name': '早早',
            //                 'description': 'zaozao'
            //             },{
            //                 'name': '玩玩',
            //                 'description': 'wanwan'
            //             }]
            //         });
            //         await sql.update({
            //             tbName: tbName,
            //             data: {
            //                 'name': '命名'
            //             },
            //             terms: {
            //                 'id': 64
            //             }
            //         });
            //         let data = await sql.select({
            //             tbName: tbName,
            //             terms: {
            //                  id:64
            //             },
            //             fields: ['name','id']
            //         });
            //         data.es.should.eql('success');
            //     } catch (e) {
            //         console.log(e);
            //     }
            // });
            it('同表多个sql事物操作', async () => {
                try {
                    let sql = await new mySql({
                        host: '47.94.207.219',
                        port: '3306',
                        user: 'root',
                        password: '7crH5H7KbuHx5YdL',
                        database: 'test',
                    });
                    let art = [
                        "delete from tb_test where id=101",
                        "insert into " + tbName + "values (101,'张三三','zhangsansan')",
                        "select id,name from " + tbName + "where id = 101",
                        "INSERT into "+ tbName +"(name,description) VALUES ('王进','wangjin')",
                        "UPDATE "+ tbName +" SET name = '张张' WHERE id=90"
                    ];
                    let tran = await sql.sqlTransaction();
                    art.forEach((v) => {
                        tran.add(v);
                    });
                    await tran.exec();
                    let data = await sql.select({
                        tbName: tbName,
                        terms: {
                            id: 101
                        }
                    });
                    console.log(data);
                    // data.total.should.eql(5);
                } catch(e) {
                    console.log(e);
                }
            });
            // it('连表多个sql事物操作', async () => {
            //     try {
            //         let sql = await new mySql({
            //             host: '47.94.207.219',
            //             port: '3306',
            //             user: 'root',
            //             password: '7crH5H7KbuHx5YdL',
            //             database: 'test',
            //         });
            //         let art = [
            //             'insert into tb_test(id,name,description) values (200,"往往","wangwang")',
            //             'insert into tb_order values (23,9,200)',
            //             'select tb_test.name,tb_test.description,tb_order.order,t_order.t_id from tb_test,tb_order where tb_test.id = tb_order.t_id'
            //         ];
            //         let tran = await sql.sqlTransaction();
            //         art.forEach((v) => {
            //             tran.add(v);
            //         });
            //         let data = await tran.exec();
            //         console.log(data);
            //         data.total.should.eql(3);
            //     }catch(e) {
            //         console.log(e);
            //     }
            // });
            // it('连表多个sql事物操作其中有错误应该回退', async () => {
            //     try {
            //         let sql = await new mySql({
            //             host: '47.94.207.219',
            //             port: '3306',
            //             user: 'root',
            //             password: '7crH5H7KbuHx5YdL',
            //             database: 'test',
            //         });
            //         let art = [
            //             'insert into tb_test(id,name,description) values (200,"往往","wangwang")',
            //             'insert into tb_order(order,t_id) values (9,200)',
            //             'select tb_test.name,tb_test.description,tb_order.order,tb_order.t_id from tb_test,tb_order where tb_test.id = tb_order.t_id'
            //         ];
            //         let tran = await sql.sqlTransaction();
            //         art.forEach((v) => {
            //             tran.add(v);
            //         });
            //         let data = await tran.exec();
            //         console.log(data);
            //         data.total.should.eql(3);
            //     }catch(e) {
            //         console.log(e);
            //     }
            // });
        });
    } catch(e) {
        console.log(e);
    }
})();