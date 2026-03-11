
	function mapContent(){
		var api_key = mapAPI;
    	// console.log(api_key);
		// var latAndLong = {lat: 12.9629, lng: 77.5775}; 
		// var zoomLevel = 14;
		// var yourAddress = 'Bengaluru';

		var map = tt.map({
		    container: 'map',
		    key: api_key,
		    center: [0,0],
		    zoom: 14
		});

		tt.services.fuzzySearch({
			key:api_key,
			query: listingLocation
		}).then(function(response){
			var result = response.results;
			if(result && result.length >0){
				var position = result[0].position;
				map.flyTo({ center: position, zoom: 14 });
				var marker = new tt.Marker().setLngLat(position).addTo(map);

				var popupOffsets = {
		  		top: [0, 0],
		  		bottom: [0, -70],
		  		'bottom-right': [0, -70],
		  		'bottom-left': [0, -70],
		  		left: [25, -35],
		  		right: [-25, -35]
			};

			var popup = new tt.Popup({offset: popupOffsets}).setHTML(listingLocation);
	    	marker.setPopup(popup).togglePopup();
			}
		}).catch(function (error) {
        console.error("Geocoding failed:", error);
    });	 	
	 	// FOR CUSTOM MARKER
		//var customMarker = document.createElement('div');
		//customMarker.id = 'marker';
		//var marker = new tt.Marker({element: customMarker}).setLngLat(latAndLong).addTo(map);

    }
