//Luke O'Neill
//File for handling listeners of events
var resortFeatures = [];
resortFeatures = geoJsonData.features;

function searchResort(event) {
  let completed = true;
  var keyboardCode = event.which || event.keyCode;
  if(keyboardCode == 13){
    //Get the textbox value from the id
    var inputResort = document.getElementById('searchText').value
    //loop through geojson data to find a matching resort
    for(i = 0; i < resortFeatures.length; i++){
      if(resortFeatures[i].properties.name.toUpperCase().includes(inputResort.toUpperCase())){
        completed = false;
        map.flyTo({
          center: [resortFeatures[i].geometry.coordinates[0],resortFeatures[i].geometry.coordinates[1]],
          zoom: 12
        });
        break;
      }
    }if(completed){
      alert('Resort not found');
      completed = true;
    }
  }
}

//Get selected radio button and filter resorts by season pass
function filterPassResorts(){
  if(document.getElementById('max-option').checked) {
    addNonClustered('max');
  }else if(document.getElementById('epic-option').checked) {
    addNonClustered('epic');
  }else if(document.getElementById('boyne-option').checked) {
    addNonClustered('boyne');
  }else if(document.getElementById('all-option').checked){
    addClusteredLayers();
  }
}

//add non clustered points to the map for the specific passes
function addNonClustered(selectedOption){
  map.removeLayer('unclustered-point');
  map.removeLayer('cluster-count');
  map.removeLayer('clusters');
  map.removeSource('resorts');

  map.addSource("ncResorts", {
      type: "geojson",
      data: geoJsonData,
      cluster: false
  });
  map.addLayer({
      id: "unclustered-point",
      type: "circle",
      source: "ncResorts",
      filter: ["!has", "point_count"],
      paint: {
          "circle-color": "#11b4da",
          "circle-radius": 7,
          "circle-stroke-color": "#fff"
      }
  });
  map.setFilter('unclustered-point', ['==', 'pass', selectedOption]);
}
