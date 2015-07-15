angular.module('savepo.controllers', [])
.controller("savepo-controller", function( $scope ) {

	$scope.initFunction = function() {
		console.log("controller init");
		$scope.address = "";
		$scope.longitude = "";
		$scope.latitude = "";
		$scope.map = null;
		$scope.marker = null;
		var markers = [];
		  $scope.map = new google.maps.Map($('#map-canvas')[0], {
			mapTypeId: google.maps.MapTypeId.ROADMAP
		  });

		  var defaultBounds = new google.maps.LatLngBounds(
			  new google.maps.LatLng(12.9175337,77.6504572),
			  new google.maps.LatLng(12.9675337,77.6504572));
		  $scope.map.fitBounds(defaultBounds);

		  // Create the search box and link it to the UI element.
		  var input = $('#pac-input')[0];
		  //$scope.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

		  // [START region_getplaces]
		  // Listen for the event fired when the user selects an item from the
		  // pick list. Retrieve the matching places for that item.
		  /*google.maps.event.addListener(searchBox, 'places_changed', function() {
			var places = searchBox.getPlaces();

			if (places.length == 0) {
			  return;
			}
			for (var i = 0, marker; marker = markers[i]; i++) {
			  marker.setMap(null);
			}

			// For each place, get the icon, place name, and location.
			markers = [];
			var bounds = new google.maps.LatLngBounds();
			for (var i = 0, place; place = places[i]; i++) {
			  var image = {
				url: place.icon,
				size: new google.maps.Size(71, 71),
				origin: new google.maps.Point(0, 0),
				anchor: new google.maps.Point(17, 34),
				scaledSize: new google.maps.Size(25, 25)
			  };

			  // Create a marker for each place.
			  var marker = new google.maps.Marker({
				map: map,
				icon: image,
				title: place.name,
				position: place.geometry.location
			  });

			  markers.push(marker);

			  bounds.extend(place.geometry.location);
			}

			map.fitBounds(bounds);
		  });
		  */
		  // [END region_getplaces]

		  // Bias the SearchBox results towards places that are within the bounds of the
		  // current map's viewport.

	}

	$scope.setMapMarker = function( lat, long, add ) {
		//var bounds = $scope.map.bounds();
		var location = {
							"lat": lat,
							"lng": long
						};

		if( $scope.marker == null ) {
			$scope.marker = new google.maps.Marker(
				{
					map:   $scope.map,
					title: add,
					position: location
				}
			);
		}
		else {
			$scope.marker .setPosition( new google.maps.LatLng( lat, long) );
		}

    	$scope.map.panTo( new google.maps.LatLng( lat, long) );
		console.log(add);

		var infowindow = new google.maps.InfoWindow({
      		content: add
  		});

  		google.maps.event.addListener($scope.marker, 'click', function() {
    		infowindow.open( $scope.map, $scope.marker );
  		});


	}

	$scope.getAddress = function() {
		var config = {
      		type: "GET",
      		url: "/po/get-address",
      		data: {
        		'longitude' : $scope.longitude,
        		'latitude' : $scope.latitude,
      		},
      	dataType: 'json',
      	success: function( response ) {
		   	console.log( "success1");
				if( response.status == 1) {
					console.log( "success");
					$scope.address = response.address;
					$scope.$apply();
					console.log( response.address);
				}
		   }


    };
    $.ajax(config);
   }

 	$scope.getCoordinates = function() {
		var config = {
      		type: "GET",
      		url: "/po/get-coordinates",
      		data: {
        		'address' : $scope.address,

      		},
      	dataType: 'json',
      	success: function( response ) {
		   	console.log( "success1");
				if( response.status == 1) {
					console.log( "success");
					$scope.longitude = response.longitude;
					$scope.latitude = response.latitude;
					$scope.$apply();
					$scope.setMapMarker($scope.latitude, $scope.longitude, $scope.address);
				}
		   }
    };
    $.ajax(config);
   }


})

