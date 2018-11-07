var map;
var markers = [];
var places;
let base_url = "http://localhost:8000/api";
let filter = "";
let db_places;
var search = "";
var keywords = [];

// window.doFetch = (url, options) => fetch(url, Object.assign({}, fetchDefaults, options));
// window.getJson = (url, options) => doFetch(url, options).then(res => res.json());

//  * * * * * * * * * * * * * * * * * * * * * * * 
//  *  V I E W S . j s                          *
//  * * * * * * * * * * * * * * * * * * * * * * * 

function createForm() {
  return `<div>
            <form class="createForm" onsubmit="addPlace();">
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
            <form class="editForm" onsubmit="editPlace(${place.id});">
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

function searchBlock() {
  return `<div class="searchBlock block">
            <button id="searchBlock" class="menu" value="small" onclick="toggleBlock();">+</button>
            <h3>Search or filter places</h3>
            <div id="togglable"></div>
          </div>`
}

function formBlock() {
  return `<div class="formBlock block">
            <button id="formBlock" class="menu" value="small" onclick="toggleBlock2();">+</button>
            <h3>Add a new place</h3>
            <div id="formContainer"></div>
          </div>`
}

// Add keyword filter block here <<
function largeSearchBlock() {
  return `<div>` + searchbar() + `<br />` + filterButton() + keywordList() + `</div>`
  // return `<div>
  //           <h1>HELLO SEARCH BLOCK</h1>
  //         </div>`
}

function keywordList() {
  return `<ul class='keywordlist'>` + 
            keywords.map(p => keywordData(p)).join(' ') + 
  
        `</ul>`;
}

function keywordData(keyword) {
  return `<li>
            <label>
              <input type="checkbox" value=${keyword.id}/>
              ${keyword.label}
            </label>
          </li>`;
}

function largeFormBlock() {
  return createForm();
}

//Toggle between big and smol block
function toggleBlock() {
  event.preventDefault();
  if (event.target.value === "small") {
    //console.log('smol')
    event.target.value = "big";
    document.querySelector('#togglable').innerHTML= largeSearchBlock();
  } else {
    event.target.value = "small";
    //console.log('big');
    document.querySelector('#togglable').innerHTML= '';
  }
}

//TODO: check out a way to generalize this function <<
function toggleBlock2() {
  event.preventDefault();
  if (event.target.value === "small") {
    //console.log('smol')
    event.target.value = "big";
    document.querySelector('#formContainer').innerHTML= largeFormBlock();
  } else {
    event.target.value = "small";
    //console.log('big');
    document.querySelector('#formContainer').innerHTML= '';
  }
}

// Create a place list from all the data
function placeList() {
  return "<div class='placelist'>" + places.map(p => placeData(p)).join(' ') + "</div>";
}

function filterButton() {
  let button;
  if (filter === "open") {
    button = `<button id="filter" value="" onclick="setFilter();"> Show all places</div>`
  } else {
    button =`<button id="filter" value="open" onclick="setFilter();"> Show open places</div>`
  }
  return button;
}

function searchbar() {
  return `<input id="search" class="searchbar" oninput="searchPlaces();" value="${search}" placeholder="Search places"></input>`
}

function placeData(place) {
  let keywords = getKeywords(place);
  //getKeywords(place);
  return `<div id="content">
            <h2>${place.title}</h2>
            <button type="button" value=${place.id} onclick="addEditPlaceForm();">Edit</button>
            <button type="button" value=${place.id} onclick="removePlace();">Remove</button>
            <p>${place.description}</p>
            <p>Opening hours: 
            <time>${place.opens_at}</time>-<time>${place.closes_at}</time> </p>
            <p>${place.latitude}, ${place.longitude}</p>
            ${keywords}
          </div>`
}

function placeDataShort(place) {
  return `<div id="short_content">
            <h2>${place.title}</h2>
            <p>${place.description}</p>
            <p>Opening hours: 
            <time>${place.opens_at}</time>-<time>${place.closes_at}</time> </p>
            <p>${place.latitude}, ${place.longitude}</p>
          </div>`
}

function getKeywords(place) {
  let labels = `<div class="labels">`;
  let keywords = ``;
  // If place has keywords, display them:
  
  // Create html structure for keywords:
  if (place.keywords && place.keywords.length > 0) {
    place.keywords.map(e => keywords = keywords.concat(`\n  <div class="keyword">${e.label}</div>`));
  }
  // Display the "add keywords button:"
  let button = `<button type="button" class="addKeyword" value=${place.id} onclick="addKeyword();">+</button><div class="keywordSearch"></div>`;

  keywords = keywords.concat(`\n ${button}`);
  keywords = keywords.concat(`\n<div class="keywordsearch${place.id}"></div>`)
  labels = labels.concat(`${keywords} \n </div>`)
  return labels;
}

function searchBarForm(id) {
  return `<form id="searchBarForm" onsubmit="addKeywordToServer();">
            <input id="label" type="text" name="label" required />
            <input id="places" type="hidden" value=${[id]} name="places" required />
            <input type="submit" value="+"/>
          </form>`
}

// Add a new keyword
function addKeyword() {
  event.preventDefault();
  console.log('klik')
  // Show possible 
  // function searchKeywords() {
  let id = event.target.value;

  // }

  document.querySelector(`.keywordsearch${id}`).innerHTML = searchBarForm(id);

}

// Update the filter and search keyword from the search bar:
function searchPlaces() {
  event.preventDefault();

  console.log(event.target.value)
  filter = event.target.value;
  search = event.target.value;
  update();
}

// Send new keyword with place data to server:
function addKeywordToServer() {
  event.preventDefault();

  //check if keywords already exists, if it does, update the place to keywords instead of adding it again


  const data = getFormData("#searchBarForm");
  console.log(data.toString());
  fetch(`${base_url}/keywords/`,
    {
        body: data,
        method: "post"
    }).then((value) => {
      console.log("request sent: " + value);
      update();
    });
    //if fails, add debugger
}

function editKeyword(id) {
  event.preventDefault();
  console.log(id)

  const data = getFormData("form");
  fetch(`${base_url}/places/${id}`,
    {
        body: data,
        method: "put",
        mode: 'cors'
    }).then((value) => {
      console.log("request sent: " + value);
      update();
    });
}

// Remove a keyword from a place:
function editKeyword(id) {
  event.preventDefault();
  const data = getFormData("form");
  fetch(`${base_url}/places/${id}`,
    {
        body: data,
        method: "put",
        mode: 'cors'
    }).then((value) => {
      console.log("request sent: " + value);
      update();
    });
}

// Delete a keyword from the server:
function deleteKeyword(id) {
  return fetch(`${base_url}/keywords/${id}`, { method: "DELETE", mode: "cors" })
  .then(
    console.log("Keyword deleted")
  );
}

//  * * * * * * * * * * * * * * * * * * * * * * * 
//  *  F U N C T I O N S . j s                  *
//  * * * * * * * * * * * * * * * * * * * * * * * 

// Get form data as URLSearchParams to send with fetch request by searching an element from the DOM
function getFormData(tag) {
  var formElement = document.querySelector(tag);
  const data = new URLSearchParams();
  for (const pair of new FormData(formElement)) {
    console.log('a');
    data.append(pair[0], pair[1]);
  }
  return data;
}

// Set filter to wanted value:
function setFilter() {
  event.preventDefault();
  // Set the filter
  filter = event.target.value;
  console.log("filter")
  // Update view
  update();
}

// Change the add place-form to edit place-form: <<
function addEditPlaceForm() {
  event.preventDefault();
  let place = places.find(e => e.id === parseInt(event.target.value, 10)); 
  document.querySelector('#formContainer').innerHTML = editForm(place);
}

// Show only open places on map:
function filterOpen() {
  console.log('filteropen')
  // Quick and dirty time check:
  var time =  new Date();
  var opens = new Date();
  var closes = new Date();
  opens.setSeconds(0);
  closes.setSeconds(0);

  var open_places = [];
  db_places.forEach(e => {
    // If the hours are not properly formatted, this will not work <<
    opens.setHours(e.opens_at.slice(0,2));
    opens.setMinutes(e.opens_at.slice(3));

    closes.setHours(e.closes_at.slice(0,2));
    closes.setMinutes(e.closes_at.slice(3));

    if (opens.getTime() <= time.getTime() && time.getTime() <= closes.getTime()) {
      open_places.push(e)
    } else {
      console.log('NOT OPEN:')
      console.log(opens.getHours(), opens.getMinutes())
      console.log(closes.getHours(), closes.getMinutes())
    }

  });

  return open_places;
}

// Filter places according to the filter:
function filterSearch() {
  console.log("filterseatch")
  var matches = [];

  if (filter.length > 0) {
    matches = db_places.filter(e => e.title.toLowerCase().includes(filter.toLowerCase()));
  }
  return matches; 
}

// Update the view
function update() {
  console.log('update')
  //Get data from backends and update all items
  // Remove all markers if any
  if (markers && markers.length > 0) {
    markers.map(m => m.setMap(null));
  }

  // Start adding stuff to map after getting data:
  getData().then(() => {
    
    if (filter && filter.length > 0) {
      if (filter === "open") {
        console.log("filter set");
        places = filterOpen();
      } else {
        places = filterSearch();
      }
      
      //places = places.filter()
    }
    
    places.forEach(place => {
      //console.log(place)
      var marker = new google.maps.Marker({
        position: { lat: place.latitude, lng: place.longitude },
        map: map,
        title: place.title,
        place_id: place.id
      });

      // Create infowindow for the marker
      var contentString = placeDataShort(place);

     var infowindow = new google.maps.InfoWindow({
       content: contentString
      });

      marker.addListener('click', function() {
        infowindow.open(map, marker);
      })

      markers.push(marker);
    })

  // Don't refresh searchblock if search/filter is on:
  if (filter.length < 1) { 
    document.querySelector('#filter').innerHTML = searchBlock();
  }

  //document.querySelector('#filter').innerHTML= searchBlock();
  document.querySelector('.form').innerHTML = formBlock();

  
  //document.querySelector('#searchbar')
  document.querySelector('#menu').innerHTML = placeList();
  //document.querySelector('.form').innerHTML = createForm();

  })
};

//  * * * * * * * * * * * * * * * * * * * * * * * 
//  *  M A P  . j s                             *
//  * * * * * * * * * * * * * * * * * * * * * * * 


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

// Remove a place from map:
function removePlace() {
  // Find item by id/coords/some kind of identifying attribute:
  let removeId = parseInt(event.target.value, 10);

  // // Remove item from current markers: 
  // let i = markers[0];
  
  // //console.log(markers)
  // let marker = markers.find(e => e.place_id === removeId);

  // //let marker = markers.map(e => e.id === removeId);
  // console.log(marker)
  // // Remove marker from map:
  // marker.setMap(null);
  // console.log(marker.map)

  // // Remove marker from markers: <<
  // markers = markers.filter(e => e.place_id !== removeId);
  // console.log(markers.length)

  // Send DELETE request to the server:
  deletePlaceFromServer(removeId).then(() => {
    // Remove from places list << maybe redundant
    //places = places.filter(e => e.id !== removeId);
    // Check that the value is deleted from keywords:
    update();
    //Call update
  })
}


// Place a marker on the map:
function placeMarkerAndPanTo(latLng, map) {
  var marker = new google.maps.Marker({
    position: latLng,
    map: map
  });
  map.panTo(latLng);
}


//  * * * * * * * * * * * * * * * * * * * * * * * 
//  *  R O U T E R . j s                        *
//  * * * * * * * * * * * * * * * * * * * * * * * 

// Get the places data from backend <<
function getData() {
  console.log('getdata')
  return fetch('http://localhost:8000/api/places/', { mode: "cors" })
    .then(function(response) {
      return response.json();
      
    }).then((responseJson) => {
      // <<
      db_places = responseJson;
      places = db_places;

      // Also fetch keyword data: <<
      getKeywordData().then((data) => {
        keywords = data;
        //console.log(keywords);
        return responseJson;
      });
    });
  }

  function getKeywordData() {
    return fetch('http://localhost:8000/api/keywords/', { mode: "cors" })
    .then(function(response) {
      return response.json();
    }).then((responseJson) => {
      return responseJson;
    });
  }

function addPlace() {
  event.preventDefault();
  //Send a fetch request with the parameters from the form
  const data = getFormData(".createForm");

  fetch(`${base_url}/places/`,
    {
        body: data,
        method: "post"
    }).then((value) => {
      console.log("request sent: " + value);
      update();
    });
    // if fails, add debugger
}

function editPlace(id) {
  event.preventDefault();
  console.log(id)

  const data = getFormData(".editForm");
  fetch(`${base_url}/places/${id}`,
    {
        body: data,
        method: "put",
        mode: 'cors'
    }).then((value) => {
      console.log("request sent: " + value);
      update();
    });
}

// Delete a place from the server:
function deletePlaceFromServer(id) {
  return fetch(`${base_url}/places/${id}`, { method: "DELETE", mode: "cors" })
  .then(
    console.log("Place deleted")
  );
}

// // Check/rewrite this function << 
// function placeDataShort(place) {
//   let addKeywords = ``;
//   // Test keywords by creating them by hand:
//   if (place.keywords && place.keywords.length > 0) {
//     console.log(place.keywords);
//     let keywords = `<div class="labels">`
//     place.keywords.map(e => keywords = keywords.concat(`\n  <div class="keyword">${e.label}</div>`));
//     let button = `<button type="button" class="addKeyword" onclick="addKeyword();">+</button><div class="keywordSearch"></div>`;
//     keywords = keywords.concat(`\n ${button}`);
//     keywords = keywords.concat(`\n</div>`)
//     // Add the "add keywords button:"
//     addKeywords = keywords.concat("\n" +addKeywords);
//     console.log(addKeywords)
//   }

//   return `<div id="content">
//             <p>${place.title}</p>
//             <button type="button" value=${place.id} onclick="addEditPlaceForm();">Edit</button>
//             <button type="button" value=${place.id} onclick="removePlace();">Remove</button>
//             <br />
//             ${addKeywords}
//           </div>`
// }



 // <form action="http://localhost:8000/api/places/" method="POST">