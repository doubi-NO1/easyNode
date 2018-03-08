const middleWare = require('../core/middleWare');
let should = require('should');
let mocha = require('mocha');
let runtime = require('babel-plugin-transform-runtime');
let polyfill = require('babel-polyfill');

let number = 0,
  middleWares = [
    () => {
      number++
    },
    () => {
      number++
    },
    () => {
      number++
    },
    () => {
      number++
    },
    (req, res) => {
      number++
    }
  ]

module.exports = () => {
  describe('中间件顺序执行', () => {
    middleWare(middleWares)();
    number.should.be.eql(5);
  });
}