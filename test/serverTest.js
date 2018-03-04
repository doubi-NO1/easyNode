let APP = require('../core');

const config = {

};
modules.exports = async () => {
  try {
    let server = await APP(Object.assign({}, config, {
      dbConfigs: {
        mysql: await mysql(config.dbConfigs.mysql),
        mongo: await mongo(config.dbConfigs.mongo)
      }
    }));
    server.start();
  } catch (e) {
    console.log('the server was started failed:', e);
  }
};