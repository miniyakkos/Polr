$(document).ready(function() {
  initialize();
  $(".add-form").on("submit", calcRoute);
});

var directionsDisplay;
var directionsService;
var map;
var pointArray;
var elevator;
var chart;
google.load("visualization", "1.0", { packages: ["columnchart"] });

function initialize() {
  elevator = new google.maps.ElevationService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  directionsService = new google.maps.DirectionsService();
  var mapOptions = {
    zoom: 12,
    center: new google.maps.LatLng(37.7833, -122.4167)
  }
  map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById("directionsPanel"));
};

function calcRoute(event) {
  event.preventDefault();
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
      pointArray = response.routes[0].overview_path;
      drawPath();
    }
  });
};

function drawPath() {
  chart = new google.visualization.ColumnChart(document.getElementById('elevation_chart'));
  var pathRequest = {
    'path': pointArray,
    'samples': 50
  };
    elevator.getElevationAlongPath(pathRequest, plotElevation);
};

function plotElevation(results, status) {
  if (status == google.maps.ElevationStatus.OK) {
    elevations = results;
    var elevationPath = [];
    for (var i = 0; i < results.length; i++) {
      elevationPath.push(elevations[i].location);
    }
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Sample');
    data.addColumn('number', 'Elevation');
    for (var i = 0; i < results.length; i++) {
      data.addRow(['', elevations[i].elevation]);
    }
    chart.draw(data, {
      width: 640,
      height: 200,
      legend: 'none',
      titleY: 'Elevation (m)'
    });
  }
}

