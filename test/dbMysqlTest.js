// let mySql = require('../core/db/dbMysql.js');
// let mysql = new Mysql({
//   connectionLimit: 10,
//   host: '',
//   port: '3306',
//   user: 'test2',
//   password: 'ycdn8Tm5Nj',
//   database: 'test2',
// });

// (async() => {
//   try {
//     console.log('新增单条成功', await mysql.insert({
//       tbName: 'test2',
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
//       tbName: 'test2',
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
//       tbName: 'test2',
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
//       tbName: 'test2',
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
//     let sql = await new mySql({
//         host: '47.94.207.219',
//         port: '3306',
//         user: 'test2',
//         password: 'ycdn8Tm5Nj',
//         database: 'test2',
//         });
//     let art = [
//         "delete from test2 where id = 101",
//         "insert into test2 (id,name) values (101,'张三三','zhangsansan')",
//         "select id,name from test2 where id = 101",
//         "INSERT into test2 (name,description) VALUES ('王进','wangjin')",
//         "UPDATE test2 SET name = 'lili' WHERE id=90"
//     ];
//     let tran = await sql.sqlTransaction();
//     art.forEach((v) => {
//         tran.add(v);
//     });
//     let data = await tran.exec();
//     console.log(data);
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

module.exports = async () => {
    try {
        describe('mySql简单操作', () => {
            describe('#query()', () => {
                it('查询数据-select', async () => {
                    try {
                        let sql = await new mySql({
                            host: '47.94.207.219',
                            port: '3306',
                            user: 'test2',
                            password: 'ycdn8Tm5Nj',
                            database: 'test2',
                        });
                        let data = await sql.query('select id,name from ' + tbName + ' where id > 20', {
                            tbName: tbName,
                            terms: ['id', 'name']
                        });
                        data.es.should.be.eql('success');
                    } catch (e) {
                        console.log(e);
                    }
                });
            });
            describe('#insert()', () => {
                it('增加数据-数组格式', async () => {
                    try {
                        let sql = await new mySql({
                            host: '47.94.207.219',
                            port: '3306',
                            user: 'test2',
                            password: 'ycdn8Tm5Nj',
                            database: 'test2',
                        });
                        let data = await sql.insert({
                            tbName: tbName,
                            data: [{
                                name: 'aaa',
                                description: 'aaa'
                            }, {
                                name: 'ccc',
                                description: 'ccc'
                            }, {
                                name: 'vvv',
                                description: 'ccc'
                            }]
                        });
                        let total = data.total;
                        total.should.be.eql(3);
                    } catch (e) {
                        console.log(e);
                    }
                });
                it('增加数据-对象格式', async () => {
                    try {
                        let sql = await new mySql({
                            host: '47.94.207.219',
                            port: '3306',
                            user: 'test2',
                            password: 'ycdn8Tm5Nj',
                            database: 'test2',
                        });
                        let data = await sql.insert({
                            tbName: tbName,
                            data: {
                                name: 'aaa',
                                description: 'aaa'
                            }
                        });
                        let total = data.total;
                        total.should.be.eql(1);
                    } catch (e) {
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
                            user: 'test2',
                            password: 'ycdn8Tm5Nj',
                            database: 'test2',
                        });
                        let data = await sql.update({
                            tbName: tbName,
                            data: {
                                description: 'description2'
                            },
                            terms: [{
                                field: 'name',
                                value: '%4',
                                term: 'like'
                            }, {
                                field: 'description',
                                value: '%2',
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
                it('选择固定列的数据', async () => {
                    try {
                        let sql = await new mySql({
                            connectionLimit: 10,
                            host: '47.94.207.219',
                            port: '3306',
                            user: 'test2',
                            password: 'ycdn8Tm5Nj',
                            database: 'test2',
                        });
                        let data = await sql.select({
                            tbName: tbName,
                            fields: ['name', 'id'],
                            terms: {
                                name: '146',
                                description: 'description2'
                            }
                        });
                        let es = data.es;
                        es.should.be.eql('success');
                    } catch (e) {
                        console.log(e);
                    }
                });
                it('选择所有列的数据', async () => {
                    try {
                        let sql = await new mySql({
                            connectionLimit: 10,
                            host: '47.94.207.219',
                            port: '3306',
                            user: 'test2',
                            password: 'ycdn8Tm5Nj',
                            database: 'test2',
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
                    } catch (e) {
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
                            user: 'test2',
                            password: 'ycdn8Tm5Nj',
                            database: 'test2',
                        });
                        let data = await sql.remove({
                            tbName: tbName,
                            terms: [{
                                name: '%4%',
                                term: 'like'
                            }]
                        });
                        let es = data.es;
                        es.should.be.eql('事物执行成功');
                    } catch (e) {
                        console.log(e);
                    }
                });
                it('移除数据-对象形式', async () => {
                    try {
                        let sql = await new mySql({
                            host: '47.94.207.219',
                            port: '3306',
                            user: 'test2',
                            password: 'ycdn8Tm5Nj',
                            database: 'test2',
                        });
                        let data = await sql.remove({
                            tbName: tbName,
                            terms: {
                                field: 'name',
                                value: '16'
                            }
                        });
                        let es = data.es;
                        es.should.be.eql('事物执行成功');
                    } catch (e) {
                        console.log(e);
                    }
                });
            });
        });
        describe('mySql事物操作', () => {
            it('事物构造器实例应该有connection属性', async () => {
                try {
                    let sql = await new mySql({
                        host: '47.94.207.219',
                        port: '3306',
                        user: 'test2',
                        password: 'ycdn8Tm5Nj',
                        database: 'test2',
                    });
                    let data = await sql.sqlTransaction();
                    data.should.have.property('connection');
                } catch (e) {
                    console.log(e);
                }
            });
            it('调用多个操作', async () => {
                try {
                    let sql = await new mySql({
                        host: '47.94.207.219',
                        port: '3306',
                        user: 'test2',
                        password: 'ycdn8Tm5Nj',
                        database: 'test2',
                    });
                    await sql.remove({
                        tbName: tbName,
                        terms: {
                            'name': '命名'
                        }
                    });
                    await sql.insert({
                        tbName: tbName,
                        data: [{
                            'name': '铭铭',
                            'description': 'mignming'
                        }, {
                            'name': '早早',
                            'description': 'zaozao'
                        }, {
                            'name': '玩玩',
                            'description': 'wanwan'
                        }]
                    });
                    await sql.update({
                        tbName: tbName,
                        data: {
                            'name': '命名'
                        },
                        terms: {
                            'name': '早早'
                        }
                    });
                    let data = await sql.select({
                        tbName: tbName,
                        terms: {
                            name: '命名'
                        },
                        fields: ['name', 'id']
                    });
                    data.es.should.eql('success');
                } catch (e) {
                    console.log(e);
                }
            });
            it('同表多个sql事物操作', async () => {
                try {
                    let sql = await new mySql({
                        host: '47.94.207.219',
                        port: '3306',
                        user: 'test2',
                        password: 'ycdn8Tm5Nj',
                        database: 'test2',
                    });
                    let art = [
                        "delete from tb_test where id = 101",
                        "insert into tb_test values (101,'张三三','zhangsansan')",
                        "select id,name from tb_test where id = 101",
                        "INSERT into tb_test (name,description) VALUES ('王进','wangjin')",
                        "UPDATE tb_test SET name = 'lili' WHERE id=90"
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
                    data.es.should.eql('success');
                } catch (e) {
                    console.log(e);
                }
            });
            it('连表多个sql事物操作', async () => {
                try {
                    let sql = await new mySql({
                        host: '47.94.207.219',
                        port: '3306',
                        user: 'test2',
                        password: 'ycdn8Tm5Nj',
                        database: 'test2',
                    });
                    let art = [
                        'delete from tb_test where id = 200',
                        'delete from tb_order where id = 23',
                        'insert into tb_test (id,name,description) values (200,"往往","wangwang")',
                        'insert into tb_order values (23,9,200)'
                    ];
                    let tran = await sql.sqlTransaction();
                    art.forEach((v) => {
                        tran.add(v);
                    });
                    let data = await tran.exec();
                    data.total.should.eql(5);
                } catch (e) {
                    console.log(e);
                }
            });
            it('连表多个sql事物操作其中有错误应该回滚', async () => {
                try {
                    let sql = await new mySql({
                        host: '47.94.207.219',
                        port: '3306',
                        user: 'test2',
                        password: 'ycdn8Tm5Nj',
                        database: 'test2',
                    });
                    let art = [
                        "delete from tb_test where id = 101",
                        "insert into tb_test (id,name) values (101,'张三三','zhangsansan')",
                        "select id,name from tb_test where id = 101",
                        "INSERT into tb_test (name,description) VALUES ('王进','wangjin')",
                        "UPDATE tb_test SET name = 'lili' WHERE id=90"
                    ];
                    let tran = await sql.sqlTransaction();
                    art.forEach((v) => {
                        tran.add(v);
                    });
                    let data = await tran.exec();
                } catch (e) {
                    // console.log(e);
                    e.ec.should.eql(-1);
                }
            });
        });
    } catch (e) {
        console.log(e);
    }
};