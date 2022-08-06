const handleRoute = require('./src/routes');
const querystring = require('querystring');
const http = require('http');
const fs = require('fs');
const method = require('./src/method');

/*
const getPostData = (req) =>{
    const promise = new Promise((resolve, reject)=>{
        /*
        if(req.method !== 'POST'){
            resolve({});
            return;
        }
        if (req.headers['content-type'] !== 'application/json'){
            resolve({});
            return;
        }
        let postData = '';

        req.on('data', (chunk)=>{
            postData += chunk.toString();
        });

        req.on('end', ()=>{
            if(!postData){
                resolve({});
                return;
            };
            resolve(
                JSON.parse(postData)
            );
        });
    })
    return promise;
}*/

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

    /*
    getPostData(req).then(async (postData)=>{
        req.body = postData;
        let promisedata = await handleRoute(req, res);
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
    })*/
}

module.exports = serverHandler