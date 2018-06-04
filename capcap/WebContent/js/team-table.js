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
	xmlhttp.open("GET", "https://api.myjson.com/bins/1gm3t6", true);
	xmlhttp.send();
}

/*
 * Function which fills the table with data from JSON file.
 */
function fillTable() {
	countEvents();
	var check = function(){
	    if(myObj != null){
	    	document.getElementsByClassName('loader')[0].style.visibility = 'hidden';
	    	var i;
	    	var table = document.getElementById("table");
	    	var team = 1;
	    	for (i = 0; i < counter; i++) {
	    		if (myObj.events[i].eventType == 'police') {
	    			var row = table.insertRow(team);
	    			team++;
		    	    var cell1 = row.insertCell(0);
		    	    var cell2 = row.insertCell(1);
		    	    var cell3 = row.insertCell(2);
		    	    var cell4 = row.insertCell(3);
		    	    cell1.innerHTML = myObj.events[i].eventType;
		    	    cell2.innerHTML = myObj.events[i].latitude;
		    	    cell3.innerHTML = myObj.events[i].longitude;
		    	    /*
		    	     * Last cell displays icon of a map.
		    	     * Click on icon will forward user to the Google Maps, and open a marker on a specific location.
		    	     * That location is set up in href variable.
		    	     */
		    	    var href = "https://www.google.com/maps/?q=" + myObj.events[i].latitude + "," + myObj.events[i].longitude;
		    	    var icon = "<i class=\"fas fa-map\"></i>";
		    	    cell4.innerHTML = "<a href=" + href + ">" + icon + "</a>";
	    		}
	    	}
	    }
	    else {
	        setTimeout(check, 500);
	    }
	}
	check();
}