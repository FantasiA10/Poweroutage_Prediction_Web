<script type="text/javascript" src="mapdata.js"></script>
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

function read_txt(txtfile){
    var arr=GetHeader(txtfile).split("\n");
    for(var i=0;i<arr.length;i++){
        var temp = arr.split('/');
        var outage_dict = {};
        outage_dist[temp[0]] = temp[1];
    }
    return outage_dict;
}

function home_map_upadate(txtfile){
    outage_dict = read_txt(txtfile)
    for(state in outage_dict){
        mod_simplemaps_usmap_mapdata(state, outage_dict[state])
    }
}

console.log(5);
read_shapefile('US_States.shp')

