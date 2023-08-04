const {SuccessMode, SuccessModel} = require('./responseModel');
const {getList} = require('./method');
const querystring = require('querystring');
const fs = require('fs');
const method = require("./method");
const { ContextExclusionPlugin } = require('webpack');
const { platform } = require('os');

const handleRoute = async (req, res) => {
    const url = req.url;
    req.path = url.split('?')[0];
    req.query = querystring.parse(url.split('?')[1]);
    console.log(url)
    if(url.split('.')[1] === 'css'){
        res.writeHead(200,{"Content-Type":"Text/css"})
        fs.readFile('src/css'+url,'utf-8',(error,data)=>{
            if(error)
                res.end("read css file error.");
            else
                res.end(data.toString());
        })
        return new SuccessModel('');
    }
    else if(url === '/state' || url === '/'){
        res.writeHead(200, {"Content-Type": "text/html"});
        fs.readFile("src/html/state.html", "utf-8", function (error, data){
            if(error)
                res.end("read html file error.");
            else
                res.end(data.toString());
        });
        return new SuccessModel('');
    }
    else if(req.path === '/city'){
        res.writeHead(200, {"Content-Type": "text/html"});
        fs.readFile("src/html/city.html", "utf-8", function (error, data){
            if(error)
                res.end("read html file error.");
            else
                res.end(data.toString());
        });
        return new SuccessModel('');
    }
    else if(url === '/state_setup.js'){
        res.writeHead(200,{"Content-Type":"application/javascript"})
        fs.readFile('src/js/state_setup.js','utf-8',(error,data)=>{
            if(error)
                res.end("read js file error.");
            else
                res.end(data.toString());
        })
        return new SuccessModel('');
    }
    else if(req.path === '/city_setup.js'){
        res.writeHead(200,{"Content-Type":"application/javascript"});
        fs.readFile('src/js/city_setup.js','utf-8',(error,data)=>{
            if(error)
                res.end("read js file error.");
            else
                res.end(data.toString());
        })
        return new SuccessModel('');
    }
    else if(req.path === '/city_data'){
        res.writeHead(200,{"Content-Type":"application/javascript"})
        const p = await method.getFileContent(req.query.FP);
        res.end(JSON.stringify(p))
        return new SuccessModel(p);
    }
    else if(req.path === '/state_data'){
        res.writeHead(200,{"Content-Type":"application/javascript"})
        fs.readFile('../shapefile/US.js','utf-8',(error,data)=>{
            if(error)
                res.end("read js file error.");
            else
                res.end(data.toString());
        });
        return new SuccessModel('');
    }
    else if(req.path === '/city_outage'){
        res.writeHead(200,{"Content-Type":"application/javascript"})
        const p = await method.getoutage(req.query.FP);
        res.end(p);
        return new SuccessModel(p);
    }
    else if(req.path === '/state_outage'){
        res.writeHead(200,{"Content-Type":"application/javascript"})
        const p = await method.getstateoutage(req.query.FP);
        res.end(p);
        return new SuccessModel(p);
    }
}
module.exports = handleRoute