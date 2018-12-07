const middleWare = require('../core/middleWare');
let should = require('should');
let mocha = require('mocha');
let runtime = require('babel-plugin-transform-runtime');
let polyfill = require('babel-polyfill');

let str = '';
const middleWares = [
    (req, res, next) => {
        str += 'a'
        next();
    },
    async (req, res, next) => {
            await next();
            str += 'b'
        },
        (req, res, next) => {
            str += 'c'
            next();
        },
        async (req, res, next) => {
                await next();
                str += 'd'
            },
            (req, res, next) => {
                str += 'e'
                next();
            }
]
middleWare(middleWares)();
console.log(str) //acebd

module.exports = () => {
    (() => {
        let str = '',
            middleWares = [
                () => {
                    str += 'a'
                },
                () => {
                    str += 'b'
                },
                () => {
                    str += 'c'
                },
                () => {
                    str += 'd'
                },
                (req, res) => {
                    str += 'e'
                }
            ]
        describe('中间件顺序执行', () => {
            middleWare(middleWares)();
            str.should.be.eql('abcde');
        });
    })()
    (() => {
        let str = '';
        const middleWares = [
            (req, res, next) => {
                str += 'a'
            },
            async (req, res, next) => {
                    await next();
                    str += 'b'
                },
                (req, res, next) => {
                    str += 'c'
                },
                async (req, res, next) => {
                        await next();
                        str += 'd'
                    },
                    (req, res, next) => {
                        str += 'e'
                    }
        ]
        describe('中间件next执行', () => {
            middleWare(middleWares)();
            str.should.be.eql('acebd');
        })
    })

}