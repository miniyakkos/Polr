$(document).ready(function() {
  initialize();
  $(".route").on("click", function() {
    calcRoute();
    drawPath();
  });
});

var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;
var pointArray;
var elevator = new google.maps.ElevationService();
var chart;
google.load("visualization", "1.0", {packages: ["columnchart"]});

function initialize() {
  directionsDisplay = new google.maps.DirectionsRenderer();
  var mapOptions = {
    zoom: 12,
    center: new google.maps.LatLng(37.7833, -122.4167)
  }
  map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById("directionsPanel"));
};

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
      pointArray = response.routes[0].overview_path
    }
  });
  debugger
};

function drawPath() {
  chart = new google.visualization.ColumnChart(document.getElementById('elevation_chart'));
  debugger
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
    document.getElementById('elevation_chart').style.display = 'block';
    chart.draw(data, {
      width: 640,
      height: 200,
      legend: 'none',
      titleY: 'Elevation (m)'
    });
  }
}

// 2085 ala wai blvd honolulu hi 96815
// 900 fort street mall honolulu hi 96813
