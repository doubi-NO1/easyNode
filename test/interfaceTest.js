// let interface = require('../core/interface/interface');


// interface.get('column/getcolumns.do',(req,res)=>{
//   console.log(req,res);
// }); 

// interface.post('column/findcolumns.do',(req,res)=>{
//   console.log(req, res);
// });

// interface.any('wrap/getWrap.do',(req,res)=>{
//   console.log(req, res);
// });

// interface.setup([
//   {
//     type:'get',
//     queryA(){
//       console.log('queryA');
//     }
//   },{
//     type:'post',
//     queryB(){
//       console.log('queryB');
//     }
//   },
//   {
//     queryC(){
//       console.log('queryC');
//     }
//   }
// ])

// interface.handle('column/getcolumns.do','req','res');
// interface.handle('column/findcolumns.do', 'req', 'res');
// interface.handle('wrap/getWrap.do', 'req', 'res');
// interface.handle('queryA');
// interface.handle('queryB');
// interface.handle('queryC');

let _interface = require('../core/interface/interface.js');
let should = require('should');
let mocha = require('mocha');
let runtime = require('babel-plugin-transform-runtime');
let polyfill = require('babel-polyfill');

module.exports = () => {
  describe('接口注册类测试', () => {
    describe('#get', () => {
      it('注册一个get请求接口', () => {
        const req = 'request',
          res = 'response';
        _interface.get('column/getcolumns.do', (req, res) => {
          (req + res).should.be.eql('requestresponse');
        });
        _interface.handle('column/getcolumns.do', req, res);
      });
    });

    describe('#post', () => {
      it('注册一个post请求接口', () => {
        const req = 'request',
          res = 'response';
        _interface.post('column/findcolumns.do', (req, res) => {
          (req + res).should.be.eql('requestresponse');
        });
        _interface.handle('column/findcolumns.do', req, res);
      });
    });

    describe('#get&post', () => {
      it('注册一个既支持post也支持get请求接口', () => {
        const req = 'request',
          res = 'response';
        _interface.any('wrap/getWrap.do', (req, res) => {
          (req + res).should.be.eql('requestresponse');
        });
        _interface.handle('wrap/getWrap.do', req, res);
      });
    });

    describe('#setup', () => {
      it('装载多个接口', () => {
        let res = '';
        _interface.setup([{
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
        _interface.handle('queryA');
        _interface.handle('queryB');
        _interface.handle('queryC');
        res.should.be.eql('queryAqueryBqueryC');
      });
    });
  });
};