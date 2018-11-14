//  * * * * * * * * * * * * * * * * * * * * * * *
//  *  V I E W S                                *
//  * * * * * * * * * * * * * * * * * * * * * * *

// Create a place list from all the data
function placeList () {
  return `<div class='placelist'> ${places.map(p => placeData(p)).join(' ')} </div>`;
}

function placeData (place) {
  let keywords = getKeywords(place);
  // getKeywords(place);
  return `<div class="place-content">
            <div class="firstRow">
              <h2>${place.title}</h2>
              <div id="buttonsRow" class="buttonsRow">
                <button type="button" value=${place.id} onclick="addEditPlaceForm();">Edit</button>
                <button type="button" class="removeButton" value=${place.id} onclick="removePlace();">Remove</button>
              </div>
            </div>
            <p>${place.description}</p>
            <p>Opening hours: 
            <time>${place.opens_at}</time>-<time>${place.closes_at}</time> </p>
            ${keywords}
          </div>`;
}

function placeDataShort (place) {
  return `<div id="short_content">
            <h2>${place.title}</h2>
            <p>${place.description}</p>
            <p>Opening hours: 
            <time>${place.opens_at}</time>-<time>${place.closes_at}</time> </p>
            <p>${place.latitude}, ${place.longitude}</p>
          </div>`;
}

// Create the form to add new keyword and ability to close the form:
function keywordForm (id) {
  let button = document.querySelector(`#addKeyword${id}`);
  button.innerText = '-';
  button.onclick = resetForm;

  return `<form id="keywordForm" onsubmit="addKeywordToServer();">
            <input id="label" type="text" name="label" required />
            <input id="places" type="hidden" value=${[id]} name="places" required />
            <input type="submit" value="+"/>
          </form>`;
}

// Create elements of all the keywords for one place and display add-button
function getKeywords (place) {
  let labels = `<div class="labels">`;
  let keywords = ``;
  // If place has keywords, display them:

  // Create html structure for keywords:
  if (place.keywords && place.keywords.length > 0) {
    place.keywords.map(e => { keywords = keywords.concat(`\n  <div class="keyword">${e.label}${removeButton(e, place)}</div>`); });
  }
  // Display the "add keywords button:"
  let button = `<button type="button" id="addKeyword${place.id}" class="addKeyword" value=${place.id} onclick="addKeyword();">+</button><div class="keywordSearch"></div>`;

  keywords = keywords.concat(`\n ${button}`);
  keywords = keywords.concat(`\n<div class="keywordsearch${place.id}"></div>`);
  labels = labels.concat(`${keywords} \n </div>`);
  return labels;
}

// Quick remove button for keywords:
function removeButton (e, place) {
  return `<button class="removeKeyword" value=${e.id} onclick="removeKeywordButton(${place.id});">-</button>`;
}

function removeKeywordButton (p_id) {
  event.preventDefault();
  kw_id = parseInt(event.target.value);
  addPlaceToKeyword(kw_id, p_id);
}

// Add a form for adding/editing keywords
function addKeyword () {
  event.preventDefault();
  let id = event.target.value;
  document.querySelector(`.keywordsearch${id}`).innerHTML = keywordForm(id);
}

// Delete the keyword adding form from view:
function resetForm () {
  event.preventDefault();
  let button = event.target;
  let id = event.target.value;
  document.querySelector(`.keywordsearch${id}`).innerHTML = '';
  button.innerText = '+';
  button.onclick = addKeyword;
}

// Remove a place from map:
function removePlace () {
  // Find item by id:
  let removeId = parseInt(event.target.value, 10);
  deletePlaceFromServer(removeId).then(() => {
    update();
  });
}
