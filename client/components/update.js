let map;
let markers = [];
let places;
let db_places;
let search = "";
let keywords = [];
let keywordfilter = [];

// Update the view
function update() {
  // Remove existing markers from map:
  removeMarkers();

  //Get data from backends and update all items:
  const placesP = getData()
  const keywordsP = getKeywordData()

  Promise.all([placesP, keywordsP])
    .then(data => {
      places = data[0];
      keywords = data[1];

      // Filter places: 
      places = filterPlaces(places)
      // Create markers on the map:
      createMarkers(places);
    
      // Create HTML content for the page
      // Don't refresh searchblock if search/filter is on:
      if (filter.length < 1 && keywordfilter.length < 1) { 
        document.querySelector('#filter').innerHTML = searchBlock();
        // Only change the button, if filter is set to open: << 
      } else if (filter === "open") {
        document.querySelector('#filterButton').innerHTML = `<button class="filterButton" value="" onclick="setFilter();"> Show all places</div>`
      }
      document.querySelector('.form').innerHTML = formBlock();
      document.querySelector('#menu').innerHTML = placeList();

      if (places.length === 0) {
        document.querySelector('#menu').innerHTML = `<p>No places found :(</p>`
      }
  })
};

// Get form data as URLSearchParams to send with fetch request by searching an element from the DOM
// TODO: Find a better place for this function
function getFormData(tag) {
  let formElement = document.querySelector(tag);
  const data = new URLSearchParams();
  for (const pair of new FormData(formElement)) {
    data.append(pair[0], pair[1]);
  }
  return data;
}