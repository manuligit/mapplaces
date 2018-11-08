// Update the view
function update() {
  console.log('update')
  //Get data from backends and update all items
  // Remove all markers if any
  if (markers && markers.length > 0) {
    markers.map(m => m.setMap(null));
  }

  // Start adding stuff to map after getting data:
  getData().then(() => {
    if (filter && filter.length > 0) {
      if (filter === "open") {
        console.log("filter set");
        places = filterOpen();
      } else {
        places = filterSearch();
      }
      //places = places.filter()
    }

    // Filter with keywords: <<<<<<<
    // Check that place's list of keywords includes every keyword in keywordfilter
    if (keywordfilter.length > 0) {

      console.log('keywordfilter', keywordfilter)
      //Filter by places of keywords on the list 
      
      





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
    
    
    places.forEach(place => {
      //console.log(place)
      var marker = new google.maps.Marker({
        position: { lat: place.latitude, lng: place.longitude },
        map: map,
        title: place.title,
        place_id: place.id
      });

      // Create infowindow for the marker
      var contentString = placeDataShort(place);

      var infowindow = new google.maps.InfoWindow({
       content: contentString
      });

      marker.addListener('click', function() {
        infowindow.open(map, marker);
      })

      markers.push(marker);
    });

  // Don't refresh searchblock if search/filter is on:
  if (filter.length < 1 && keywordfilter.length < 1) { 
    document.querySelector('#filter').innerHTML = searchBlock();
    // Only change the button, if filter is set to open: << 
  } else if (filter === "open") {
    document.querySelector('#filterButton').innerHTML = `<button id="filter" value="" onclick="setFilter();"> Show all places</div>`
  }

  //document.querySelector('#filter').innerHTML= searchBlock();
  document.querySelector('.form').innerHTML = formBlock();

  // if places.lehngth = 0, return "No places found"
  //document.querySelector('#searchbar')
  

  document.querySelector('#menu').innerHTML = placeList();

  if (places.length === 0) {
    document.querySelector('#menu').innerHTML = `<p>No places found :(</p>`
  }
  //document.querySelector('.form').innerHTML = createForm();

  })
};