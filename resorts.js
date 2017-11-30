//Luke O'Neill
//Ski Resort Map
let mapimg;
let mapWidth = 1024;
let mapHeight = 512;

mapboxgl.accessToken = 'pk.eyJ1Ijoia29va3lsdWtleSIsImEiOiJjajg2MGEwYWwwcW9wMzJxYnB2YXM5ZGt1In0.C7FuK_uTUotk3EyHH5n9wQ';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v9',
    center: [-100, 38.907],
    zoom: 3.5
});

map.on('load', function() {
    addClusteredLayers();
});

function addClusteredLayers(){
  if(map.getLayer('unclustered-point')){
    map.removeLayer('unclustered-point');
    map.removeSource('ncResorts');
  }
  map.addSource("resorts", {
      type: "geojson",
      data: geoJsonData,
      cluster: true,
      clusterMaxZoom: 14, // Max zoom to cluster points on
      clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
  });

  map.addLayer({
      id: "clusters",
      type: "circle",
      source: "resorts",
      filter: ["has", "point_count"],
      paint: {
          "circle-color": {
              property: "point_count",
              type: "interval",
              stops: [
                  [0, "#51bbd6"],
                  [2, "#FFE7C1"],
                  [4, "#C6F0DA"],
                  [8, "#92DBC7"],
                  [15, "#36C4D0"],
                  [30, "#28A9BC"],
                  [50, "#C8F7C5"],
              ]
          },
          "circle-radius": {
              property: "point_count",
              type: "interval",
              stops: [
                  [0, 20],
                  [4, 25],
                  [10, 27.5],
                  [15, 30],
                  [50, 40]
              ]
          }
      }
  });

  map.addLayer({
      id: "cluster-count",
      type: "symbol",
      source: "resorts",
      filter: ["has", "point_count"],
      layout: {
          "text-field": "{point_count_abbreviated}",
          "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
          "text-size": 12
      }
  });

  map.addLayer({
      id: "unclustered-point",
      type: "circle",
      source: "resorts",
      filter: ["!has", "point_count"],
      paint: {
          "circle-color": "#11b4da",
          "circle-radius": 7,
          "circle-stroke-color": "#fff"
      }
  });
}

map.on('click', 'unclustered-point', function (e) {
        new mapboxgl.Popup()
            .setLngLat(e.features[0].geometry.coordinates)
            .setHTML(e.features[0].properties.description)
            .addTo(map);
    });

map.on('mouseenter', 'unclustered-point', function () {
        map.getCanvas().style.cursor = 'pointer';
    });

map.on('mouseleave', 'unclustered-point', function () {
        map.getCanvas().style.cursor = '';
    });
