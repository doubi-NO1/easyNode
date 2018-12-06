/**
 * 参考koa-compose源码进行改造
 */
module.exports = (middleWares) => {
    if (!Array.isArray(middleWares)) throw new TypeError('Middleware stack must be an array!')
    for (const middleWare of middleWares) {
        if (typeof middleWare !== 'function') throw new TypeError('Middleware must be composed of functions!')
    }

    /**
     * @param {Object} context
     * @return {Promise}
     * @api public
     */

    return function (req,res, next) {
        let index = -1
        return dispatch(0)
        function dispatch(i) {
            if (i <= index) return Promise.reject(new Error('next() called multiple times'))
            index = i
            let middleWare = middleWares[i]
            if (i === middleWares.length) middleWare = next
            if (!middleWare) return Promise.resolve()
            try {
                return Promise.resolve(middleWare(req, res, dispatch.bind(null, i + 1)));
            } catch (err) {
                return Promise.reject(err)
            }
        }
    }
}