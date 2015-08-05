var map;
var infowindow;
var current_location;
var lat = 45.8893683;
var long = -87.6290385;
var place_list = [];
var place_dictionary = {};


var QueryString = function () {
  // This function is anonymous, is executed immediately and
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  }
    return query_string;
}();
// alert(QueryString.interest)

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
  find_nearby(QueryString.interest);
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
      // console.log(results[i]);
      createMarker(results[i]);
      place_list.push(results[i]);
      place_dictionary['place'+i]=results[i]
      // console.log(place_dictionary);
      $('#place_list').append("<div class='place' id=" + "place" + i + ">" + results[i].name + "</div><br/>");
      // $('#info_box').append(results[i].vicinity + "<br>");
    }
    console.log(results[0]);
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
    infowindow.setContent(place.name + "<br />" + place.vicinity +"<br />" + place.rating + "<br />" + "<p>Telephone: 773-579-9911</p>" + "<p>Website: www.dunkindonuts.com</p>");
    infowindow.open(map, this);
  });
}

google.maps.event.addDomListener(window, 'load', initialize);

$(document).ready(function(){
  $('#container').click(function(e) {
    $('#info_box').empty();
    console.log(e.target.id);
    console.log(e.target.class);
    $('#info_box').append('Location: ' + place_dictionary[e.target.id].vicinity + "<br/>")
    $('#info_box').append('Price Level: ' + place_dictionary[e.target.id].price_level + "<br/>")
    $('#info_box').append('Rating: ' + place_dictionary[e.target.id].rating + "<br/>")
  });
})
