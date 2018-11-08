// Initialize the map:
function initMap() {
  //TODO: Check if the map initialization can be done according to the places/markers
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 60.147497, lng: 24.988798},
    zoom: 16
  });

  update();

  // Clicking on map changes the coordinates on form:
  map.addListener('click', function(e) {
    if (document.querySelector('#formContainer').innerHTML.length>0) {
      let lat = document.querySelector('#latitude');
      lat.value=e.latLng.lat();
      let lng = document.querySelector('#longitude');
      lng.value=e.latLng.lng();
    }
  });
}

// Create markers for every place:
function createMarkers (places) {
  places.forEach(place => {
    let marker = new google.maps.Marker({
      position: { lat: place.latitude, lng: place.longitude },
      map: map,
      title: place.title,
      place_id: place.id
    })

    // Create infowindow for the marker
    let contentString = placeDataShort(place)

    let infowindow = new google.maps.InfoWindow({
      content: contentString
    })

    marker.addListener('click', function () {
      infowindow.open(map, marker)
    })

    markers.push(marker)
  })
}

// Remove all markers from map
function removeMarkers() {
  if (markers && markers.length > 0) {
    markers.map(m => m.setMap(null))
  }
}