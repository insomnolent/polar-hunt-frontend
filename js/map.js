var map;
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: {lat: 34.069, lng: -118.447},
  });

  addMarker({lat: 34.0709, lng: -118.444982}, map, 'Bear');
  addMarker({lat: 34.071922, lng: -118.4496}, map, 'Banana');
  addMarker({lat: 34.0700765, lng: -118.4407628}, map, 'Fountain');
  addMarker({lat: 34.0691727, lng: -118.4452993}, map, 'Computers');
  addMarker({lat: 34.066584, lng: -118.443716}, map, 'Flowers');
  addMarker({lat: 34.0630585, lng: -118.449053}, map, 'Ice Cream');
  addMarker({lat: 34.0675949, lng: -118.4496631}, map, 'Piano');
  addMarker({lat: 34.070093, lng: -118.4471803}, map, 'Stadium');
  addMarker({lat: 34.0589447, lng: -118.5750918}, map, 'Pizza');
  addMarker({lat: 34.0754498, lng: -118.4766652}, map, 'Tree');
  addMarker({lat: 34.0716126, lng: -118.4443749}, map, 'Books');
}

function addMarker(location, map, contentString) {
  // Add the marker at the clicked location, and add the next-available label from the array of alphabetical characters.
  var marker = new google.maps.Marker({
    position: location,
    label: labels[labelIndex++ % labels.length],
    map: map,
  });

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}
