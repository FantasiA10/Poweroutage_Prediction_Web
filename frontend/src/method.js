const fs = require("fs")
const mysql = require('mysql');

//initialize db
const db = mysql.createConnection({
    host: 'sql9.freesqldatabase.com',
    user: 'sql9637430',
    password: 'VCi5btnBJm',
    port:'3306',
    database: 'sql9637430'
});
db.connect();

//get json file by imported filename
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

//get city fp, city name and outage from db
function getoutage(st_num){
    const promise = new Promise((resolve, reject)=>{
        const sql = "select cousubfp, name, outage from city_info where statefp = ?";
        db.query(sql,[st_num], (err, data)=>{
            if(err){
                reject(err);
                resolve('error');
            }else{
                resolve(JSON.stringify(data));
            }
        });
    })
    return promise;
}

//get state fp, outage and state fips from db
function getstateoutage(st_num){
    const promise = new Promise((resolve, reject)=>{
        const sql = "select data.statefp, data.outage, us_state_fips.state from (select statefp, sum(outage) as outage from city_info group by statefp) as data join us_state_fips on us_state_fips.sfips = data.statefp";
        db.query(sql,[st_num], (err, data)=>{
            if(err){
                reject(err);
                resolve('error');
            }else{
                resolve(JSON.stringify(data));
            }
        });
    })
    return promise;
}


//export methods
module.exports = {getFileContent, getoutage, getstateoutage}