function initMap() {
  var markerArray = [];
  var directionsService = new google.maps.DirectionsService;
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.750358, lng: -73.983649},
    zoom: 14,
    scrollwheel: false,
    zoomControl: true,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.SMALL,
      position: google.maps.ControlPosition.RIGHT_CENTER
    },
    disableDefaultUI: true
  });
  var image = '/assets/map-icon.png';
  var beachMarker = new google.maps.Marker({
    position: map.getCenter(),
    map: map,
    icon: image
  });
  var directionsDisplay = new google.maps.DirectionsRenderer({map: map});
  directionsDisplay.setOptions( { suppressMarkers: true } );

  var onChangeHandler = function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay, markerArray, map);
  };
  var start_value = new google.maps.places.Autocomplete(
    (document.getElementById('start')),
    {types: ['geocode']
  });
  var end_value = new google.maps.places.Autocomplete(
    (document.getElementById('end')),
    {types: ['geocode']
  });

  google.maps.event.addListener(start_value, 'place_changed', function() {
    $('#map_search_btn').click();
  });

  google.maps.event.addListener(end_value, 'place_changed', function() {
    $('#map_search_btn').click();
  });

  document.getElementById('map_search_btn').addEventListener('click', onChangeHandler);
}

  function geolocate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        var circle = new google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy
        });
      });
    }
  }
  function handleLocationError(browserHasGeolocation, beachMarker, pos) {
    beachMarker.setPosition(pos);
    beachMarker.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
    beachMarker.open(map);
  }
  function calculateAndDisplayRoute(directionsService, directionsDisplay, markerArray, map) {
    // First, remove any existing markers from the map.
    for (var i = 0; i < markerArray.length; i++) {
      if(markerArray[i]!=undefined)
        markerArray[i].setMap(null);
    }

    var start = document.getElementById('start').value;
    var end = document.getElementById('end').value;
    if (end == ''){
      end = start;
    }
    var request = {
      origin: start,
      destination: end, 
      travelMode: 'DRIVING'
    };
    directionsService.route(request, function(response, status) {
     if (status === 'OK') {
      directionsDisplay.setDirections(response);
      showSteps(response, markerArray, map);
     }
    });
  }

  function showSteps(directionResult, markerArray, map) {
    var place_ids = [];
      var service = new google.maps.places.PlacesService(map);
    for (var i = 0; i < directionResult.geocoded_waypoints.length; i++) {
      place_ids.push(directionResult.geocoded_waypoints[i].place_id);
    }

    service.getDetails({
        placeId: place_ids[1]
    }, function (result, status) {
        if(result!=undefined){
          var image2 = '/assets/map-icon1.png';
          var marker = markerArray[1] = markerArray[1] || new google.maps.Marker;
          marker.setMap(map);
          marker.setPosition(result.geometry.location);
          marker.setIcon(image2);
        }
    });
    service.getDetails({
        placeId: place_ids[0]
    }, function (result, status) {
        if(result!=undefined){
          var image = '/assets/map-icon2.png';
          var marker = markerArray[0] = markerArray[0] || new google.maps.Marker;
          marker.setMap(map);
          marker.setPosition(result.geometry.location);
          marker.setIcon(image);
        }
    });

  }
