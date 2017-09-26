/**
 * mysql封装
 * @author 巴神
 * 2017/9/10
 */

const mysql = require("mysql");
const is = require('../utils/is.js');

//参考资料:https://github.com/mysqljs/mysql

/**
 * @description 生成 where 条件
 * 
 * @param {Object} 查询条件，可以是对象或数组 
 * @returns{string} 查询条件字符串
 */
function createWhereText(terms) {
  let whereText = ' where (1=1) and ',
    list = [];
  if (is.Object(terms)) {
    for (let k in terms) {
      list.push(k + " = '" + terms[k] + "'");
    }
  } else if (is.Array(terms)) {
    terms.forEach((v) => {
      list.push(v.field + " " + v.term + " " + "'" + v.value + "'");
    });
  }
  whereText += list.join(' and ');
  return whereText;
}

/**
 * @description 构造函数，默认导出此函数
 * 
 * @param {Object} 配置
 * @returns {Object} mysql pool 
 */
function Mysql(config) {
  this.pool = mysql.createPool(config);
}

Mysql.prototype = {
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
        err ? reject(err) : (conn.query(sql, options, function (err, result, fields) {
          conn.release();
          err ? reject({
            ec: -1,
            es: err
          }) : resolve({
            ec: 0,
            es: 'success',
            result: result
          });
        }));
      });
    });
  },

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
          sqlText = 'insert into ' + options.tbName + ' ',
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
  },

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
          sqlText = 'update ' + options.tbName + ' set ',
          fields = [],
          terms = [];
        for (let k in data) {
          fields.push(k + " =  '" + data[k] + "' ");
        }
        sqlText += fields.join(' , ') + createWhereText(options.terms);
        resolve(await self.query(sqlText, options));
      } catch (e) {
        reject(e);
      }
    });
  },
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
        let sqlText = 'select ';
        if (is.Array(options.fields) && options.fields.length) {
          sqlText+= options.fields.join(' , ');
        } else {
          sqlText += ' * ';
        }
        sqlText += ' from ' + options.tbName + ' ';
        sqlText += createWhereText(options.terms);
        resolve(await self.query(sqlText, options));
      } catch (e) {
        reject(e);
      }
    });
  },
  /**
   * @description 删除
   * 
   * @param {Object} 配置 
   * @returns {Object} 执行结果
   */
  remove(options) {
    let self = this,
      sqlText = 'delete from ' + options.tbName;
    return new Promise(async (resolve, reject) => {
      try {
        let conn = await self.sqlTransaction();
        if (is.Object(options.terms)) {
          sqlText += createWhereText(options.terms);
          conn.add(sqlText);
        } else if (is.Array(options.terms)) {
          options.terms.forEach((v) => {
            conn.add(sqlText + createWhereText(v));
          });
        }
        resolve(await conn.exec());
      } catch (e) {
        reject(e);
      }
    });
  },
  /**
   * @description 事物构造器
   * 
   * @returns {Object} 返回一个事物Transactionn 
   */
  sqlTransaction() {
    let self = this;
    return new Promise((resolve, reject) => {
      self.pool.getConnection((err, conn) => {
        err ? reject(err) : resolve(new Transactionn(conn));
      });
    });
  }
};

/**
 * @description 真实的事物构造器
 * 
 * @param {Object} connection 
 * @returns {Object} Transactionn
 */
function Transactionn(conn) {
  if (!(this instanceof Transactionn)) return new Transactionn();
  this.sqlList = [];
  this.connection = conn;
}

Transactionn.prototype = {
  /**
   * @description 向事物中添加一条sql
   * 
   * @param {string} sql语句 
   */
  add(sqlText) {
    this.sqlList.push(sqlText);
  },
  /**
   * @description 执行事物
   * 
   * @returns {Object} 执行结果
   */
  exec() {
    let self = this;
    return new Promise((resolve, reject) => {
      try {
        self.connection.beginTransaction(() => {
          self.sqlList.forEach((v) => {
            self.connection.query(v, (err, result) => {});
          });
        });
        self.connection.commit((err) => {
          err ? (self.connection.rollback(() => {
            reject({
              ec: -1,
              es: err
            });
          })) : resolve({
            ec: 0,
            es: '事物执行成功',
            total: self.sqlList.length
          });
        });
      } catch (e) {
        reject(e);
      }
    });
  }
};

module.exports = Mysql;