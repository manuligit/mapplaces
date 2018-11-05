var map;
var markers = [];
var getElem = document.getElementById;
let places;

function placeData(place) {
  return `<div id="content">
            <h1>${place.title}</h1>
            <p>${place.description}</p>
            <p>Opening hours: ${place.opens_at}-${place.closes_at} </p>
            <button type="button" value=${place.id} onclick="editPlace();">Edit</button>
            <button type="button" value=${place.id} onclick="removePlace();">Remove</button>
          </div>`;
}

function createForm() {
  return `<div class="form">
            <form action="http://localhost:8000/api/places/" method="POST">
              <div>
                <label htmlFor="title">
                  Title
                </label>
                <input id="title" type="text" name="title" required />
              </div>
              <div>
                <label htmlFor="description">
                  Description
                </label>
                <br />
                <textarea id="description" name="description" rows="5" cols="40" required></textarea>
              </div>
              <div>
                <label htmlFor="coords">
                  Coordinates
                </label>
                <input id="latitude" type="text" name="latitude" placeholder="Latitude" required />
                <input id="longitude" type="text" name="longitude" placeholder="Longitude" required />
              </div>
              <div>
                <label htmlFor="hours">
                  Opening hours (add input as numbers, for example, opens at 13:30 is 1330)
                </label>
                <input id="opens_at" type="text" name="opens_at" placeholder="Opening time" maxlength="4" minlength="4" required />
                <input id="closes_at" type="text" name="closes_at" placeholder="Closing time" maxlength="4" minlength="4" required />
              </div>
              <input type="submit" value="Add Place"/>
            </form>
          </div>`
}

function editForm(place) {
  return `<div class="form">
            <form action="http://localhost:8000/api/places/${place.id}" method="PUT">
              <div>
                <label htmlFor="title">
                  Title
                </label>
                <input id="title" type="text" name="title" value=${place.title} required />
              </div>
              <div>
                <label htmlFor="description">
                  Description
                </label>
                <br />
                <textarea id="description" name="description" rows="5" cols="40" value=${place.description} required></textarea>
              </div>
              <div>
                <label htmlFor="coords">
                  Coordinates
                </label>
                <input id="latitude" type="text" name="latitude" placeholder="Latitude" value=${place.latitude} required />
                <input id="longitude" type="text" name="longitude" placeholder="Longitude" value=${place.longitude} required />
              </div>
              <div>
                <label htmlFor="hours">
                  Opening hours (add input as numbers, for example, opens at 13:30 is 1330)
                </label>
                <input id="opens_at" type="text" name="opens_at" placeholder="Opening time" maxlength="4" minlength="4" value=${place.opens_at} required />
                <input id="closes_at" type="text" name="closes_at" placeholder="Closing time" maxlength="4" minlength="4" value=${place.closes_at} required />
              </div>
              <input type="submit" value="Edit Place"/>
            </form>
          </div>`
}

function editPlace(place) {
  document.querySelector('.form').innerHTML = editForm(place);
}

// Former dummy data:
// const place3 = {
//   title: "Suomenlinnan kirjasto",
//   description: "Librarby",
//   latitude: 60.1462116, 
//   longitude: 24.9846877,
//   opens_at: 1300,
//   closes_at: 1915
// }

//'title', 'description', 'latitude', 'longitude', 'opens_at', 'closes_at'

// Get data from the backend:
// fetch("http://localhost:8000/api/places/")
// console.log('aaaaa');

document.querySelector('.form').innerHTML = createForm();

// Get the places data from backend
function getData() {
  console.log('getdata')
  return fetch('http://localhost:8000/api/places/', { mode: "cors" })
    .then(function(response) {
      return response.json();
    }).then((responseJson) => {
      return responseJson;
    });
}


//let places = [place1, place2];
// Initialize the map:

//Check if the map initialization can be done according to the markers:
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 60.147497, lng: 24.988798},
    zoom: 16
  });

  getData().then(places => {
    places.forEach(place => {
      var marker = new google.maps.Marker({
        position: { lat: place.latitude, lng: place.longitude },
        map: map,
        title: place.title,
        place_id: place.id
    });

    // Create infowindow for the marker
    var contentString = placeData(place);

    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    marker.addListener('click', function() {
      infowindow.open(map, marker);
    })

    markers.push(marker);
  })});

  map.addListener('click', function(e) {
    placeMarkerAndPanTo(e.latLng, map);
  });

// TODO: List behavior doesn't work properly with the remove due to indexing or something bug
// First item on the list cannot be removed?
removePlace = function () {
    //event.preventDefault();
    console.log('remove dis');
    console.log(event.target);
    console.log(event.target.value);
    // Find item by id/coords/some kind of identifying attribute:
    let removeId = parseInt(event.target.value, 10);

    //console.log(coords);
    // Remove item from current markers: 
    let i = markers[0];
    console.log(i);

    console.log(markers.length)
    markers.forEach(e => {
      console.log(e.position.lat())
      console.log(e.place_id);
    });
    
    console.log(markers)
    let marker = markers.find(e => e.place_id === removeId);

    //let marker = markers.map(e => e.id === removeId);
    console.log(marker)
    // Remove marker from map:
    marker.setMap(null);
    console.log(marker.map)

    // Remove marker from markers: <<
    markers = markers.filter(e => e.place_id !== removeId);
    console.log(markers.length)
  }
}

function placeMarkerAndPanTo(latLng, map) {
  var marker = new google.maps.Marker({
    position: latLng,
    map: map
  });
  map.panTo(latLng);
}

function addPlace() {
  event.preventDefault();
  console.log('add place');
}