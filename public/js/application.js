$(document).ready(function() {

});
var directionsDisplay;
var directionsService;
var map;
var stepDisplay;


function initialize() {
  directionsService = new google.maps.DirectionsService();
  var mapOptions = {
    zoom: 12,
    center: new google.maps.LatLng(37.7833, -122.4167)
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
  var rendererOptions = {
    map: map
  };
  directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
  stepDisplay = new google.maps.InfoWindow();
};

  function loadScript() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?libraries=drawing' +
        '&callback=initialize';
    document.body.appendChild(script);
  };


window.onload = loadScript;

function calcRoute() {
  var start = document.getElementById("start").value;
  var end = document.getElementById("end").value;
  var request = {
    origin: start,
    destination: end,
    travelMode: google.maps.TravelMode.WALKING
  };
  directionsService.route(request, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(result);
    }
  });
};

