window.onload = function () {
  var southWest = L.latLng(37, -96.3),
    northEast = L.latLng(40.8, -90.3);
  bounds = L.latLngBounds(southWest, northEast);

  //initialize map
  var map = L.map("base", {
    center: [39.0, -93.3],
    measureControl: true,
    minZoom: 2,
    maxZoom: 13,
    zoom: 8,
  });

  //basemap definition
  var osm = L.tileLayer("http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="http://osm.org/copyright" title="OpenStreetMap" target="_blank">OpenStreetMap</a> contributors | <a href="http://cartodb.com/attributions" title="CartoDB" target="_blank">CartoDB</a>',
    subdomains: ["a", "b", "c", "d", "e", "f"],
  }).addTo(map); //add to map

  var highlight;
  var clearHighlight = function () {
    if (highlight) {
      vtLayer2.resetFeatureStyle(highlight);
    }
    highlight = null;
  };
  var vtLayer2 = L.vectorGrid
    .slicer(vt_layer, {
      rendererFactory: L.svg.tile,
      vectorTileLayerStyles: {
        sliced: function (properties, zoom) {
          var p = properties.D01;
          return {

            fillColor:
              p <= 3 ? "#ccffbb" :
                p <= 10 ? '#800026' :
                  p <= 20 ? '#BD0026' :
                    p <= 30 ? '#E31A1C' :
                      p <= 40 ? '#FC4E2A' :
                        p <= 50 ? '#FD8D3C' :
                          p <= 60 ? '#FEB24C' :
                            p <= 70 ? '#FED976' :
                              p <= 100 ? '#E31A1C' :
                                p <= 120 ? '#800026' :
                                  p <= 150 ? '#FEB24C' :
                                    p <= 300 ? '#B2FE4C' :
                                      p <= 500 ? '#B2FE4C' :
                                        p <= 1000 ? '#B2FE4C' :
                                          p <= 2000 ? '#B2FE4C' : '#FFEDA0',

            fillOpacity: 0.5,
            //fillOpacity: 1,
            stroke: true,
            fill: true,
            color: 'black',
            //opacity: 0.2,
            weight: 0,
          }
        },
      },
      interactive: true,
      getFeatureId: function (f) {
        return f.properties.NAMELSAD10;
      }
    }).on('mouseover', function (e) {
      var properties = e.layer.properties;
      L.popup()
        .setContent("County: " + e.layer.properties.NAMELSAD10 + "<br>White Student: " + e.layer.properties.D01 + "<br>White Teacher: " + e.layer.properties.D02)
        .setLatLng(e.latlng)
        .openOn(map);

      clearHighlight();
      highlight = properties.NAMELSAD10;

      var p = properties.D01;;
      var style = {
        fillColor: p === 0 ? '#800026' :
          p <= 3 ? "#ccffbb" :
            p <= 10 ? '#800026' :
              p <= 20 ? '#BD0026' :
                p <= 30 ? '#E31A1C' :
                  p <= 40 ? '#FC4E2A' :
                    p <= 50 ? '#FD8D3C' :
                      p <= 60 ? '#FEB24C' :
                        p <= 70 ? '#FED976' :
                          p <= 100 ? '#E31A1C' :
                            p <= 120 ? '#800026' :
                              p <= 150 ? '#FEB24C' :
                                p <= 300 ? '#B2FE4C' :
                                  p <= 500 ? '#B2FE4C' :
                                    p <= 1000 ? '#B2FE4C' :
                                      p <= 2000 ? '#B2FE4C' : '#FFEDA0',
        fillOpacity: 0.5,
        fillOpacity: 1,
        stroke: true,
        fill: true,
        color: 'red',
        opacity: 1,
        weight: 2,
      };

      vtLayer2.setFeatureStyle(properties.NAMELSAD10, style);
    })
    .addTo(map);
  
    vtLayer2.on('click', function(e) {
      var properties = e.layer.properties.NAMELSAD10;
    
			highlight = properties.NAMELSAD10;

			var p = properties.D01;
			var style = {
				fillColor: p === 0 ? '#800026' :
        p<=3?"#ccffbb":
        p <=10 ? '#800026' :
          p <= 20  ? '#BD0026' :
          p <= 30  ? '#E31A1C' :
          p <= 40  ? '#FC4E2A' :
          p <= 50   ? '#FD8D3C' :
          p <= 60   ? '#FEB24C' :
          p <= 70   ? '#FED976' :
            p <=100 ? '#E31A1C' :
            p<=120?'#800026':
            p <=150 ? '#FEB24C' :
            p <= 300 ? '#B2FE4C':
            p <= 500 ? '#B2FE4C': 
            p <= 1000 ? '#B2FE4C': 
            p <=2000 ? '#B2FE4C' : '#FFEDA0',
				fillOpacity: 0.5,
				fillOpacity: 1,
				stroke: true,
				fill: true,
				color: 'red',
				opacity: 1,
				weight: 2,
			};

			vtLayer2.setFeatureStyle(properties.NAMELSAD10, style);
     
      //save as a text file when clicked on save
      $("#save").click(function () {
        var text = properties;
        var filename = "county.txt";
        //download as blob
        var blob = new Blob([text], { type: "text/plain;charset=utf-8" });
        saveAs(blob, filename);
      });

    });




};


