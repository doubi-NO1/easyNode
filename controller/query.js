let queryA = (app, req, res) => {
    res.writeHead('200', {
        'Content-Type': 'text/html'
    });
    res.write('<h1>queryA</h1>');
    res.end();
}

let queryB = (app, req, res) => {
    res.writeHead('200', {
        'Content-Type': 'text/html'
    });
    res.write('<h1>queryB</h1>');
    res.end();
}

let queryC = (app, req, res, parms) => {
    log.info(parms);
    res.writeHead('200', {
        'Content-Type': 'application/json'
    });
    res.end(JSON.stringify({
        id: parms[0],
        name: decodeURI(parms[1])
    }));
}

module.exports = {
    queryA,
    queryB,
    queryC
}