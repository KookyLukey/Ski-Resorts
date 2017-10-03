function searchResort(event) {
  let completed = true;
  var keyboardCode = event.which || event.keyCode;
  if(keyboardCode == 13){
    //Get the textbox value from the id
    var inputResort = document.getElementById('searchText').value
    var resortFeatures = [];
    resortFeatures = geoJsonData.features;
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
