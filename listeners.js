function searchResort(event) {
  var x = event.which || event.keyCode;
  if(x == 13){
    //var geoObject = JSON.parse(geoJsonData);
    var inputResort = document.getElementById('searchText').value
    var resortFeatures = [];
    resortFeatures = geoJsonData.features;
    for(i = 0; i < resortFeatures.length; i++){
      if(resortFeatures[i].properties.name == inputResort){
        console.log(resortFeatures[i].geometry.coordinates);
        map.flyTo({
        center: [resortFeatures[i].geometry.coordinates[0],resortFeatures[i].geometry.coordinates[1]],
        zoom: 9
    });
        break;
      }
    }
  }
}
