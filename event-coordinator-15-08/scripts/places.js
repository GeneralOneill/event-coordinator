var map;
var infowindow;
var current_location;
var lat = 45.8893683;
var long = -87.6290385;
var place_list = [];

function getUserLocation() {
  if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(setLocation);
  else
    document.getElementById("locationData").innerHTML = "Sorry - your browser doesn't support geolocation!";
}

function setLocation(position) {
  lat = position.coords.latitude
  long = position.coords.longitude;
  current_location = new google.maps.LatLng(lat,long);
  console.log(current_location);
  map.setCenter({lat: lat, lng: long})
  find_nearby('store');
}

function initialize(){
  current_location = new google.maps.LatLng(lat,long);
  map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: current_location,
    zoom: 15
  });
  getUserLocation();
}

function find_nearby(type){
  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  var request = {
    location: current_location,
    radius: 500,
    types: [type]
  };
  service.nearbySearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
      place_list.push(results[i].name);
      $('#place_list').append(results[i].name + "<br>")
    }
  }
  console.log(place_list);
}
function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  document.getElementById('place-name').value = place.name;
  document.getElementById('place-address').value = place.vicinity;
  document.getElementById('place-website').value= place.website;
  document.getElementById('place-rating').value= place.rating;
  document.getElementById('place-phone').value = place.formatted_phone_number;
  document.getElementById('place-id').value = place.id;
  document.getElementById('opening-hours').value = place.opening_hours;

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name + "<br />" + place.vicinity +"<br />" + place.rating + "<br />" + place.formatted_phone_number);
    infowindow.open(map, this);
  });
}

google.maps.event.addDomListener(window, 'load', initialize);
