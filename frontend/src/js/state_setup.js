window.state_fp;
function getColor(d) {
    return d > 1 ? '#800026' :
    d > 0.90  ? '#BD0026' :
    d > 0.75  ? '#E31A1C' :
    d > 0.60   ? '#FC4E2A' :
    d > 0.45   ? '#FD8D3C' :
    d > 0.30   ? '#FEB24C' :
    d > 0.15   ? '#FED976' :
           '#FFEDA0';
}


function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
    console.log(e)
    window.location.href = "/city?FP=" + state_fp;
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

var corner1 =  L.latLng(75, -170);//upperleft
var corner2 = L.latLng(8, -49);//bottom right
var bounds = L.latLngBounds(corner1, corner2); 

window.map = L.map('map',{maxBounds:bounds}).setView([40.11, -95.30], 4);

//from https://openwhatevermap.xyz/#3/24.67/48.16
//http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png
var tiles = L.tileLayer('blank', {
    maxZoom: 5,
    minZoom: 3,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

