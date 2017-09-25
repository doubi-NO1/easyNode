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
        describe('mySql', () => {
            describe('#insert()', () => {
                it('增加数据-数组格式', async() => {
                    try {
                        let sql = await new mySql({
                            host: '47.94.207.219',
                            port: '3306',
                            user: 'root',
                            password: '7crH5H7KbuHx5YdL',
                            database: 'test',
                         });
                        let data = await sql.insert({
                            tbName: tbName,
                            data: [{
                                id:'76',
                                name: 'aaa',
                                description: 'aaa'
                            },{
                                id:'77',
                                name: 'ccc',
                                description: 'ccc'
                            },{
                                id:'78',
                                name: 'vvv',
                                description: 'ccc'
                            }]
                        });
                        let total = data.total;
                        total.should.be.eql(3);
                    } catch(e) {
                        console.log(e);
                    }
                });
            });
            describe('#insert()', () => {
                it('增加数据-对象格式', async() => {
                    try {
                        let sql = await new mySql({
                            host: '47.94.207.219',
                            port: '3306',
                            user: 'root',
                            password: '7crH5H7KbuHx5YdL',
                            database: 'test',
                         });
                        let data = await sql.insert({
                            tbName: tbName,
                            data: {
                                id:'76',
                                name: 'aaa',
                                description: 'aaa'
                            }
                        });
                        let total = data.total;
                        total.should.be.eql(3);
                    } catch(e) {
                        console.log(e);
                    }
                });
            });
            describe('#update()', () => {
                it('更新数据', async () => {
                    try {
                        let sql = await new mySql({
                            connectionLimit: 10,
                            host: '47.94.207.219',
                            port: '3306',
                            user: 'root',
                            password: '7crH5H7KbuHx5YdL',
                            database: 'test',
                        });
                        let data = await sql.update({
                            tbName: 'tb_test',
                            data: {
                                description: 'description2'
                            },
                            terms: [{
                                field: 'name',
                                value: '%6%',
                                term: 'like'
                            }, {
                                field: 'description',
                                value: '%啊哈哈%',
                                term: 'like'
                            }]
                        });
                        let es = data.es;
                        es.should.be.eql('success');
                    } catch (e) {
                        console.log(e);
                    }
                });
            });
            describe('#select()', () => {
                it('选择数据', async ()=>{
                    try {
                        let sql = await new mySql({
                            connectionLimit: 10,
                            host: '47.94.207.219',
                            port: '3306',
                            user: 'root',
                            password: '7crH5H7KbuHx5YdL',
                            database: 'test',
                        });
                        let data = await sql.select({
                            tbName: tbName,
                            terms: {
                                name: '14',
                                description: 'description%'
                            }
                        });
                        let es = data.es;
                        es.should.be.eql('success');
                    } catch(e) {
                        console.log(e);
                    }
                });
            });
           describe('#remove()', () => {
                it('移除数据-数组形式', async () => {
                    try {
                        let sql = await new mySql({
                            host: '47.94.207.219',
                            port: '3306',
                            user: 'root',
                            password: '7crH5H7KbuHx5YdL',
                            database: 'test',
                         });
                         let data = await sql.remove({
                            tbName: 'tb_test1',
                            terms: [{
                                field: 'name',
                                value: '%4',
                                term: 'like'
                            }]
                         });
                         let es = data.es;
                         es.should.be.eql('success');
                    } catch(e) {
                        console.log(e);
                    }
                });
                it('移除数据-对象形式', async () => {
                    try {
                        let sql = await new mySql({
                            host: '47.94.207.219',
                            port: '3306',
                            user: 'root',
                            password: '7crH5H7KbuHx5YdL',
                            database: 'test',
                         });
                         let data = await sql.remove({
                            tbName: 'tb_test1',
                            terms: {
                                field: 'name',
                                value: '%4',
                                term: 'like'
                            }
                         });
                         let es = data.es;
                         es.should.be.eql('success');
                    } catch(e) {
                        console.log(e);
                    }
                });
           });
        });
    } catch(e) {
        console.log(e);
    }
})();