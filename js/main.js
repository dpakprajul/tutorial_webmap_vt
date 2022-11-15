window.onload = function() {
var map = L.map('map',{
    center: [39.0, -93.3],
    zoom: 8,
    maxZoom: 18,
    minZoom: 4,
});



L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// L.geoJson(vt_layer).addTo(map);
var highlight;
		var clearHighlight = function() {
			if (highlight) {
				vectorGrid.resetFeatureStyle(highlight);
			}
			highlight = null;
		};
var vectorGrid = L.vectorGrid.slicer(vt_layer, {
  rendererFactory: L.svg.tile,
  vectorTileLayerStyles: {
    sliced: function(properties, zoom) {
      var p = properties.D01;
      return {
        fillColor: p <= 10 ? '#800026' :
                    p <= 20 ? '#BD0026' :
                    p <= 30 ? '#E31A1C' :
                    p <= 40 ? '#FC4E2A' :
                    p <= 50 ? '#FD8D3C' :
                    p <= 60 ? '#FEB24C' :
                    p <= 70 ? '#FED976' :
                    p <= 80 ? '#FFEDA0' :
                    '#FFFFFF',
        fillOpacity: 0.5,
         //fillOpacity: 1,
        stroke: true,
        fill: true,
        color: 'black',
           //opacity: 0.2,
        weight: 0,
      }
    }
  },
  interactive: true,
  getFeatureId: function(f) {
    return f.properties.D01;
  }
})
.on('mouseover', function(e) {
  var properties = e.layer.properties;
  L.popup()
    .setContent(properties.NAMELSAD10 + ': ' + properties.D01 + '%')
    .setLatLng(e.latlng)
    .openOn(map);

  clearHighlight();
  highlight = properties.D01;

  var p = properties.D01;
  var style = {
    fillColor: p <= 10 ? '#800026' :
                    p <= 20 ? '#BD0026' :
                    p <= 30 ? '#E31A1C' :
                    p <= 40 ? '#FC4E2A' :
                    p <= 50 ? '#FD8D3C' :
                    p <= 60 ? '#FEB24C' :
                    p <= 70 ? '#FED976' :
                    p <= 80 ? '#FFEDA0' :
                    '#FFFFFF',
    fillOpacity: 0.5,
    fillOpacity: 1,
    stroke: true,
    fill: true,
    color: 'red',
    opacity: 1,
    weight: 2,
  };

  vectorGrid.setFeatureStyle(properties.D01, style);
}).addTo(map);

 
//on click check button remove the vt_layer
document.getElementById("remove").onclick = function() {
  map.removeLayer(vectorGrid);
};
  

build= L.easyButton('fa-home fa-lg', function(){
  osmb = new OSMBuildings(map).load('https://{s}.data.osmbuildings.org/0.2/anonymous/tile/{z}/{x}/{y}.json'); 
},"Show 2.5D Buildings",'topleft').addTo(map);


}