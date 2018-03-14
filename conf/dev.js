const plugins = require('../plugin'),
  middleWares = require('../middleWare'),
  config = require('./base.config.js');

module.exports = Object.assign({}, config, (async () => {
  return {
    plugins: {
      mysql: await new plugins.mysql({
        config: {
          connectionLimit: 10,
          host: '',
          port: '3306',
          user: 'root',
          password: '',
          database: ''
        },
      }),
      mongo: await plugins.mongo({
        dbAddress: '47.94.207.219:27017',
        dbName: 'test'
      })
    },
    middleWare: [
      
    ]
  };
})());