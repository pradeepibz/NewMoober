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

  if ("geolocation" in navigator){
  navigator.geolocation.getCurrentPosition(show_location, show_error, {timeout:1000, enableHighAccuracy: true}); //position request
}else{
      console.log("Browser doesn't support geolocation!");
}

function show_location(position){
  var lat = position.coords.latitude
  var lang = position.coords.longitude
  getChangeEvent(lat, lang)
}


function show_error(error){
  var lat = 40.750357
  var lang = -73.983657
  getChangeEvent(lat, lang)
}

function getChangeEvent(lat, lang){
  var southWest = new google.maps.LatLng(lat, lang);
  var northEast = new google.maps.LatLng(lat, lang);
  var bounds = new google.maps.LatLngBounds(southWest,northEast);
  var start_value = new google.maps.places.Autocomplete(
    (document.getElementById('start')),
    {types: ['geocode'],
    bounds: bounds
  });
  var end_value = new google.maps.places.Autocomplete(
    (document.getElementById('end')),
    {types: ['geocode'],
    bounds: bounds
  });
  google.maps.event.addListener(start_value, 'place_changed', function() {
    $('#map_search_btn').click();
  });

  google.maps.event.addListener(end_value, 'place_changed', function() {
    $('#map_search_btn').click();
  });

  document.getElementById('map_search_btn').addEventListener('click', onChangeHandler);
}

    // var southWest = new google.maps.LatLng(40.750357, -73.983657);
    // var northEast = new google.maps.LatLng(40.750357, -73.983657);
    // var bounds = new google.maps.LatLngBounds(southWest,northEast);
    // var start_value = new google.maps.places.Autocomplete(
    //   (document.getElementById('start')),
    //   {types: ['geocode'],
    //   bounds: bounds
    // });
    // var end_value = new google.maps.places.Autocomplete(
    //   (document.getElementById('end')),
    //   {types: ['geocode'],
    //   bounds: bounds
    // });
    // google.maps.event.addListener(start_value, 'place_changed', function() {
    //   $('#map_search_btn').click();
    // });

    // google.maps.event.addListener(end_value, 'place_changed', function() {
    //   $('#map_search_btn').click();
    // });

    // document.getElementById('map_search_btn').addEventListener('click', onChangeHandler);

}

function initProposalMap() {
  var from_add = localStorage.getItem('request_from_add');
  var lat = localStorage.getItem('proposal_lat');
  var lang = localStorage.getItem('proposal_lang');
  address = from_add
  // Initialize the Geocoder
  geocoder = new google.maps.Geocoder();
  console.log(geocoder)
  if (geocoder) {
    geocoder.geocode({
        'address': address
    }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var from_lat = results[0].geometry.location.lat();
            localStorage.setItem('proposal_lat', from_lat);
            var from_lon = results[0].geometry.location.lng();
            localStorage.setItem('proposal_lang', from_lon);
        }
    });
  }
  var lat = localStorage.getItem('proposal_lat');
  var lang = localStorage.getItem('proposal_lang');
  var map = new google.maps.Map(document.getElementById('proposal_map'), {
    center: {lat: parseFloat(lat), lng: parseFloat(lang)},
    zoom: 14,
    scrollwheel: false,
    zoomControl: true,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.SMALL,
      position: google.maps.ControlPosition.RIGHT_CENTER
    },
    disableDefaultUI: true
  });
  var image = '/assets/map-icon2.png';
  var beachMarker = new google.maps.Marker({
    position: map.getCenter(),
    title: "Moved from here :)",
    map: map,
    icon: image
  });
  var infowindow = new google.maps.InfoWindow({
    content: "<div id='marker-content'><h6>Moved from here :)</h6></div>"
  });
  google.maps.event.addListener(beachMarker, 'click', function() {
    infowindow.open(map,beachMarker);
  });
  infowindow.open(map,beachMarker);
}

  function geolocate() {
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(function(position) {
    //     var geolocation = {
    //       lat: position.coords.latitude,
    //       lng: position.coords.longitude
    //     };
    //     var circle = new google.maps.Circle({
    //       center: geolocation,
    //       radius: position.coords.accuracy
    //     });
    //   });
    // }
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
          if($(window).width()<640){
            map.setZoom(10);
          }
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
