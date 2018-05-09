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
	xmlhttp.open("GET", "https://api.myjson.com/bins/cs7tf", true);
	xmlhttp.send();
}

function fillTable() {
	countEvents();
	var check = function(){
	    if(myObj != null){
	    	var i;
	    	var table = document.getElementById("table");
	    	for (i = 0; i < counter; i++) {
	    		var row = table.insertRow(i + 1);
	    	    var cell1 = row.insertCell(0);
	    	    var cell2 = row.insertCell(1);
	    	    var cell3 = row.insertCell(2);
	    	    var cell4 = row.insertCell(3);
	    	    cell1.innerHTML = myObj.events[i].eventType;
	    	    cell2.innerHTML = myObj.events[i].latitude;
	    	    cell3.innerHTML = myObj.events[i].longitude;
	    	    var a = document.createElement("a");
	    	    a.href = "https://www.google.com/maps/?q=" + latitude + "," + longitude;
	    	    a.innerHTML = "map";
	    	    cell3.innerHTML = a;
	    	}
	    }
	    else {
	        setTimeout(check, 500);
	    }
	}
	check();
}