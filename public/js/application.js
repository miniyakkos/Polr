$(document).ready(function() {
 initialize();
 $(".route").on("click", calcRoute)
});

var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

function initialize() {
  directionsDisplay = new google.maps.DirectionsRenderer();
  var mapOptions = {
    zoom: 12,
    center: new google.maps.LatLng(37.7833, -122.4167)
  }
  map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById("directionsPanel"));
}

function calcRoute() {
  var start = document.getElementById("origin").value;
  var end = document.getElementById("destination").value;
  var request = {
    origin: start,
    destination: end,
    travelMode: google.maps.TravelMode.WALKING
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    }
  });
}


