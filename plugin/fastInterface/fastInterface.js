let _interface = require('../interface.js');

/**
 * 根据mysql数据库生成对应接口（仅包含单表的增删改查）
 */
let _app,mySqlInterfaces={
  select: (table, column) => {
    return (req, res) => {
      return new Promise(async (resolve,reject)=>{
        try{
          resolve(await _app.mysql.select({
            tbName: table,
            fields: req.fields
          }));
        }catch(e){
          reject(e);
        }
      });
    };
  },
  // detail: (table, column) => {
  //   return (req, res) => {
  //     return new Proimse(async (resolve,rject)=>{
  //       try{
  //         resolve(await _app.mysql.select({
  //           tbName: table,
  //           fields: req.fields
  //         }));
  //       }catch(e){
  //         reject(e);
  //       }
  //     });
  //   };
  // },
  insert: (table, column) => {
    return (req, res) => {
      return new Promise(async (resolve,reject)=>{
        try{
          resolve(await _app.mysql.insert({
            tbName:table,
            data:req.data
          }));
        }catch(e){
          reject(e);
        }
      });
    };
  },
  update: (table, column) => {
    return (req, res) => {
      return new Promise(async (resolve,reject)=>{
        try{
          resolve(await _app.mysql.update({
            tbName: table,
            data: req.data
          }));
        }catch(e){
          reject(e);
        }
      });
    };
  },
  remove: (table, column) => {
    return (req, res) => {
      return new Proimse(async (resolve,reject)=>{
        try{
          resolve(await _app.mysql.remove({
            tbName:table,
            terms:options.terms
          }));
        }catch(e){
          reject(e);
        }
      });
    };
  },
},
  createMySqlInterface = (mysql) => {
    return new Promise(async (resolve, reject) => {
      try {
        let result = {},
          tbSqlText = "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = '" + mysql.config.database + "'",
          tables = await mysql.query(tbSqlText);
        tables.list.forEach((table) => {
            ['select','detail','insert','update','remove'].forEach((v)=>{
              _interface.any('/' + table + '/' + v + '.do', mySqlInterfaces[v](table));
            });
        });
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  },

  createMongoInterface = (mongo) => {
    return new Promise((resolve, reject) => {
      try {
        
      } catch (e) {
        reject(err);
      }
    });
  }


module.exports = async(app) => {
  let res = {}, _app = app;
  return new Promise(async (resolve, reject) => {
    try {
      app.mysql && Object.assign(res, await createMySqlInterface(app.mysql));
      //app.mongo && Object.assign(res, await createMongoInterface(app.mongo));
      resolve(res);
    } catch (e) {
      reject(err);
    }
  });
};  