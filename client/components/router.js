
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



// Send new keyword with place data to server:
function addKeywordToServer() {
  event.preventDefault();
  const data = getFormData("#keywordForm");
  //console.log(data);
  
  // Check if the new label already exists:
  let items = Array.from(data.entries());
  let label = items[0][1];
  let labels = keywords.map(e => e.label.toLowerCase());

  if (labels.includes(label.toLowerCase())) {
    console.log('match')
    //addPlaceToKeyword()
    let keyword = keywords.find(e => e.label.toLowerCase() === label.toLowerCase());
    //console.log(keyword)
    //console.log(items[1][1])
    // Do put request instead of adding new:
    console.log(keyword.id, items[1])
    addPlaceToKeyword(keyword.id, parseInt(items[1][1],10));
  } else {

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
}

function editLabel() {
  // Get data... 
}

function addPlaceToKeyword(keyword_id, place_id) {
  console.log(keyword_id, place_id)
  let keyword = keywords.find(e => e.id === keyword_id);
  console.log(keyword)
  // Check that label exists just in case
  if (keyword) {
    console.log('found keyword with label ', keyword.label);
    let places = keyword.places.map(e => e.id);
    
    // If place is already included, remove it:
    if (places.includes(place_id)) {
      places = places.filter(e => e != place_id);
    } else {
      places = places.concat(place_id);
    }

    // Create the data for request: 
    let data = JSON.stringify({ "label": keyword.label, "places": places });
    console.log(data);

    editKeyword(keyword_id, data);
  }
}


// function editKeyword(id) {
//   event.preventDefault();
//   console.log(id)

//   const data = getFormData("form");
//   fetch(`${base_url}/places/${id}`,
//     {
//         body: data,
//         method: "put",
//         mode: 'cors'
//     }).then((value) => {
//       console.log("request sent: " + value);
//       update();
//     });
// }

// Remove a keyword from a place:
function editKeyword(id, data) {
  //event.preventDefault();
  //const data = getFormData("form");
  fetch(`${base_url}/keywords/${id}`,
    {
        body: data,
        headers:{'content-type': 'application/json'},
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

