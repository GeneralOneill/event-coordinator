function getUserLocation() {
  //check if the geolocation object is supported, if so get position
  // window.alert('getUserLocation')
  if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(displayLocation, displayError);
  else
  document.getElementById("locationData").innerHTML = "Sorry - your browser doesn't support geolocation!";
}
function displayLocation(position) {
//build text string including co-ordinate data passed in parameter
var displayText = "User latitude is " + position.coords.latitude + " and longitude is " + position.coords.longitude;
//display the string for demonstration
document.getElementById("locationData").innerHTML = displayText;
}

function displayError(error) {

//get a reference to the HTML element for writing result
var locationElement = document.getElementById("locationData");
//find out which error we have, output message accordingly
  switch(error.code) {
    case error.PERMISSION_DENIED:
     locationElement.innerHTML = "Permission was denied";
      break;
    case error.POSITION_UNAVAILABLE:
     locationElement.innerHTML = "Location data not available";
      break;
    case error.TIMEOUT:
     locationElement.innerHTML = "Location request timeout";
      break;
    case error.UNKNOWN_ERROR:
     locationElement.innerHTML = "An unspecified error occurred";
      break;
    default:
     locationElement.innerHTML = "Who knows what happened...";
      break;
  }
}
