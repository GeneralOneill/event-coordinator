var map;
var marker;
var infowindow;
var current_location;
var lat = 45.8893683;
var long = -87.6290385;
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
  find_nearby(QueryString.interest,QueryString.radius);

}

function initialize(){
  current_location = new google.maps.LatLng(lat,long);
  map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: current_location,
    zoom: 15
  });
  getUserLocation();
}

function find_nearby(type,radius){
  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  var request = {
    location: current_location,
    radius: radius,
    types: [type]
  };
  service.nearbySearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {;
      place_dictionary['place'+i]=results[i]
      $('#place_list').append("<div class='place' id=" + "place" + i + ">" + results[i].name + "</div><br/>");
    }
    console.log(results[0]);
  }
}

function ClearMarker() {
  if(marker != null ){
    marker.setMap(null);
  }
  marker = null;
}

function createMarker(place) {
  marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });
  map.setCenter(marker.position);

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent("<div> Name: " + place.name + "<br /> Location: " + place.vicinity + "</div>");
    infowindow.open(map, this);
  });

  // $.post("the_handler", {  }, function(data) {
  //
  // })
}

function add_info(object){
  if(place_dictionary[object].name){
    $('#info_box').append('Name: ' + place_dictionary[object].name + "<br/>")
  }
  if(place_dictionary[object].vicinity){
    $('#info_box').append('Location: ' + place_dictionary[object].vicinity + "<br/>")
  }
  if(place_dictionary[object].rating){
    $('#info_box').append('Rating: ' + place_dictionary[object].rating + "<br/>")
  }
  if (place_dictionary[object].price_level) {
    $('#info_box').append('Price Level: ' + place_dictionary[object].price_level + "<br/>")
  }
  if (place_dictionary[object].formatted_phone_number) {
    $('#info_box').append('Phone Number: ' + place_dictionary[object].formatted_phone_number + "<br/>")
  }
  if (place_dictionary[object].opening_hours.open_now) {
    $('#info_box').append('Open Now: Yes' + "<br/>")
  }
  else {
    $('#info_box').append('Open Now: No' + "<br/>")
  }
  if (place_dictionary[object].website) {
    $('#info_box').append('Website: ' + place_dictionary[object].website + "<br/>")
  }

}
google.maps.event.addDomListener(window, 'load', initialize);

$(document).ready(function(){
  $('#container').click(function(e) {
    $('#info_box').empty();
    ClearMarker();
    createMarker(place_dictionary[e.target.id]);
    add_info(e.target.id);
  });
})
