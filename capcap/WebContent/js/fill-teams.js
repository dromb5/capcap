function fillEvents(imageSource, imageName) {
	var div = document.getElementById('event-container');
	
	var outerDiv = document.createElement('div');
	outerDiv.className = "w3-display-container";
	
	var innerDiv = document.createElement('div');
	innerDiv.className = "w3-display-topleft w3-black w3-padding";
	innerDiv.innerHTML = imageName;
	
	var image = document.createElement('img');
	image.src = imageSource;
	image.style='width:100%';
	
	outerDiv.appendChild(innerDiv);
	outerDiv.appendChild(image);
	
	div.appendChild(outerDiv);
}

/*
 * Script which fills the empty table on EventsList.html file.
 * Table is filled with the data from JSON file.
 */

var myObj;
var counter;

/*
 * Function for counting total number of events.
 * JSON file is read from server and placed to variable myObj.
 * Number of events is places to variable counter.
 */
function countEvents() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	        myObj = JSON.parse(this.responseText);
	        counter = Object.keys(myObj.events).length;
	    }
	};
	xmlhttp.open("GET", "https://api.myjson.com/bins/x3kwy", true);
	xmlhttp.send();
}

/*
 * Function which fills the table with data from JSON file.
 */
function fillTable() {
	countEvents();
	var check = function(){
	    if(myObj != null){
	    	var i;
	    	for (i = 0; i < counter; i++) {
	    		if (myObj.events[i].eventType == 'police' || myObj.events[i].eventType == 'ambulance'
	    			|| myObj.events[i].eventType == 'firefighters' || myObj.events[i].eventType == 'rescue') {
	    			var imageSource = 'images/ambulance.jpg';
		    		var imageName = 'Ambulance';
		    		if (myObj.events[i].eventType == 'police') {
		    			imageSource = 'images/police.jpg';
		    			imageName = 'Police';
		    		}
		    		
		    		fillEvents(imageSource, imageName);
		    		
		    	    //cell2.innerHTML = myObj.events[i].latitude;
		    	    //cell3.innerHTML = myObj.events[i].longitude;
	    		}
		    		
	    	    
	    	    
	    	}
	    }
	    else {
	        setTimeout(check, 500);
	    }
	}
	check();
}