var map;
var marker;
var place_dictionary = {};
var bounds = new google.maps.LatLngBounds();

function initialize() {
  favorite_places_string = $('#favorite_places').text();
  console.log(favorite_places_string);
  favorite_places = JSON.parse(favorite_places_string);
  console.log(favorite_places);

  var map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: new google.maps.LatLng(41.8893683, -87.6290385),
    zoom: 15
  });

  var infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);

for(var i = 0; i < favorite_places.length; i ++){
  var index = 0;
  favorite_place = {"placeId":favorite_places[i]}
  service.getDetails(favorite_place, function(place, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
      });
      bounds.extend(marker.getPosition());
      map.fitBounds(bounds);
      place_dictionary['place'+index]=place
      $('#favorite_places_box').append("<div class='place' id=" + "place" + index + ">" + place.name + "</div><br/>");
      index++;
      console.log(place.name);
      console.log(index);
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
      });
    }
  });

}
}

function add_info(object){
  if(place_dictionary[object].name){
    $('#place_details').append('Name: ' + place_dictionary[object].name + "<br/>")
  }
  if(place_dictionary[object].vicinity){
    $('#place_details').append('Location: ' + place_dictionary[object].vicinity + "<br/>")
  }
  if(place_dictionary[object].rating){
    $('#place_details').append('Rating: ' + place_dictionary[object].rating + "<br/>")
  }
  if (place_dictionary[object].price_level) {
    $('#place_details').append('Price Level: ' + place_dictionary[object].price_level + "<br/>")
  }
  if (place_dictionary[object].formatted_phone_number) {
    $('#place_details').append('Phone Number: ' + place_dictionary[object].formatted_phone_number + "<br/>")
  }
  if (place_dictionary[object].opening_hours){
    if (place_dictionary[object].opening_hours.open_now) {
      $('#place_details').append('Open Now: Yes' + "<br/>")
    }
  }
  else {
    $('#place_details').append('Open Now: No' + "<br/>")
  }
  if (place_dictionary[object].website) {
    $('#place_details').append('Website: ' + place_dictionary[object].website + "<br/>")
  }
}

// function ClearMarker() {
//   if(marker != null ){
//     marker.setMap(null);
//   }
//   marker = null;
// }
//
// function createMarker(place) {
//   marker = new google.maps.Marker({
//     map: map,
//     position: place.geometry.location
//   });
//   map.setCenter(marker.position);
//
//   google.maps.event.addListener(marker, 'click', function() {
//     infowindow.setContent("<div> Name: " + place.name + "<br /> Location: " + place.vicinity + "</div>");
//     infowindow.open(map, this);
//   });
// }

google.maps.event.addDomListener(window, 'load', initialize);

$(document).ready(function(){
  $('#container').click(function(e) {
    $('#place_details').empty();
    $('#favorite_button').empty();
    // map.setCenter(place_dictionary[e.target.id].geometry.location);
    console.log(place_dictionary[e.target.id]);
    add_info(e.target.id);
  });
})
