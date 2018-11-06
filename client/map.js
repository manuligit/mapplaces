var map;
var markers = [];
var places;
var fetchDefaults = {
  mode: 'cors'
};
let base_url = "http://localhost:8000/api/places/";
let filter = "";
let current_places;
var infowindows = [];

window.doFetch = (url, options) => fetch(url, Object.assign({}, fetchDefaults, options));
window.getJson = (url, options) => doFetch(url, options).then(res => res.json());

function placeData(place) {
  return `<div id="content">
            <h1>${place.title}</h1>
            <p>${place.description}</p>
            <p>Opening hours: 
            <time>${place.opens_at}</time>-<time>${place.closes_at}</time> </p>
            <p>${place.latitude}, ${place.longitude}</p>
            <button type="button" value=${place.id} onclick="addEditPlaceForm();">Edit</button>
            <button type="button" value=${place.id} onclick="removePlace();">Remove</button>
          </div>`
}

function placeDataShort(place) {
  return `<div id="content">
            <p>${place.title}</p>
            <button type="button" value=${place.id} onclick="addEditPlaceForm();">Edit</button>
            <button type="button" value=${place.id} onclick="removePlace();">Remove</button>
          </div>`
}

 // <form action="http://localhost:8000/api/places/" method="POST">
function createForm() {
  return `<div>
            <form onsubmit="addPlace();">
              <div>
                <label htmlFor="title">
                  Title
                </label>
                <input id="title" type="text" name="title" value="a" required />
              </div>
              <div>
                <label htmlFor="description">
                  Description
                </label>
                <br />
                <textarea id="description" name="description" rows="5" cols="40" required>a</textarea>
              </div>
              <div>
                <label htmlFor="coords">
                  Coordinates
                </label>
                <input id="latitude" type="text" name="latitude" placeholder="Latitude" required value="a" />
                <input id="longitude" type="text" name="longitude" placeholder="Longitude" required value="a" />
              </div>
              <div>
                <label htmlFor="hours">
                  Opening hours
                </label>
                <br />
                <input id="opens_at" type="time" name="opens_at" placeholder="Opening time" value="13:30" required />-
                <input id="closes_at" type="time" name="closes_at" placeholder="Closing time"  value="14:30" required />
              </div>
              <input type="submit" value="Add Place"/>
            </form>
          </div>`
}

function editForm(place) {
  console.log(place)
  return `<div>
            <form onsubmit="editPlace(${place.id});">
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
                <textarea id="description" name="description" rows="5" cols="40" required>${place.description}</textarea>
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
                  Opening hours
                </label>
                <br />
                <input id="opens_at" type="time" name="opens_at" placeholder="Opening time" value=${place.opens_at} required />-
                <input id="closes_at" type="time" name="closes_at" placeholder="Closing time" value=${place.closes_at} required />
              </div>
              <input type="submit" value="Edit Place"/>
            </form>
          </div>`
}

// Get form data as URLSearchParams to send with fetch request by searching an element from the DOM
function getFormData(tag) {
  var formElement = document.querySelector(tag);
  const data = new URLSearchParams();
  for (const pair of new FormData(formElement)) {
    data.append(pair[0], pair[1]);
  }
  return data;
}

function addPlace() {
  event.preventDefault();
  // console.log("addPlace");
  // console.log(event)
  // console.log("woong")
  //Send a fetch request with the parameters from the form
  const data = getFormData("form");

  fetch(base_url,
    {
        body: data,
        method: "post"
    }).then((value) => {
      console.log("request sent: " + value);
      update();
    });
    // then: run update on the markers/places list
    // if fails, add debugger

  //console.log(data)
  //nollaa formi
  //document.querySelector('.form').innerHTML = createForm();
}

function addEditPlaceForm() {
  event.preventDefault();
  //console.log(places)
  let place = places.find(e => e.id === parseInt(event.target.value, 10)); 
  //console.log(place)
  document.querySelector('.form').innerHTML = editForm(place);
}

function editPlace(id) {
  event.preventDefault();
  console.log(id)

  const data = getFormData("form");
  fetch(`${base_url}${id}`,
    {
        body: data,
        method: "put",
        mode: 'cors'
    }).then((value) => {
      console.log("request sent: " + value);
      update();
    });
}

function update() {
  //Get data from backends and update all items
  // Remove all markers if any
  if (markers && markers.length > 0) {
    markers.map(m => m.setMap(null));
  }

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

  })

  document.querySelector('#menu').innerHTML = placeList();

  // Empty form:
  document.querySelector('.form').innerHTML = createForm();
})};

// Create a place list from all the data
function placeList() {
  return "<div>" + places.map(p => placeDataShort(p)) + "</div>";
}



document.querySelector('.form').innerHTML = createForm();

// Get the places data from backend
function getData() {
  console.log('getdata')
  return fetch('http://localhost:8000/api/places/', { mode: "cors" })
    .then(function(response) {
      return response.json();
      
    }).then((responseJson) => {
      places = responseJson;
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

  update();
//   getData().then(places => {
//     places.forEach(place => {
//       var marker = new google.maps.Marker({
//         position: { lat: place.latitude, lng: place.longitude },
//         map: map,
//         title: place.title,
//         place_id: place.id
//     });

//     // Create infowindow for the marker
//     var contentString = placeData(place);

//     var infowindow = new google.maps.InfoWindow({
//       content: contentString
//     });

//     marker.addListener('click', function() {
//       infowindow.open(map, marker);
//     })

//     markers.push(marker);

//   })

//   document.querySelector('#menu').innerHTML = placeList();
// });

  map.addListener('click', function(e) {
    placeMarkerAndPanTo(e.latLng, map);
  });

  // var form = document.getElementById(".form"); 
  // console.log(form)
  // function handleForm(event) { event.preventDefault();
  // console.log("handleform") } 
  // form.addEventListener('submit', handleForm);



// TODO: List behavior doesn't work properly with the remove due to indexing or something bug
// First item on the list cannot be removed?
removePlace = function () {
    // Find item by id/coords/some kind of identifying attribute:
    let removeId = parseInt(event.target.value, 10);

    //console.log(coords);
    // Remove item from current markers: 
    let i = markers[0];
    
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

    // Send DELETE request to the server:
    deleteFromServer(removeId).then(() => {
      // Remove from places list << maybe redundant
      //places = places.filter(e => e.id !== removeId);
      // Check that the value is deleted from keywords:
      update();
      //Call update
    })
  }
}

function deleteFromServer(id) {
  return fetch(`http://localhost:8000/api/places/${id}`, { method: "DELETE", mode: "cors" })
  .then(
    console.log("Place deleted")
  );
}

function placeMarkerAndPanTo(latLng, map) {
  var marker = new google.maps.Marker({
    position: latLng,
    map: map
  });
  map.panTo(latLng);
}
