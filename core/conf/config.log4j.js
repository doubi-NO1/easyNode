const base = {
    appenders: {
        accessLogs: { type: 'Datefile', filename: '/tmp/log/access.log', pattern: '_yyyyMMdd.log', alwaysIncludePattern: true, category: 'access' },
        console: { type: 'console', category: 'console'}
    },
    categories: {
        access: { appenders: ['accessLogs'], level: 'info' },
        console: { appenders: ['console'], level: 'debug' },
        default: { appenders: ['console', 'accessLogs'], level: 'trace' }
    },
    replaceConsole: true,
}

const dev = {

}

const prod = {

}

module.exports = process.env === 'production' ? Object.assign({}, base, prod) : Object.assign({}, base, dev);