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
    c
    for(var i=0;i<arr.length;i++){
        var temp = arr.split('/');
        var outage_dict = {};
        outage_dict[temp[0]] = parseInt(temp[1]);
    }
    return outage_dict;
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

