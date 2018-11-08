import router from './router.js'
import map from './map.js'
import form from './form.js'
import search from './search.js'
import P from './places.js'

let places = []
let markers = []
let keywords = []
//remove this from here
//let filter = ''

// Update the view
function update () {
  console.log('update')
  // Get data from backends and update all items
  
  // Remove all markers if any
  map.removeMarkers();

  // Get data from server:
  const placesP = router.getData()
  const keywordsP = router.getKeywordData()

  // Resolve data from server:
  Promise.all([placesP, keywordsP])
    .then(data => {
      places = data[0],
      keywords = data[1]

      //console.log(places, keywords)

      places = search.filterPlaces(places);
      map.createMarkers(places)

      // // Don't refresh searchblock if search/filter is on:
      // if (filter.length < 1 && keywordfilter.length < 1) {
      //   document.querySelector('#filter').innerHTML = search.searchBlock()
      //   // Only change the button, if filter is set to open: <<
      // } 
      
      // else if (filter === 'open') {
      //   document.querySelector('#filterButton').innerHTML = `<button id="filter" value="" onclick="setFilter();"> Show all places</div>`
      // }

      //document.querySelector('#filter').innerHTML = search.searchBlock()
      document.querySelector('#filter').appendChild(search.searchBlock(keywords))
      document.querySelector('.form').appendChild(form.formBlock())

      // if places.lehngth = 0, return "No places found"

      document.querySelector('#menu').innerHTML = P.placeList(places)

      if (places.length === 0) {
        document.querySelector('#menu').innerHTML = `<p>No places found :(</p>`
      }
    // document.querySelector('.form').innerHTML = createForm();
    })
};

window.update = update()

export default update
