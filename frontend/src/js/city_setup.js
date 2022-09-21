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

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
};

//set value for each roll of data form
function getDataRow(counter,h1,h2 = null){
    var row = document.createElement('tr'); 
    
    var idCell = document.createElement('td'); 
    idCell.innerHTML = counter + 1; 
    row.appendChild(idCell); 
    
    var nameCell = document.createElement('td');
    nameCell.innerHTML = h1.name;
    row.appendChild(nameCell);
    
    var jobCell = document.createElement('td');
    jobCell.innerHTML = parseFloat(h1.outage*100).toFixed(1) + '%';
    row.appendChild(jobCell);
    if (h2!=null){
        var idCell = document.createElement('td'); 
        idCell.innerHTML = counter + 2; 
        row.appendChild(idCell); 
        
        var nameCell = document.createElement('td');
        nameCell.innerHTML = h2.name;
        row.appendChild(nameCell);
        
        var jobCell = document.createElement('td');
        jobCell.innerHTML = parseFloat(h2.outage*100).toFixed(1) + '%';
        row.appendChild(jobCell);
    }
    else{
        var idCell = document.createElement('td'); 
        idCell.innerHTML = counter + 2; 
        row.appendChild(idCell); 
        
        var nameCell = document.createElement('td');
        nameCell.innerHTML = '-';
        row.appendChild(nameCell);
        
        var jobCell = document.createElement('td');
        jobCell.innerHTML = '-';
        row.appendChild(jobCell);
    }
    return row;
}
 
window.map = L.map('map').setView([latitude, longtitude], 7);
//usable base map: https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
window.tiles = L.tileLayer('', {
    maxZoom: 9,
    minZoom: 5,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
