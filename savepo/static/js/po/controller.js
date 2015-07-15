angular.module('savepo.controllers', [])
.controller("savepo-controller", function( $scope ) {

	$scope.initFunction = function() {
		console.log("controller init");
		$scope.address = "";
		$scope.longitude = "";
		$scope.latitude = "";
		$scope.map = null;
		$scope.marker = null;
		$scope.infowindow = null;
		var markers = [];
		  $scope.map = new google.maps.Map($('#map-canvas')[0], {
			mapTypeId: google.maps.MapTypeId.ROADMAP
		  });

		  var defaultBounds = new google.maps.LatLngBounds(
			  new google.maps.LatLng(12.9175337,77.6504572),
			  new google.maps.LatLng(12.9675337,77.6504572));
		  $scope.map.fitBounds(defaultBounds);


	}

	$scope.setMapMarker = function( lat, long, add ) {
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
			$scope.marker.setPosition( new google.maps.LatLng( lat, long) );
		}

    	$scope.map.panTo( new google.maps.LatLng( lat, long) );
		console.log(add);

		if( $scope.infowindow == null ){
			$scope.infowindow = new google.maps.InfoWindow({
      		content: add
  			});
  		}
  		else
  		{
			$scope.infowindow.setContent(add);
		};

		google.maps.event.addListener($scope.marker, 'click', function() {
    		$scope.infowindow.open( $scope.map, $scope.marker );
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
					$scope.setMapMarker($scope.latitude, $scope.longitude, response.address );
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
					$scope.setMapMarker($scope.latitude, $scope.longitude, response.address );
				}
		   }
    };
    $.ajax(config);
   }


})

