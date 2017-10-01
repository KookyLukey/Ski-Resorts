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
    map.addSource("resorts", {
        type: "geojson",
        data: {
                "type": "FeatureCollection",
                "features": [
                  {
                    "type": "Feature",
                    "properties": {
                      "name": "Snowbird",
                      "marker-color": "#0000ff",
                      "marker-symbol": "skiing",
                      "line": "blue"
                    },
                    "geometry": {
                      "type": "Point",
                      "coordinates": [
                        -111.6569709777832,
                        40.58100838285447
                      ]
                    }
                  },
                  {
                    "type": "Feature",
                    "properties": {
                      "name": "Alta",
                      "marker-color": "#0000ff",
                      "marker-symbol": "skiing",
                      "line": "blue"
                    },
                    "geometry": {
                      "type": "Point",
                      "coordinates": [
                        -111.63795948028563,
                        40.58876522056642
                      ]
                    }
                  },
                  {
                    "type": "Feature",
                    "properties": {
                      "name": "Brighton",
                      "marker-color": "#0000ff",
                      "marker-symbol": "skiing",
                      "line": "blue"
                    },
                    "geometry": {
                      "type": "Point",
                      "coordinates": [
                        -111.58324241638184,
                        40.60170214544079
                      ]
                    }
                  },
                  {
                    "type": "Feature",
                    "properties": {
                      "name": "Solitude",
                      "marker-color": "#0000ff",
                      "marker-symbol": "skiing",
                      "line": "blue"
                    },
                    "geometry": {
                      "type": "Point",
                      "coordinates": [
                        -111.59208297729492,
                        40.62020704520565
                      ]
                    }
                  }
                ]
              },
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
                    [100, "#f1f075"],
                    [750, "#f28cb1"],
                ]
            },
            "circle-radius": {
                property: "point_count",
                type: "interval",
                stops: [
                    [0, 20],
                    [100, 30],
                    [750, 40]
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
            "circle-stroke-width": 1,
            "circle-stroke-color": "#fff"
        }
    });
});

map.on('click', 'unclustered-point', function (e) {
        new mapboxgl.Popup()
            .setLngLat(e.features[0].geometry.coordinates)
            .setHTML(e.features[0].properties.name)
            .addTo(map);
    });

map.on('mouseenter', 'unclustered-point', function () {
        map.getCanvas().style.cursor = 'pointer';
    });
