var map;
var markers = [];

// Create dummy data to test marking on the map: in real app, read data from backend here
const place1 = {
  title: "Kasinopuisto",
  desc: "A nice park with nice scenery",
  coords: {lat: 60.148500, lng: 24.987445},
  opentime: "0000",
  closetime: "2400",
}
  
const place2 = {
  title: "Suomenlinnan kirjasto",
  desc: "Librarby",
  coords: {lat: 60.1462116, lng: 24.9846877},
  opentime: "1300",
  closetime: "1915",
}

let places = [place1, place2];

// Initialize the map:

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 60.147497, lng: 24.988798},
    zoom: 16
  });

  places.forEach(place => {
    var marker = new google.maps.Marker({
      position: place.coords,
      map: map,
      title: place.title,
    });
    markers.push(marker);
  });
}