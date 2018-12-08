const plugins = require('../plugin'),
  middleWares = require('../middleWare'),
  config = require('./base.config.js');

module.exports = Object.assign({}, config, {
    plugins: {
      mysql: new plugins.mysql({
        config: {
          connectionLimit: 10,
          host: '127.0.0.1',
          port: '3306',
          user: 'root',
          password: 'ycdn8Tm5Nj',
          database: 'test'
        },
      }),
      mongo: plugins.mongo({
        dbAddress: 'mongodb://127.0.0.1:27017',
        dbName: 'test',
        error(err){
          console.log(err);
        }
      })
    },
    middleWare: [
      
    ]
});