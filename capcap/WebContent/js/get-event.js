var myObj;
var counter;

function countEvents() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	        myObj = JSON.parse(this.responseText);
	        counter = Object.keys(myObj.events).length;
	    }
	};
	xmlhttp.open("GET", "https://api.myjson.com/bins/ecaym", true);
	xmlhttp.send();
}

function fillInfo() {
	countEvents();
	
	var check = function() {
	    if(myObj != null) {
	    	var url = window.location.href;
	    	var params = url.split('?');
	    	var id = params[1].split('=')[1];	    	
	    	
	    	console.log(id);
	    	
	    	var eventInfo = "";
	    	var eventType = "";
	    	var latitude;
	    	var longitude;
	    	var i;
	    	for (i = 0; i < counter; i++) {
	    		if (myObj.events[i].id == id) {
	    			eventInfo = myObj.events[i].longInfo;
	    			eventType = myObj.events[i].eventType;
	    			latitude = myObj.events[i].latitude;
	    			longitude = myObj.events[i].longitude;
	    		}
	    	}
	    	
	    	console.log(eventInfo);
	    	var p = document.getElementById("eventInfo");
	    	p.innerHTML = eventInfo;
	    	
	    	var image = document.getElementById("eventImage");
	    	image.src = "images/" + eventType + ".jpg";
	    	
	    	var title = document.getElementById("imageTitle");
	    	var imageTitle = capitalizeFirstLetter(eventType);
	    	title.innerHTML = imageTitle;
	    	
	    	myMap(latitude, longitude);
	    }
	    else {
	        setTimeout(check, 500);
	    }
	}
	check();
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function myMap(latitude, longitude)
{
  myCenter=new google.maps.LatLng(latitude, longitude);
  var mapOptions= {
    center:myCenter,
    zoom:12, scrollwheel: false, draggable: false,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  var map=new google.maps.Map(document.getElementById("googleMap"),mapOptions);

  var marker = new google.maps.Marker({
    position: myCenter,
  });
  marker.setMap(map);
}