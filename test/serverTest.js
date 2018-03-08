let APP = require('../core');
let dbMongo = require('../core/db/dbMongo.js');
let should = require('should');
let mocha = require('mocha');
let runtime = require('babel-plugin-transform-runtime');
let polyfill = require('babel-polyfill');


const config = {
    dbConfigs: {
      mysql: {
        host: '47.94.207.219',
        port: '3306',
        user: 'test2',
        password: 'ycdn8Tm5Nj',
        database: 'test2',
      },
      mongo: {
        dbAddress: 'mongodb://47.94.207.219:27017',
        dbName: 'test'
      }
    }
  },
  controllers = [{
    type: 'get',
    '/queryA': (req, res) => {
      res.writeHead('200', {
        'Content-Type': 'text/html'
      });
      res.write('<h1>queryA</h1>');
      res.end();
    }
  }, {
    type: 'post',
    '/queryB': (req, res) => {
      res.writeHead('200', {
        'Content-Type': 'text/html'
      });
      res.write('<h1>queryB</h1>');
      res.end();
    }
  }, {
    '/queryC/:id/:name': (req, res, parms) => {
      res.writeHead('200', {
        'Content-Type': 'application/json'
      });
      res.end(JSON.stringify({
        id: parms[0],
        name: decodeURI(parms[1])
      }));
    }
  }];

(async () => {
  try {
    let server = await APP(config, controllers);
    
    //server start test
    server = await server.start();
    // setTimeout(async () => {
    //   server = await server.stop();
    // }, 5000);
    // setTimeout(async () => {
    //   server = await server.restart();
    //   console.log(server);
    // }, 5000);
  } catch (e) {
    console.log('the server was started failed:', e);
  }
})();



