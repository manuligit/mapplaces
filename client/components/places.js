//  * * * * * * * * * * * * * * * * * * * * * * * 
//  *  V I E W S                                *
//  * * * * * * * * * * * * * * * * * * * * * * * 

// Create a place list from all the data
function placeList() {
  return "<div class='placelist'>" + places.map(p => placeData(p)).join(' ') + "</div>";
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

function keywordForm(id) {
  return `<form id="keywordForm" onsubmit="addKeywordToServer();">
            <input id="label" type="text" name="label" required />
            <input id="places" type="hidden" value=${[id]} name="places" required />
            <input type="submit" value="+"/>
          </form>`
}

// Add a form for adding/editing keywords
function addKeyword() {
  event.preventDefault();
  let id = event.target.value;
  document.querySelector(`.keywordsearch${id}`).innerHTML = keywordForm(id);
}


// Remove a place from map:
function removePlace() {
  // Find item by id/coords/some kind of identifying attribute:
  let removeId = parseInt(event.target.value, 10);
  deletePlaceFromServer(removeId).then(() => {
    update();
  })
}


// Change the add place-form to edit place-form: <<
function addEditPlaceForm() {
  event.preventDefault();
  let place = places.find(e => e.id === parseInt(event.target.value, 10)); 
  document.querySelector('#formContainer').innerHTML = editForm(place);
}
