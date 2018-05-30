var map;

var myObj;
var counter;

var features = [];

var locations = [];

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
	  zoom: 5,
	  center: new google.maps.LatLng(45.8, 16.02)
	});
	
	var icons = {
	  fire: {
		  url: 'images/fire.png',
		  labelOrigin: new google.maps.Point(35,10)
	  },
	  tint: {
		  url: 'images/tint.png',
		  labelOrigin: new google.maps.Point(35,10)
	  },
	  rss: {
		  url: 'images/rss.png',
		  labelOrigin: new google.maps.Point(35,10)
	  }
	};
	
	var infowindow = new google.maps.InfoWindow({
        content: "abc"
      });
	
	var markers;
	
	var check = function() {
	    if(features != 0) {
	    	markers = features.map(function(location, i) {
	    		return new google.maps.Marker({
	    			position: location,
	    			icon: icons[features[i].type],
	    			label: {
	    				text: features[i].type,
	    				fontWeight: "bold"
	    			}
	            });
	    	});
	    	var markerCluster = new MarkerClusterer(map, markers,
	                {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
	    	/*
	    	var i;
	    	for (i = 0; i < markers.length; i++) {
	    		markers[i].addListener('click', function() {
	    	          infowindow.open(map, markers[i]);
	            });
	    	}
	    	*/
	    }
	    else {
	        setTimeout(check, 500);
	    }
	}
	console.log(markers);
	
	console.log("added");

	check();
}
      
function countEvents() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	        myObj = JSON.parse(this.responseText);
	        counter = Object.keys(myObj.events).length;
	        console.log(myObj, counter);
	        var i;
	    	for (i = 0; i < counter; i++) {
	    		features.push({
	    			lat: myObj.events[i].latitude,
	    			lng: Number(myObj.events[i].longitude),
	    			type: myObj.events[i].eventType
	    		});
	    		locations.push({
	    			lat: myObj.events[i].latitude, 
	    			lng: Number(myObj.events[i].longitude)
	    		});
	    	}
	    }
	};
	xmlhttp.open("GET", "https://api.myjson.com/bins/9qodu", true);
	xmlhttp.send();
}    