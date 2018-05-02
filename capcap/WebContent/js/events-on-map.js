var map;

var myObj;
var counter;

var features = [];

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
	  zoom: 16,
	  center: new google.maps.LatLng(45.8, 16.02),
	  mapTypeId: 'roadmap'
	});
	
	var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
	var icons = {
	  fire: {
		  icon: 'images/fire.png'
	  },
	  tint: {
		  icon: 'images/tint.png'
	  },
	  rss: {
		  icon: 'images/rss.png'
	  }
	};
	/*
	var features = [
	  {
	    position: new google.maps.LatLng(-33.91721, 151.22630),
	    type: 'fire'
	  }, {
	    position: new google.maps.LatLng(-33.91539, 151.22820),
	    type: 'fire'
	  }, {
	    position: new google.maps.LatLng(-33.91747, 151.22912),
	    type: 'info'
	  }, {
	    position: new google.maps.LatLng(-33.91910, 151.22907),
	    type: 'info'
	  }, {
	    position: new google.maps.LatLng(-33.91725, 151.23011),
	    type: 'info'
	  }, {
	    position: new google.maps.LatLng(-33.91872, 151.23089),
	    type: 'info'
	  }, {
	    position: new google.maps.LatLng(-33.91784, 151.23094),
	    type: 'info'
	  }, {
	    position: new google.maps.LatLng(-33.91682, 151.23149),
	    type: 'info'
	  }, {
	    position: new google.maps.LatLng(-33.91790, 151.23463),
	    type: 'info'
	  }, {
	    position: new google.maps.LatLng(-33.91666, 151.23468),
	    type: 'info'
	  }, {
	    position: new google.maps.LatLng(-33.916988, 151.233640),
	    type: 'info'
	  }, {
	    position: new google.maps.LatLng(-33.91662347903106, 151.22879464019775),
	    type: 'parking'
	  }, {
	    position: new google.maps.LatLng(-33.916365282092855, 151.22937399734496),
	    type: 'parking'
	  }, {
	    position: new google.maps.LatLng(-33.91665018901448, 151.2282474695587),
	    type: 'parking'
	  }, {
	    position: new google.maps.LatLng(-33.919543720969806, 151.23112279762267),
	    type: 'parking'
	  }, {
	    position: new google.maps.LatLng(-33.91608037421864, 151.23288232673644),
	    type: 'fire'
	  }, {
	    position: new google.maps.LatLng(-33.91851096391805, 151.2344058214569),
	    type: 'parking'
	  }, {
	    position: new google.maps.LatLng(-33.91818154739766, 151.2346203981781),
	    type: 'parking'
	  }, {
	    position: new google.maps.LatLng(-33.91727341958453, 151.23348314155578),
	    type: 'library'
	  }
	];
	*/
	
	// Create markers.
	var check = function(){
	    if(features != 0){
	    	console.log("ok");
			features.forEach(function(feature) {
			      var marker = new google.maps.Marker({
			        position: feature.position,
			        icon: icons[feature.type].icon,
			        map: map
			      });
			    });
	    }
	    else {
	        setTimeout(check, 500); // check again in a second
	    }
	}

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
	    			position: new google.maps.LatLng(myObj.events[i].latitude, myObj.events[i].longitude),
	    			type: myObj.events[i].eventType
	    		});
	    	}
	    	console.log(features);
	    }
	};
	xmlhttp.open("GET", "https://api.myjson.com/bins/cs7tf", true);
	xmlhttp.send();
}    