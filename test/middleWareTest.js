const middleWare = require('../core/middleWare');
let should = require('should');
let mocha = require('mocha');
let runtime = require('babel-plugin-transform-runtime');
let polyfill = require('babel-polyfill');

let str = '',
  middleWares = [
    () => {
      str+='a'
    },
    () => {
      str+='b'
    },
    () => {
      str+='c'
    },
    () => {
      str+='d'
    },
    (req, res) => {
      str+='e'
    }
  ]

module.exports = () => {
  describe('中间件顺序执行', () => {
    middleWare(middleWares)();
    str.should.be.eql('abcde');
  });
}