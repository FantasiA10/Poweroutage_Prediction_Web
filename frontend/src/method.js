const fs = require("fs")
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port:'3306',
    database: 'power_outage'
});
db.connect();

function getFileContent(filename){
    const promise = new Promise((resolve,reject)=>{
        const fullFilename = 'C:/Users/15801/Desktop/Poweroutage_Prediction_Web/shapefile/state_json/'+filename+'.json';
        console.log('reading file')
        fs.readFile(fullFilename, (err,data)=>{
            if (err){
                reject(err);
                resolve('error')
                return;
            }
            resolve(JSON.parse(data.toString()));
        })
        console.log('finish reading')
    });
    return promise;
}

function getoutage(st_num){
    const promise = new Promise((resolve, reject)=>{
        const sql = "select cousubfp, name, outage from city_info where statefp = ?";
        db.query(sql,[st_num], (err, data)=>{
            if(err){
                reject(err);
                resolve('error');
            }else{
                console.log(data);
                resolve(JSON.stringify(data));
            }
        });
    })
    return promise;
}

function getstateoutage(st_num){
    const promise = new Promise((resolve, reject)=>{
        const sql = "select data.statefp, data.outage, us_state_fips.state from (select statefp, sum(outage) as outage from city_info group by statefp) as data join us_state_fips on us_state_fips.sfips = data.statefp";
        db.query(sql,[st_num], (err, data)=>{
            if(err){
                reject(err);
                resolve('error');
            }else{
                console.log(data);
                resolve(JSON.stringify(data));
            }
        });
    })
    return promise;
}


//getFileContent('a.json').then((data)=>{})
module.exports = {getFileContent, getoutage, getstateoutage}