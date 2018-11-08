import map from './map.js'
// import update from './update.js'

// initMap();
// window.initMap = map.initMap;

map.loadMap()
window.initMap = function() {
  let event = new CustomEvent('mapReady');
  document.dispatchEvent(event);
}

function hello () {
  console.log('hello')
}
