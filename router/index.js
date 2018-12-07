const controllers = require('../controller');

const routers = [{
    '/queryA': controllers.queryA,
    type: 'get'
},{
    '/queryB': controllers.queryB,
    type: 'post'
},{
    '/queryC/:id/:name': controllers.queryC
}]

module.exports = routers