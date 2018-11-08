import { placeDataShort } from './places.js'

let map
let markers = []

function loadMap () {
  let x = document.createElement('script')
  x.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB0T67t5UkvJ27eNMBvre_kESNYwzFZ8GI&callback=initMap'
  x.async = true
  x.defer = true
  window.initMap = initMap
  document.body.appendChild(x)
}

// Initialize the map:
function initMap () {
  // Check if the map initialization can be done according to the markers: <<

  google = window.google

  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 60.147497, lng: 24.988798 },
    zoom: 16
  })

  // Clicking on map changes the coordinates on form:
  map.addListener('click', function (e) {
    // Add coordinates only if the form is open:
    if (document.querySelector('#formContainer').innerHTML.length > 0) {
      let lat = document.querySelector('#latitude')
      lat.value = e.latLng.lat()
      let lng = document.querySelector('#longitude')
      lng.value = e.latLng.lng()
    }
  })

  import('./update.js')
}

function createMarkers (places) {
  places.forEach(place => {
    // console.log(place)
    var marker = new google.maps.Marker({
      position: { lat: place.latitude, lng: place.longitude },
      map: map,
      title: place.title,
      place_id: place.id
    })

    // Create infowindow for the marker
    var contentString = placeDataShort(place)

    var infowindow = new google.maps.InfoWindow({
      content: contentString
    })

    marker.addListener('click', function () {
      infowindow.open(map, marker)
    })

    markers.push(marker)
  })
}

// Place a marker on the map:
function placeMarkerAndPanTo (latLng, map) {
  var marker = new google.maps.Marker({
    position: latLng,
    map: map
  })
  map.panTo(latLng)
}

// window.initMap = initMap;

export default { loadMap, map, createMarkers }
