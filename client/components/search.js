//  * * * * * * * * * * * * * * * * * * * * * * *
//  *  V I E W S . j s                          *
//  * * * * * * * * * * * * * * * * * * * * * * *

function searchBlock () {
  console.log('searchblock')
  return `<div class="searchBlock block">
            <button id="searchBlock" class="menu" value="small" onclick="toggleBlock();">+</button>
            <h3>Search or filter places</h3>
            <div id="togglable"></div>
          </div>`
}
// Add keyword filter block here <<
function largeSearchBlock () {
  return `<div>` + searchbar() + `<br />` + filterButton() + keywordList() + `</div>`
}

function keywordList () {
  return `<ul class='keywordlist'>` +
            keywords.map(p => keywordData(p)).join(' ') +
        `</ul>`
}

function keywordData (keyword) {
  return `<li>
            <label>
              <input type="checkbox" onclick="filterWithKeywords();" value=${keyword.id} />
              ${keyword.label}
            </label>
          </li>`
}

function filterButton () {
  console.log('filterbutton', filter)
  let button
  if (filter === 'open') {
    button = `<button id="filterButton" value="" onclick="setFilter();"> Show all places</div>`
  } else {
    button = `<button id="filterButton" value="open" onclick="setFilter();"> Show open places</div>`
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
  let id = event.target.value
  // If keyword is already on list, remove
  if (keywordfilter.includes(id)) {
    console.log('contains ', id)
    keywordfilter = keywordfilter.filter(e => e !== id)
  // Add keyword to filter list
  } else {
    console.log('add ', id)
    keywordfilter.push(id)
  }
  update()
}

// Toggle between big and smol block
function toggleBlock () {
  console.log('toggle')
  event.preventDefault()
  if (event.target.value === 'small') {
    // console.log('smol')
    event.target.value = 'big'
    document.querySelector('#togglable').innerHTML = largeSearchBlock()
  } else {
    event.target.value = 'small'
    // console.log('big');
    document.querySelector('#togglable').innerHTML = ''
  }
}

// Update the filter and search keyword from the search bar:
function searchPlaces () {
  event.preventDefault()

  console.log(event.target.value)
  filter = event.target.value
  search = event.target.value
  update()
}


function filterPlaces(places) {
  
}


// Show only open places on map:
function filterOpen () {
  console.log('filteropen')
  // Quick and dirty time check:
  var time = new Date()
  var opens = new Date()
  var closes = new Date()
  opens.setSeconds(0)
  closes.setSeconds(0)

  var open_places = []
  db_places.forEach(e => {
    // If the hours are not properly formatted, this will not work <<
    opens.setHours(e.opens_at.slice(0, 2))
    opens.setMinutes(e.opens_at.slice(3))

    closes.setHours(e.closes_at.slice(0, 2))
    closes.setMinutes(e.closes_at.slice(3))

    if (opens.getTime() <= time.getTime() && time.getTime() <= closes.getTime()) {
      open_places.push(e)
    } else {
      // console.log('NOT OPEN:')
      // console.log(opens.getHours(), opens.getMinutes())
      // console.log(closes.getHours(), closes.getMinutes())
    }
  })

  return open_places
}

// Set filter to wanted value:
function setFilter () {
  event.preventDefault()
  // Set the filter
  filter = event.target.value
  console.log('filter')
  // Update view
  update()
}

// Filter places according to the filter:
function filterSearch () {
  // console.log("filterseatch")
  var matches = []

  if (filter.length > 0) {
    matches = db_places.filter(e => e.title.toLowerCase().includes(filter.toLowerCase()))
  }
  return matches
}

function arrayContainsArray (superset, subset) {
  return subset.every(function (value) {
    return (superset.indexOf(value) >= 0)
  })
}

export default { searchBlock, largeSearchBlock, keywordList, keywordData }
