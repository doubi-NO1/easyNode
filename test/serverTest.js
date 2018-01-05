let mongo = require('../core/db/dbMongo.js'),
    mysql = require('../core/db/dbMysql'),
    config = require('../conf/dev.js'),
    APP = require('../core/server.js');
(async ()=>{
  try{
    let server = await APP(Object.assign({}, config, {
      dbConfigs: {
        mysql: await mysql(config.dbConfigs.mysql),
        mongo: await mongo(config.dbConfigs.mongo)
      }
    }));
    server.start();
  }catch(e){
    console.log(e);
  }
})();

