//  * * * * * * * * * * * * * * * * * * * * * * *
//  *  V I E W S . j s                          *
//  * * * * * * * * * * * * * * * * * * * * * * *

// Create a place list from all the data
function placeList (places) {
  return "<div class='placelist'>" + places.map(p => placeData(p)).join(' ') + '</div>'
}

function placeData (place) {
  let keywords = getKeywords(place)
  // getKeywords(place);
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

export function placeDataShort (place) {
  return `<div id="short_content">
            <h2>${place.title}</h2>
            <p>${place.description}</p>
            <p>Opening hours: 
            <time>${place.opens_at}</time>-<time>${place.closes_at}</time> </p>
            <p>${place.latitude}, ${place.longitude}</p>
          </div>`
}

function getKeywords (place) {
  let labels = `<div class="labels">`
  let keywords = ``
  // If place has keywords, display them:

  // Create html structure for keywords:
  if (place.keywords && place.keywords.length > 0) {
    place.keywords.map(e => keywords = keywords.concat(`\n  <div class="keyword">${e.label}</div>`))
  }
  // Display the "add keywords button:"
  let button = `<button type="button" class="addKeyword" value=${place.id} onclick="addKeyword();">+</button><div class="keywordSearch"></div>`

  keywords = keywords.concat(`\n ${button}`)
  keywords = keywords.concat(`\n<div class="keywordsearch${place.id}"></div>`)
  labels = labels.concat(`${keywords} \n </div>`)
  return labels
}

function searchBarForm (id) {
  return `<form id="searchBarForm" onsubmit="addKeywordToServer();">
            <input id="label" type="text" name="label" required />
            <input id="places" type="hidden" value=${[id]} name="places" required />
            <input type="submit" value="+"/>
          </form>`
}

//  * * * * * * * * * * * * * * * * * * * * * * *
//  *  F U N C T I O N S                        *
//  * * * * * * * * * * * * * * * * * * * * * * *

// Show the form to create a new keyword when the button is clicked
function addKeyword () {
  event.preventDefault()
  document.querySelector(`.keywordsearch${id}`).innerHTML = searchBarForm(event.target.value)
}

// Remove a place from map:
function removePlace () {
  // Find item by id/coords/some kind of identifying attribute:
  let removeId = parseInt(event.target.value, 10)
  // Send DELETE request to the server:
  deletePlaceFromServer(removeId).then(() => {
    // Remove from places list << maybe redundant
    update()
  })
}

// Get form data as URLSearchParams to send with fetch request by searching an element from the DOM
function getFormData (tag) {
  var formElement = document.querySelector(tag)
  const data = new URLSearchParams()
  for (const pair of new FormData(formElement)) {
    data.append(pair[0], pair[1])
  }
  return data
}

export default { placeDataShort, placeList }
