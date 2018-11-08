//  * * * * * * * * * * * * * * * * * * * * * * *
//  *  V I E W S .                              *
//  * * * * * * * * * * * * * * * * * * * * * * *
let filter = '';

// Create a togglable block for search/filter elements:
function searchBlock() {
  return `<div class="searchBlock block">
            <div class="header">
              <button id="searchBlock" class="menu" value="small" onclick="toggleBlock();">+</button>
              <h3>Search or filter places</h3>
            </div>
            <div id="togglable"></div>
          </div>`
}

// Add keyword filter block here <<
function largeSearchBlock () {
  return `<div>` + searchbar() + `<br />` + filterButton() + keywordList() + `</div>`
}

// List all keywords for search
function keywordList () {
  return `<ul class='keywordlist'>` +
            keywords.map(p => keywordData(p)).join(' ') +
        `</ul>`
}

function keywordData (keyword) {
  return `<li>
            <label>
              <input type="checkbox" class="checkbox" onclick="filterWithKeywords();" value=${keyword.id} />
              ${keyword.label}
            </label>
          </li>`
}

// Button for toggling showing of all/open places:
function filterButton () {
  //console.log('filterbutton', filter)
  let button;
  if (filter === 'open') {
    button = `<div id="filterButton"> <button class="filterButton" value="" onclick="setFilter();"> Show all places</div></div>`
  } else {
    button = `<div id="filterButton"><button class="filterButton" value="open" onclick="setFilter();"> Show open places</div></div>`
  }
  return button
}

function searchbar () {
  return `<input id="search" class="searchbar" oninput="searchPlaces();" value="${search}" placeholder="Search places"></input>`
}

//  * * * * * * * * * * * * * * * * * * * * * * *
//  *  F U N C T I O N S                        *
//  * * * * * * * * * * * * * * * * * * * * * * *

// Add keywords to filter with keyword id
function filterWithKeywords () {
  let id = parseInt(event.target.value, 10);
  // If keyword is already on list, remove
  if (keywordfilter.includes(id)) {
    //console.log('contains ', id)
    keywordfilter = keywordfilter.filter(e => e !== id)
  // Add keyword to filter list
  } else {
    //console.log('add ', id)
    keywordfilter.push(id)
  }
  update()
}

// Toggle between big and small block
function toggleBlock () {
  event.preventDefault()
  if (event.target.value === 'small') {
    event.target.value = 'big'
    event.target.innerText = "-";
    document.querySelector('#togglable').innerHTML = largeSearchBlock()
  } else {
    event.target.value = 'small'
    event.target.innerText = "+";
    document.querySelector('#togglable').innerHTML = ''
  }
}

// Update the filter and search keyword from the search bar:
function searchPlaces () {
  event.preventDefault()

  //console.log(event.target.value)
  filter = event.target.value
  search = event.target.value
  update()
}

// Returns every member of subset which is also present in superset
function checkCommon(subset, superset) {
  return subset.filter(function (value) {
    return (superset.indexOf(value) >= 0)
  })
}

// Filter all places and return a list of filtered places:
function filterPlaces(places) {
  if (filter && filter.length > 0) {
    if (filter === 'open') {
      places = filterOpen(places)
    } else {
      places = places.filter(e => e.title.toLowerCase().includes(filter.toLowerCase()));
    }
  }

  // Filter with a list of checked keywords
  // Check that place's list of keywords includes every keyword in keywordfilter
  if (keywordfilter.length > 0) {
    // Filter by places of keywords on the list
    let kws = keywords.filter(kw => keywordfilter.includes(kw.id));
    // Find ids of all the places related to keywords:
    let pids= kws.map(kw => kw.places.map(e => e.id));
    //console.log("p", pids)

    // Get all the common variables with a reducer:
    common = pids.reduce((e,a) => checkCommon(e, a), pids[0])
    //console.log('common', common)
    
    // Find places associated with the ids:
    places = places.filter(e => common.includes(e.id));
    //console.log('places', places)
  }

  return places;
}

// Show only open places on map:
function filterOpen (places) {
  //console.log('filteropen')
  var time = new Date()
  var opens = new Date()
  var closes = new Date()
  opens.setSeconds(0)
  closes.setSeconds(0)

  var open_places = []
  places.forEach(e => {
    // Assuming properly formatted timestamps
    opens.setHours(e.opens_at.slice(0, 2))
    opens.setMinutes(e.opens_at.slice(3))

    closes.setHours(e.closes_at.slice(0, 2))
    closes.setMinutes(e.closes_at.slice(3))

    if (opens.getTime() <= time.getTime() && time.getTime() <= closes.getTime()) {
      open_places.push(e)
    }
  })
  return open_places
}

// Set filter to wanted value:
function setFilter () {
  event.preventDefault()
  filter = event.target.value
  // Update view
  update()
}