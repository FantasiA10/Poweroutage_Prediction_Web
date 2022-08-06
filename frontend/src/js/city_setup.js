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
}

function onEachFeature(feature, layer) {
    feature = feature[0]
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}
 
window.map = L.map('map').setView([latitude, longtitude], 7);
//usable base map: https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
window.tiles = L.tileLayer('', {
    maxZoom: 9,
    minZoom: 5,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
