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
 * @description Mongo实例构造器
 * 
 * @param {Object} config 
 * @returns object
 */
function Mongo(config) {
  if (!(this instanceof Mongo)) {
    return new Mongo(err, config);
  }
  if (!config.dbAddress) {
<<<<<<< HEAD
    config.error("不能没有数据库地址");
=======
    config.error('不能没有数据库地址');
>>>>>>> d2afa98a084730184702e5cd48126684591e4d4d
  } else {
    config = Object.assign({}, _defaultConfig, config);
    MongoClient.connect(config.dbAddress, config, (err, db) => {
      err ? config.error(err) : (this.db = db, config.success(this));
    });
  }
}

Mongo.prototype = {
  /**
   * @description 查找
   * 
   * @param {Object} options 
   * @param {Boolean} isOne 
   * @returns promise
   */
  find(options, isOne) {
    let self = this;
    return new Promise((resolve, reject) => {
      try {
        let find = isOne ? 'findOne' : 'find';
        self.db.collection(options.tbName)[find](options.terms || {}, function (err, docs) {
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
   * @description 查询一条数据
   * 
   * @param {Object} options 
   * @returns promise
   */
  findOne(options) {
    return this.find(options, true);
  },
  /**
   * @description 新增
   * 
   * @param {Object} options 
   * @returns promise
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
   * @description 更新
   * 
   * @param {Object} options 
   * @returns promise
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
  /**
   * @description 删除
   * 
   * @param {Object} options 
   * @returns promise
   */
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