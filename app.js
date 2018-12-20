var json;

function loadjson() {
	$.getJSON(
		"map.json",
		function( returnedData ) {
			json = returnedData;
			createMap();
		}
	);
}

function createMap() {
	var mapOptions = {
		center: new google.maps.LatLng(38.1416353, -99.5588998),
		zoom: 4.005,
		styles: [
        {
            "featureType": "all",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": "32"
                },
                {
                    "lightness": "-3"
                },
                {
                    "visibility": "on"
                },
                {
                    "weight": "1.18"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "landscape.man_made",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": "-70"
                },
                {
                    "lightness": "14"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": "100"
                },
                {
                    "lightness": "-14"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                },
                {
                    "lightness": "12"
                }
            ]
        }
    ]
	};

	var map = new google.maps.Map(
		$('#map-canvas')[0],
		mapOptions
	);

	if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    var currentPos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };

                    var meIcon = 'https://maps.google.com/mapfiles/kml/shapes/info-i_maps.png';

                    var me = new google.maps.Marker({
			            position: currentPos,
			            map: map,
			            title: "You Are Here",
			            icon: meIcon
		            });

		            me.addListener(
                        'click',
                        function() {
                            myInfo.open(
                                map,
                                me
                            );
                        }
                    );

                    var myInfo = new google.maps.InfoWindow(
                        {
                            content: "This is where you are!",
                            map: map
                        }
                    );
                }
            );
        }

	for (var i = 0; i < json.length; i++ ) {

	    var data = json[i];

		var pos = new google.maps.LatLng(
			json[i].lat,
			json[i].lng
		);

		var markers = new google.maps.Marker({
			position: pos,
			map: map,
			title: json[i].title
		});
		
		(function (markers, data) {
		    var info = new google.maps.InfoWindow(
                {
                    content: json[i].description,
                    map: map
                }
            );

		    markers.addListener(
            'click',
                function() {
                    info.open(
                            map,
                            markers
                    );
                }
            );
		}
		)(markers, data);
	}
}
