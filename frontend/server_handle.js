const handleRoute = require('./src/routes');
const querystring = require('querystring');
const http = require('http');
const fs = require('fs');
const method = require('./method');

const serverHandler = (req, res) =>{
    const url = req.url;
    req.path = url.split('?')[0];
    req.query = querystring.parse(url.split('?')[1]);
    let promisedata = handleRoute(req, res);
        if(promisedata){
            if (promisedata.data !== null){
                console.log(promisedata.data);
                return promisedata.data;
            }
            else{
                return promisedata;
            }
        }else{
            res.writeHead(404, {'content_Type': 'text/plain'});
            res.write('404 Not Found');
            res.end();
        }
}

module.exports = serverHandler