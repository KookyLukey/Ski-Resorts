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
  }else if(document.getElementById('powder-option').checked) {
    addNonClustered('powder');
  }else if(document.getElementById('all-option').checked){
    addClusteredLayers();
  }
}

//add non clustered points to the map for the specific passes
function addNonClustered(selectedOption){
  if(map.getLayer('unclustered-point')){
    map.removeLayer('unclustered-point');
  }
  if(map.getLayer('cluster-count')){
    map.removeLayer('cluster-count');
  }
  if(map.getLayer('clusters')){
    map.removeLayer('clusters');
  }
  if(map.getSource('resorts')){
    map.removeSource('resorts');
  }
  if(map.getSource('ncResorts')){
    map.removeSource('ncResorts');
  }

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
  if(selectedOption == 'max'){
    map.setFilter('unclustered-point', ['==', 'maxpass', selectedOption]);
  }else if(selectedOption == 'epic'){
    map.setFilter('unclustered-point', ['==', 'epicpass', selectedOption]);
  }else if(selectedOption == 'powder'){
    map.setFilter('unclustered-point', ['==', 'powderpass', selectedOption]);
  }
}

function getAddResort(){
  var resortName = document.getElementById('resortName').value;
  var longitude = document.getElementById('longitude').value;
  var latitude = document.getElementById('latitude').value;
  var desc = document.getElementById('desc').value;
  var descName = document.getElementById('descName').value;
  var desc = document.getElementById('descUrl').value;
  var desc = document.getElementById('desc').value;


}

function writeGeoJsonString(){
  
}
