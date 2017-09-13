/**
 * mongodb封装
 * @author 巴神
 * 2017/9/10
 */

const MongoClient = require('mongodb').MongoClient;

const _defaultConfig = {
  db: {
    native_parser: false
  },
  server: {
    socketOptions: {
      connectTimeoutMS: 1000
    }
  },
  replSet: {},
  mongos: {}
};

/**
 * 构造函数
 * 
 * @param {obj} config 
 * @returns
 */
function Mongo(config) {
  if (!(this instanceof Mongo)) {
    return new Mongo(err, config);
  }
  let message = {
    ok: -1,
    es: "未知错误"
  };
  if (!config.dbAddress) {
    message.es = "不能没有数据库地址";
    options.error(message);
  } else {
    config = Object.assign({}, _defaultConfig, config);
    MongoClient.connect(config.dbAddress, config, (err, db) => {
      err ? config.error(err) : (this.db = db, config.success(this));
    });
  }
}

Mongo.prototype = {
  /**
   * 查找
   * 
   * @param {查询条件} options 
   * @param {是否多条} isOne 
   * @returns 
   */
  find(options, isOne) {
    let self = this;
    return new Promise((resolve, reject) => {
      try {
        let find = isOne ? 'findOne' : 'find';
        self.db.collection(options.tbName)[find](options.terms, function (err, docs) {
          err ? reject({
            ok: -1,
            es: err
          }) : isOne ? resolve({
            ok: 1,
            obj: docs
          }) : docs.toArray((er, result) => {
            er ? reject({
              ok: -1,
              es: er
            }) : resolve({
              ok: 1,
              list: result
            });
          });
        });
      } catch (e) {
        reject({
          ok: -1,
          es: e
        });
      }
    });
  },
  /**
   * 查询一条数据
   * 
   * @param {选项} options 
   * @returns 
   */
  findOne(options) {
    return this.find(options, true);
  },
  /**
   * 新增
   * 
   * @param {选项} options 
   * @returns 
   */
  insert(options) {
    let self = this;
    return new Promise((resolve, reject) => {
      try {
        self.db.collection(options.tbName).insert(options.data, options || {}, (err, docs) => {
          err ? reject({
            ok: -1,
            es: err
          }) : resolve(docs.result, docs);
        });
      } catch (e) {
        reject({
          ok: -1,
          es: e
        });
      }
    });
  },
  /**
   * 更新
   * 
   * @param {any} options 
   * @returns 
   */
  update(options) {
    let self = this;
    return new Promise((resolve, rejecgt) => {
      try {
        self.db.collection(options.tbName).updateMany(options.terms, {
          $set: options.data
        }, (err, docs) => {
          err ? reject({
            ok: -1,
            es: err
          }) : resolve(docs.result, docs);
        });
      } catch (e) {
        reject({
          ok: -1,
          es: e
        });
      }
    });
  },
  remove(options) {
    let self = this;
    return new Promise((resolve, reject) => {
      try {
        options = Object.assign({
          justOne: false
        }, options);
        self.db.collection(options.tbName).remove(options.terms, (err, docs) => {
          err ? reject({
            ok: -1,
            es: err
          }) : resolve(docs.result, docs);
        });
      } catch (e) {
        reject({
          ok: -1,
          es: e
        });
      }
    });
  }
}

module.exports = (options) => {
  return new Promise((resolve, reject) => {
    try {
      new Mongo(Object.assign(options, {
        success: (mongo) => {
          resolve(mongo);
        },
        error: (err) => {
          reject({
            ok: -1,
            es: err
          });
        }
      }));
    } catch (e) {
      reject({
        ok: -1,
        es: e
      });
    }
  });
};