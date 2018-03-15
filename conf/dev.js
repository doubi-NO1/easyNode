const plugins = require('../plugin'),
  middleWares = require('../middleWare'),
  config = require('./base.config.js');

module.exports = Object.assign({}, config, {
    plugins: {
      mysql: new plugins.mysql({
        config: {
          connectionLimit: 10,
          host: '',
          port: '3306',
          user: 'root',
          password: '',
          database: ''
        },
      }),
      mongo: new plugins.mongo({
        dbAddress: 'mongodb://47.94.207.219:27017',
        dbName: 'test',
        error(err){
          console.log(err);
        }
      })
    },
    middleWare: [
      
    ]
});