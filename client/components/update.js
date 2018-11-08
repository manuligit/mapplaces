import router from './router.js'
import map from './map.js'
import form from './form.js'
import search from './search.js'
import P from './places.js'

let places = []
let markers = []
let keywordfilter = []
let keywords = []
//remove this from here
let filter = ''

// Update the view
function update () {
  console.log('update')
  // Get data from backends and update all items
  // Remove all markers if any
  if (markers && markers.length > 0) {
    markers.map(m => m.setMap(null))
  }

  // Get data from server:
  const placesP = router.getData()
  const keywordsP = router.getKeywordData()

  // Resolve data from server:
  Promise.all([placesP, keywordsP])
    .then(data => {
      places = data[0],
      keywords = data[1]

      console.log(places, keywords)

      if (filter && filter.length > 0) {
        if (filter === 'open') {
          console.log('filter set')
          places = filterOpen()
          document.querySelector('#filterButton').innerHTML = `<button id="filter" value="" onclick="setFilter();"> Show all places</div>`
        } else {
          places = filterSearch()
        }
      // places = places.filter()
      }

      // Filter with keywords: <<<<<<<
      // Check that place's list of keywords includes every keyword in keywordfilter
      if (keywordfilter.length > 0) {
        console.log('keywordfilter', keywordfilter)
        // Filter by places of keywords on the list

        // keywordfilter.forEach(e => {
        //   kw = keywords.filter(k => k.id === e);
        //   places = kw.places;
        //   //kw = keywords[]
        //   //array1.filter(value => -1 !== array2.indexOf(value));
        // });

      // places = places.filter(p => keywordfilter.every(function (value) {
      //   console.log(p.keywords)
      //   console.log((p.keywords.indexOf(value) >= 0))
      //   return (p.keywords.indexOf(value) >= 0)
      // }));
      }

      map.createMarkers(places)

      // Don't refresh searchblock if search/filter is on:
      if (filter.length < 1 && keywordfilter.length < 1) {
        document.querySelector('#filter').innerHTML = search.searchBlock()
        // Only change the button, if filter is set to open: <<
      } 
      
      // else if (filter === 'open') {
      //   document.querySelector('#filterButton').innerHTML = `<button id="filter" value="" onclick="setFilter();"> Show all places</div>`
      // }

      //document.querySelector('#filter').innerHTML= searchBlock();
      document.querySelector('.form').innerHTML = form.formBlock()

      // if places.lehngth = 0, return "No places found"
      // document.querySelector('#searchbar')

      document.querySelector('#menu').innerHTML = P.placeList(places)

      if (places.length === 0) {
        document.querySelector('#menu').innerHTML = `<p>No places found :(</p>`
      }
    // document.querySelector('.form').innerHTML = createForm();
    })
};

window.update = update()

export default update
