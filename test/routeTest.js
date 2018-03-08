let Route = require('../core/route');
let should = require('should');
let mocha = require('mocha');
let runtime = require('babel-plugin-transform-runtime');
let polyfill = require('babel-polyfill');

Route=new Route;
module.exports = () => {
  describe('接口注册类测试', () => {
    describe('#get', () => {
      it('注册一个get请求接口', () => {
        const req = 'request',
          res = 'response';
        Route.get('column/getcolumns.do', (req, res) => {
          (req + res).should.be.eql('requestresponse');
        });
        Route.handle('column/getcolumns.do', req, res);
      });
    });

    describe('#post', () => {
      it('注册一个post请求接口', () => {
        const req = 'request',
          res = 'response';
        Route.post('column/findcolumns.do', (req, res) => {
          (req + res).should.be.eql('requestresponse');
        });
        Route.handle('column/findcolumns.do', req, res);
      });
    });

    describe('#get&post', () => {
      it('注册一个既支持post也支持get请求接口', () => {
        const req = 'request',
          res = 'response';
        Route.any('wrap/getWrap.do', (req, res) => {
          (req + res).should.be.eql('requestresponse');
        });
        Route.handle('wrap/getWrap.do', req, res);
      });
    });

    describe('#setup', () => {
      it('装载多个接口', () => {
        let res = '';
        Route.setup([{
            type: 'get',
            queryA() {
              res += 'queryA'
            }
          }, {
            type: 'post',
            queryB() {
              res += 'queryB'
            }
          },
          {
            queryC() {
              res += 'queryC'
            }
          }
        ]);
        Route.handle('queryA');
        Route.handle('queryB');
        Route.handle('queryC');
        res.should.be.eql('queryAqueryBqueryC');
      });
    });
  });
};