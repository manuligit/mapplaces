
// Initialize the map:
function initMap() {
  //Check if the map initialization can be done according to the markers: <<
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 60.147497, lng: 24.988798},
    zoom: 16
  });

  update();

  // Clicking on map changes the coordinates on form:
  map.addListener('click', function(e) {
    // Add coordinates only if the form is open:
    if (document.querySelector('#formContainer').innerHTML.length>0) {
      let lat = document.querySelector('#latitude');
      lat.value=e.latLng.lat();
      let lng = document.querySelector('#longitude');
      lng.value=e.latLng.lng();
    }
  });
}

// Place a marker on the map:
function placeMarkerAndPanTo(latLng, map) {
  var marker = new google.maps.Marker({
    position: latLng,
    map: map
  });
  map.panTo(latLng);
}