const base_url = 'http://localhost:8000/api';

// Get the places data from backend <<
function getData () {
  return fetch(`${base_url}/places/`, { mode: 'cors' })
    .then(function (response) {
      return response.json();
    }).then((responseJson) => {
      return responseJson;
    });
}

function getKeywordData () {
  return fetch(`${base_url}/keywords/`, { mode: 'cors' })
    .then(function (response) {
      return response.json();
    }).then((responseJson) => {
      return responseJson;
    });
}

// Functions for place:
function addPlace () {
  event.preventDefault();
  // Send a fetch request with the parameters from the form
  const data = getFormData('.createForm');

  fetch(`${base_url}/places/`,
    {
      body: data,
      method: 'post'
    }).then((value) => {
    update();
  });
}

function editPlace (id) {
  event.preventDefault();

  const data = getFormData('.editForm');
  fetch(`${base_url}/places/${id}`,
    {
      body: data,
      method: 'put',
      mode: 'cors'
    }).then((value) => {
    update();
  });
}

function deletePlaceFromServer (id) {
  return fetch(`${base_url}/places/${id}`, { method: 'DELETE', mode: 'cors' })
    .then(
      // console.log('Place deleted')
    );
}

// Functions for keywords:

// Send new keyword with place data to server:
function addKeywordToServer () {
  event.preventDefault();
  const data = getFormData('#keywordForm');

  // Check if the new label already exists:
  let items = Array.from(data.entries());
  let label = items[0][1];
  let labels = keywords.map(e => e.label.toLowerCase());

  // If label exists, do a put request instead of adding new:
  if (labels.includes(label.toLowerCase())) {
    let keyword = keywords.find(e => e.label.toLowerCase() === label.toLowerCase());
    addPlaceToKeyword(keyword.id, parseInt(items[1][1], 10));
  } else {
    fetch(`${base_url}/keywords/`,
      {
        body: data,
        method: 'post'
      }).then((value) => {
      update();
    });
    // onerror debugger
  }
}

// Toggle place on an already existing keyword:
function addPlaceToKeyword (keywordId, placeId) {
  let keyword = keywords.find(e => e.id === keywordId);
  // Check that label exists just in case
  if (keyword) {
    let places = keyword.places.map(e => e.id);

    // If place is already included, remove it:
    if (places.includes(placeId)) {
      places = places.filter(e => e !== placeId);
    } else {
      places = places.concat(placeId);
    }

    // Create the data for request:
    let data = JSON.stringify({ 'label': keyword.label, 'places': places });

    editKeyword(keywordId, data);
  }
}

// Remove a keyword from a place:
function editKeyword (id, data) {
  // event.preventDefault();
  // const data = getFormData("form");
  fetch(`${base_url}/keywords/${id}`,
    {
      body: data,
      headers: { 'content-type': 'application/json' },
      method: 'put',
      mode: 'cors'
    }).then((value) => {
    update();
  });
}

// Delete a keyword from the server:
function deleteKeyword (id) {
  return fetch(`${base_url}/keywords/${id}`, { method: 'DELETE', mode: 'cors' })
    .then(
      update()
    );
}
