/**
 * mysql封装
 * @author 巴神
 * 2017/9/10
 * 暂时没有实现分页查询部分,以后补上
 */

'use strict'

const mysql = require('mysql');
const is = require('./lib/is');

//参考资料:https://github.com/mysqljs/mysql


/**
 * @description 生成 where 条件
 * 
 * @param {Object} 查询条件，可以是对象或数组 
 * @returns{string} 查询条件字符串
 */
const createWhereText = (pool, terms) => {
        let whereText = ' where (1=1) and ',
            list = [];
        if (is.Object(terms)) {
            for (let k in terms) {
                list.push(k + " = '" + terms[k] + "'");
            }
        } else if (is.Array(terms)) {
            terms.forEach((v) => {
                //https://github.com/mysqljs/mysql#escaping-query-values
                list.push(v.field + " " + v.term + " " + pool.escape(v.value));
            });
        }
        whereText += list.join(' and ');
        return whereText;
    },
    /**
     * @description 生成分页查询条件
     * @param pageIndex 当前页
     * @param pageSize 每页条数
     * @return 分页条件字符串
     */
    createPageNationText = (pageIndex, pageSize) => {
        const start = (pageIndex - 1) * pageSize;
        return ' LIMIT ' + start + ' , ' + pageSize + ' ';
    }

/**
 * @description 构造函数，默认导出此函数
 * 
 * @param {Object} 配置
 * @returns {Object} mysql pool 
 */
class Mysql {
    constructor(config) {
        this.config = config;
        this.pool = mysql.createPool(config);
    }
    /**
     * @description sql执行器
     * 
     * @param {string} sql语句 
     * @param {Object} 其他mysql配置 
     * @returns 
     */
    query(sql, options) {
        let self = this;
        return new Promise((resolve, reject) => {
            self.pool.getConnection((err, conn) => {
                err ? reject(err) : (conn.query(sql, options, (err, result, fields) => {
                    conn.release();
                    err ? reject({
                        ec: -1,
                        es: err
                    }) : resolve({
                        ec: 0,
                        es: 'success',
                        result
                    });
                }));
            });
        });
    }
    /**
     * @description 新增
     * 
     * @param {Object} 配置 
     * @returns {Object} 执行结果
     */
    insert(options) {
        let self = this;
        return new Promise(async (resolve, reject) => {
            try {
                let data = options.data,
                    sqlText = 'insert into ' + options.table + ' ',
                    keys = [],
                    values = [];
                let conn = await self.sqlTransaction();
                if (is.Array(data)) {
                    data.forEach((v) => {
                        let _values = [],
                            _keys = [];
                        for (let k in v) {
                            _values.push("'" + v[k] + "'");
                            _keys.push(k);
                        }
                        conn.add(sqlText + "(" + _keys.join(" , ") + ")" + " values ( " + _values.join(' , ') + " ) ");
                    });
                } else if (is.Object(data)) {
                    for (let k in data) {
                        keys.push(k);
                        values.push(" '" + data[k] + "' ");
                    }
                    sqlText += '(' + keys.join(' , ') + ')' + ' values (' + values.join(' , ') + ')  ';
                    conn.add(sqlText);
                }
                resolve(await conn.exec());
            } catch (e) {
                reject(e);
            }
        });
    }
    /**
     * @description 更新
     * 
     * @param {Object} 配置 
     * @returns {Object} 执行结果
     */
    update(options) {
        let self = this;
        return new Promise(async (resolve, reject) => {
            try {
                let data = options.data,
                    sqlText = 'update ' + options.table + ' set ',
                    fields = [],
                    terms = [];
                for (let k in data) {
                    fields.push(k + " =  '" + data[k] + "' ");
                }
                sqlText += fields.join(' , ') + createWhereText(self.pool, options.terms);
                resolve(await self.query(sqlText, options));
            } catch (e) {
                reject(e);
            }
        });
    }
    /**
     * @description 查询
     * 
     * @param {Object} 配置 
     * @returns {Object} 执行结果
     */
    select(options) {
        let self = this;
        return new Promise(async (resolve, reject) => {
            try {
                let sqlText = 'select ', whereText = createWhereText(self.pool, options.terms);
                if (is.Array(options.fields) && options.fields.length) {
                    sqlText += ' ' + options.fields.join(' , ') + ' ';
                } else {
                    sqlText += ' * ';
                }
                sqlText += ' from ' + options.table + ' ' + whereText;
                if(options.pageIndex && options.pageSize){
                    let totalSqlText = 'select count(*) as total from '+options.table + ' ' + whereText;
                    var total = await self.query(totalSqlText,options);
                    total = total.result[0].total;
                    sqlText += createPageNationText(options.pageIndex,options.pageSize)
                }
                let result = await self.query(sqlText, options);
                options.pageIndex && options.pageSize && Object.assign(result, { pageIndex: options.pageIndex, total})
                resolve(result)
            } catch (e) {
                reject(e);
            }
        });
    }
    /**
     * @description 删除
     * 
     * @param {Object} 配置 
     * @returns {Object} 执行结果
     */
    remove(options) {
        let self = this,
            sqlText = 'delete from ' + options.table;
        return new Promise(async (resolve, reject) => {
            try {
                let conn = await self.sqlTransaction();
                if (is.Object(options)) {
                    sqlText = 'delete from ' + options.table + createWhereText(self.pool, options.terms);
                } else if (is.Array(options)) {
                    options.forEach(v => {
                        sqlText = 'delete from ' + v.table + createWhereText(self.pool, v.terms);
                        conn.add(sqlText);
                    });
                }
                resolve(await conn.exec());
            } catch (e) {
                reject(e);
            }
        });
    }
    /**
     * @description 事物构造器
     * 
     * 
     * @returns {Object} 返回一个事物Transaction
     */
    sqlTransaction() {
        let self = this;
        return new Promise((resolve, reject) => {
            self.pool.getConnection((err, conn) => {
                err ? reject(err) : resolve(new Transaction(conn));
            });
        });
    }
}

/**
 * @description 真实的事物构造器
 * 
 * @param {Object} connection 
 * @returns {Object} Transaction
 */
class Transaction {
    constructor(conn) {
        if (!(this instanceof Transaction)) return new Transaction();
        this.sqlList = [];
        this.connection = conn;
    }
    /**
     * @description 向事物中添加一条sql
     * 
     * @param {string} sql语句 
     */
    add(sqlText) {
        this.sqlList.push(sqlText);
    }
    /**
     * @description 执行事物
     * 
     * @returns {Object} 执行结果
     */
    exec() {
        let self = this;
        return new Promise((resolve, reject) => {
            self.connection.beginTransaction(async () => {
                try {
                    for (let i = 0; i <= self.sqlList.length; i++) {
                        i < self.sqlList.length ? await self.query(self.sqlList[i]) : resolve(await self.commit());
                    }
                } catch (e) {
                    reject(e);
                }
            });
        });
    }
    query(sql) {
        let self = this;
        return new Promise((resolve, reject) => {
            self.connection.query(sql, (err, result) => {
                err ? self.connection.rollback((er) => {
                    self.connection.release();
                    reject({
                        ec: -1,
                        es: er || err
                    });
                }) : resolve(result);
            });
        });
    }
    commit() {
        let self = this;
        return new Promise((resolve, reject) => {
            self.connection.commit((err) => {
                err ? (self.connection.rollback(() => {
                    reject({
                        ec: -1,
                        es: err
                    });
                })) : self.connection.release(), resolve({
                    ec: 0,
                    es: '事物执行成功',
                    total: self.sqlList.length
                });
            });
        });
    }
}

module.exports = Mysql;