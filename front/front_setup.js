//run by node.js
function mod_simplemaps_usmap_mapdata(state, power_outage){
    for(var key in simplemaps_usmap_mapdata.state_specific){
        if (simplemaps_usmap_mapdata.state_specific[key].name == state){
            simplemaps_usmap_mapdata.state_specific[key].description = "Power Outage: " + power_outage;
            if (power_outage <1){
                simplemaps_usmap_mapdata.state_specific[key].color = "yellow";
            }
            else if(power_outage <1){
                simplemaps_usmap_mapdata.state_specific[key].color = "orange";
            }
            else if(power_outage <1){
                simplemaps_usmap_mapdata.state_specific[key].color = "red";
            }
        }
    }
}

function home_map_upadate(txtfile){
    for(var key in simplemaps_usmap_mapdata.state_specific){
        simplemaps_usmap_mapdata.state_specific[key].description = "default";
        simplemaps_usmap_mapdata.state_specific[key].color = "default";
        simplemaps_usmap_mapdata.state_specific[key].hover_color = "default";
    }
    outage_dict = read_txt(txtfile)
    for(state in outage_dict){
        mod_simplemaps_usmap_mapdata(state, outage_dict[state])
    }
}

//connect to local MySQL database 
//modified database connection imformation
let mysql = require("mysql");
let connection = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"",
    database: "power_outage"
})

connection.connect((err) => {
    if(err){
        console.error("fail to connect database:" + err.stack);
        return;
    }
    console.log("connect database success");
});


connection.end();


