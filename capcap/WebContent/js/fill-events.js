function fillEvents(imageSource, imageName) {
	var div = document.getElementById('event-container');
	
	var outerDiv = document.createElement('div');
	outerDiv.className = "w3-display-container";
	
	var innerDiv = document.createElement('div');
	innerDiv.className = "w3-display-topleft w3-black w3-padding";
	innerDiv.innerHTML = imageName;
	
	var infoDiv = document.createElement('div');
	infoDiv.className = "w3-display-bottomleft w3-padding";
	
	var shortEventInfo = "Info About Event sdfgsdfsf fdvefwewe fwefw";
	
	var info = "<a class=\"event-info\">" + shortEventInfo + "</a>";
	
	infoDiv.innerHTML = info;
	
	var image = document.createElement('img');
	image.src = imageSource;
	image.style='width:100%';
	
	outerDiv.appendChild(innerDiv);
	outerDiv.appendChild(infoDiv);
	outerDiv.appendChild(image);
	
	div.appendChild(outerDiv);
	
	$(outerDiv).hide();
	
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
	    		if (myObj.events[i].eventType == 'fire' || myObj.events[i].eventType == 'flood'
	    			|| myObj.events[i].eventType == 'earthquake' || myObj.events[i].eventType == 'hurricane'
	    				|| myObj.events[i].eventType == 'rescuing' || myObj.events[i].eventType == 'information' 
	    					|| myObj.events[i].eventType == 'warning') {
	    			var imageSource = 'images/earthquake.jpg';
		    		var imageName = 'Earthquake';
		    		if (myObj.events[i].eventType == 'fire') {
		    			imageSource = 'images/fire.jpg';
		    			imageName = 'Fire';
		    		} else if (myObj.events[i].eventType == 'flood') {
		    			imageSource = 'images/flood.jpg';
		    			imageName = 'Flood';
		    		} else if (myObj.events[i].eventType == 'earthquake') {
		    			imageSource = 'images/earthquake.jpg';
		    			imageName = 'Earthquake';
		    		} else if (myObj.events[i].eventType == 'hurricane') {
		    			imageSource = 'images/hurricane.jpg';
		    			imageName = 'Hurricane';
		    		} else if (myObj.events[i].eventType == 'rescuing') {
		    			imageSource = 'images/rescuing.jpg';
		    			imageName = 'Rescuing';
		    		} else if (myObj.events[i].eventType == 'information') {
		    			imageSource = 'images/information.jpg';
		    			imageName = 'Info';
		    		} else if (myObj.events[i].eventType == 'warning') {
		    			imageSource = 'images/warning.jpg';
		    			imageName = 'Warning';
		    		}
		    		
		    		fillEvents(imageSource, imageName);
		    		
		    	    //cell2.innerHTML = myObj.events[i].latitude;
		    	    //cell3.innerHTML = myObj.events[i].longitude;
	    		}
	    		
		    		
	    	    
	    	    
	    	}
	    	$("div.w3-display-container").each(function(index) {
	    	    $(this).delay(400*index).fadeIn(300);
	    	});
	    }
	    else {
	        setTimeout(check, 500);
	    }
	}
	check();
}