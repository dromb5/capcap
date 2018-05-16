/*
 * One of the main parts of this app is AR view.
 * This script is doing several different things.
 * At first, it opens JSON file with the events.
 * Second, it creates icons of events and put them on a screen, or hide them if they are not in the visible spectre.
 * At last, it animates icons according to the heading of the phone. 
 */

//variables for retrieving data from motion sensors
var alpha;
var alpha_new;
var beta;
var gamma;
var betta;
var aalpha;
var aaalpha;

//coordinates which determines users position
var latitude;
var longitude;

var heading;

//array of angles between event and orientation of phone, for each event
var theta = [];

//number of events
var counter;

//JSON object with events
var myObj;

//closest event depending on angle
var closest;

//array of events. If event is visible, array[i] displays true, otherwise false
var visible = [];

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
	xmlhttp.open("GET", "https://api.myjson.com/bins/cs7tf", true);
	xmlhttp.send();
}

/*
 * Function creates particular events.
 * If there are 5 different events, 5 different divs will be created then.
 * Beside creating, this function also starts animation of event icons.
 */
function createEvent() {
	//loading of JSON file and counting events
	countEvents();
	/*
	 * It takes time to retrieve JSON file from server and to get user location coordinates.
	 * Because of that, it's necessary to check if JSON file and coordinates are retrieved, by checking their variable values.
	 * If values are null, function will try to execute again in 500ms, until it succeed.
	 */
	var check = function(){
	    if(myObj != null && latitude != null && longitude != null){
	    	var i;
	    	for (i = 0; i < counter; i++) {
	    		var div = document.createElement('div');
	    		var eventType;
	            eventType = myObj.events[i].eventType;
	            var eventLatitude = myObj.events[i].latitude;
	            var eventLongitude = myObj.events[i].longitude;
	            var distance = getDistanceBetweenCoordinates(latitude, longitude, eventLatitude, eventLongitude);
	            distance = formatDistance(distance);
	            var href = "https://www.google.com/maps/?q=" + myObj.events[i].latitude + "," + myObj.events[i].longitude;
	            /*
	             * It's necessary to have <a> tag inside <div>.
	             * <a> tag is required because of hyperlink, which redirects to specific point in Google Maps.
	             * Distance in kilometers is placed above event icon, everything is wrapped inside <a> tag, 
	             * and <a> tag is wrapped inside div. 
	             */
	            div.innerHTML = "<a href=\"" + href + "\"><div id=\"distance\">" + distance + " km"
	            + "</div><i class=\"fas fa-" + eventType + " fa-7x\" id=\"" + eventType + "-icon\"></i></a>";
	        	div.setAttribute('id', 'icon' + i);
	        	div.setAttribute('class', 'icon');
	        	var eventNumber = i;
	        	
	    		document.body.appendChild(div);
	    		startAnimations(eventNumber);
	    	}
	    }
	    else {
	        setTimeout(check, 500); // check again in a second
	    }
	}
	check();
}

/*
 * Event wrapped inside of div is animated every 1s.
 */
function startAnimations(i) {
	setInterval(function() {
    	betta = beta;
    	aalpha = alpha;
    	animateDiv(betta, aalpha, i);
    	}, 1000);
}

/*
 * Div is animated.
 */
function animateDiv(betta, aalpha, i){
    var newq = makeNewPosition(betta, aalpha, i);
    var icon = '#icon' + i;
    $(icon).animate({ top: newq[0], left: newq[1] });
    
};

/*
 * Function which finds closest event depending on angles.
 * This is necessary because if there are no icons on the screen, arrow must be shown on the left or right side,
 * so user could see if he needs to rotate find to left or right to find the closest event.
 */
function findTheClosestEvent() {
	setInterval(function() {
		console.log("closest is " + closest);
		console.log("alpha: " + alpha);
		console.log("alpha_new: " + alpha_new);
		console.log(visible);
		var source = alpha;
		var minDistance = 360;
		var min;
		var clockwise;
		var i;
		//there are 4 different situations to determine if closest event is clockwise or counterclockwise.
		for (i = 0; i < counter; i++) {
			if (source < theta[i] && theta[i] - source < 180) {
				min = theta[i] - source;
				if (min < minDistance) {
					minDistance = min;
					closest = i;
					clockwise = true;
				}
			} else if (theta[i] < source && source - theta[i] < 180) {
				min = source - theta[i];
				if (min < minDistance) {
					minDistance = min;
					closest = i;
					clockwise = false;
				}
			} else if (source < theta[i] && theta[i] - source > 180) {
				min = 360 - theta[i] + source;
				if (min < minDistance) {
					minDistance = min;
					closest = i;
					clockwise = false;
				}
			} else if (theta[i] < source && source - theta[i] > 180) {
				min = 360 - source + theta[i];
				if (min < minDistance) {
					minDistance = min;
					closest = i;
					clockwise = true;
				}
			}
			
		}
		console.log("closest is " + closest);
		console.log(visible.every(isNotVisible))
		/*
		 * If there are no events displayed on the screen, left/right arrow must be placed on the screen,
		 * according to the closest event
		 */
		
		if (visible.every(isNotVisible) == true) {
			if (clockwise) {
				showLeftArrow();
				hideRightArrow();
			} else {
				showRightArrow();
				hideLeftArrow();
			}
		} else {
			hideLeftArrow();
			hideRightArrow();
		}
	}, 500);
}

/*
 * Function for generating new position on the screen for a certain event, according to the orientation of the screen.
 * Betta angle determines vertical orientation. 
 * Difference between theta and alpha determines horizontal orientation.
 */
function makeNewPosition(betta, aalpha, i){
    
    var h = $(window).height() - 150;
    var w = $(window).width() - 100;
    
    if (betta > 60 && betta < 66) {
    	var nh = Math.floor(0 * h);
        showIcon(i);
        hideDownArrow();
        hideUpArrow();
    } else if (betta >= 66 && betta < 72) {
    	var nh = Math.floor(0.1 * h);
        showIcon(i);
        hideDownArrow();
        hideUpArrow();
    } else if (betta >= 72 && betta < 78) {
    	var nh = Math.floor(0.2 * h);
        showIcon(i);
        hideDownArrow();
        hideUpArrow();
    } else if (betta >= 78 && betta < 84) {
    	var nh = Math.floor(0.3 * h);
        showIcon(i);
        hideDownArrow();
        hideUpArrow();
    } else if (betta >= 84 && betta < 90) {
    	var nh = Math.floor(0.4 * h);
        var nw = Math.floor(0.5 * w);
        showIcon(i);
        hideDownArrow();
        hideUpArrow();
    } else if (betta >= 90 && betta < 96) {
    	var nh = Math.floor(0.5 * h);
        showIcon(i);
        hideDownArrow();
        hideUpArrow();
    } else if (betta >= 96 && betta < 102) {
    	var nh = Math.floor(0.6 * h);
        showIcon(i);
        hideDownArrow();
        hideUpArrow();
    } else if (betta >= 102 && betta < 108) {
    	var nh = Math.floor(0.7 * h);
        showIcon(i);
        hideDownArrow();
        hideUpArrow();
    } else if (betta >= 108 && betta < 114) {
    	var nh = Math.floor(0.8 * h);
        showIcon(i);
        hideDownArrow();
        hideUpArrow();
    } else if (betta >= 114 && betta < 120) {
    	var nh = Math.floor(0.9 * h);
        showIcon(i);
        hideDownArrow();
        hideUpArrow();
    } else if (betta >= 120) {
    	var nh = Math.floor(1 * h);
        showDownArrow();
        moveDown();
        hideIcon(i);
    } else {
    	var nh = Math.floor(0 * h);
        showUpArrow();
        hideIcon(i);
        moveUp();
    }
    
    if (theta[i] < aalpha + 10 && theta[i] > aalpha - 10) {
    	if (aalpha - theta[i] > -10 && aalpha - theta[i] <= -8) {
    		var nw = Math.floor(0 * w);
    	} else if (aalpha - theta[i] > -8 && aalpha - theta[i] <= -6) {
    		var nw = Math.floor(0.1 * w);
    	} else if (aalpha - theta[i] > -6 && aalpha - theta[i] <= -4) {
    		var nw = Math.floor(0.2 * w);
    	} else if (aalpha - theta[i] > -4 && aalpha - theta[i] <= -2) {
    		var nw = Math.floor(0.3 * w);
    	} else if (aalpha - theta[i] > -2 && aalpha - theta[i] <= 0) {
    		var nw = Math.floor(0.4 * w);
    	} else if (aalpha - theta[i] > 0 && aalpha - theta[i] <= 2) {
    		var nw = Math.floor(0.5 * w);
    	} else if (aalpha - theta[i] > 2 && aalpha - theta[i] <= 4) {
    		var nw = Math.floor(0.6 * w);
    	} else if (aalpha - theta[i] > 4 && aalpha - theta[i] <= 6) {
    		var nw = Math.floor(0.7 * w);
    	} else if (aalpha - theta[i] > 6 && aalpha - theta[i] <= 8) {
    		var nw = Math.floor(0.8 * w);
    	} else if (aalpha - theta[i] > 8 && aalpha - theta[i] <= 10) {
    		var nw = Math.floor(0.9 * w);
    	}
    } else {
    	hideIcon(i);
    }  
    return [nh,nw];    
}

/*
 * Function which is constantly reading data from device sensors and putting them to global variables.
 * Second part is in comments because it reads with different API, not necessary at this moment.
 */
function init() {
    //Find our div containers in the DOM
    var dataContainerOrientation = document.getElementById('dataContainerOrientation');
    var dataContainerMotion = document.getElementById('dataContainerMotion');
    
    //Check for support for DeviceOrientation event
    if(window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', function(event) {
              alpha = event.alpha;
              beta = event.beta;
              gamma = event.gamma;
              var abs = event.absolute;
              /*
              if(alpha!=null || beta!=null || gamma!=null) 
                dataContainerOrientation.innerHTML = 'alpha: ' + alpha + '<br/>beta: ' + beta + '<br />gamma: ' + gamma
                + '<br />abs: ' + abs + '<br />theta: ' + theta;
              */
            }, true);
    }    
    
    /*
    // Check for support for DeviceMotion events
    if(window.DeviceMotionEvent) {
    window.addEventListener('devicemotion', function(event) {
              alpha = event.accelerationIncludingGravity.x;
              beta = event.accelerationIncludingGravity.y;
              gamma = event.accelerationIncludingGravity.z;
              var r = event.rotationRate;
              var html = 'Acceleration:<br />';
              html += 'x: ' + x +'<br />y: ' + y + '<br/>z: ' + z+ '<br />';
              html += 'Rotation rate:<br />';
              if(r!=null) html += 'alpha: ' + r.alpha +'<br />beta: ' + r.beta + '<br/>gamma: ' + r.gamma + '<br />';
              dataContainerMotion.innerHTML = html;                  
            });
    }
    */   
}

/*
 * Function which formats distance to pretty format. If {
 * - 0 <= distance < 10 :: 4.78 km
 * - 10 =< distance < 100 :: 56.9 km
 * - else :: 234 km
 * }
 */
function formatDistance(distance) {
	distance /= 1000;
	if (distance < 10) {
		distance = Math.round(distance * 100) / 100;
	} else if (distance >= 10 && distance < 100) {
		distance = Math.round(distance * 10) / 10;
	} else {
		distance = Math.round(distance);
	}
	return distance;
}

/*
 * Function return true if event is NOT visible on the screen.
 */
function isNotVisible(visible) {
	if (visible == false) {
		return true;
	} else {
		return false;
	}
}

function showLeftArrow() {
	var x = document.getElementById("lefticon");
	x.style.display = "block";
}

function showRightArrow() {
	var x = document.getElementById("righticon");
	x.style.display = "block";
}

function hideLeftArrow() {
	var x = document.getElementById("lefticon");
	x.style.display = "none";
}

function hideRightArrow() {
	var x = document.getElementById("righticon");
	x.style.display = "none";
}

function moveDown(betta, aalpha){
    var newq = makeNewPosition(betta, aalpha);
    $('.downicon').animate({ top: newq[0], left: newq[1] });
    
};

function moveUp(betta, aalpha){
    var newq = makeNewPosition(betta, aalpha);
    $('.upicon').animate({ top: newq[0], left: newq[1] });
    
};

/*
 * Function for hiding certain icon if it shouldn't be visible anymore.
 */
function hideIcon(i) {
	var x = document.getElementById("icon" + i);
	if (x.style.display != "none"){
		x.style.display = "none";
		console.log("hide icon " + i);
		visible[i] = false;
	}
}

/*
 * Function for showing certain icon if it should be visible.
 */
function showIcon(i) {
	var x = document.getElementById("icon" + i);
	if (x.style.display != "block"){
		x.style.display = "block";
		console.log("show icon " + i);
		visible[i] = true;
	}
}

function hideDownArrow() {
	var x = document.getElementById("downicon");
	x.style.display = "none";
}

function showDownArrow() {
	var x = document.getElementById("downicon");
	x.style.display = "block";
}

function hideUpArrow() {
	var x = document.getElementById("upicon");
	x.style.display = "none";
}

function showUpArrow() {
	var x = document.getElementById("upicon");
	x.style.display = "block";
}

function calcAngleDegrees(x, y) {
	  return Math.atan2(y, x) * 180 / Math.PI;
}

function getDistanceBetweenCoordinates(lat1, lon1, lat2, lon2) {
	var R = 6371e3; // metres
	var φ1 = toRadians(lat1);
	var φ2 = toRadians(lat2);
	var Δφ = toRadians(lat2-lat1);
	var Δλ = toRadians(lon2-lon1);

	var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
	        Math.cos(φ1) * Math.cos(φ2) *
	        Math.sin(Δλ/2) * Math.sin(Δλ/2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

	var d = R * c;
	return d;
}

function getLocation() {
	var check = function(){
	    if(myObj != null){
	        // run when condition is met
	    	if (navigator.geolocation) {
	            navigator.geolocation.getCurrentPosition(showPosition);
	            findTheClosestEvent();
	        } else { 
	            x.innerHTML = "Geolocation is not supported by this browser.";
	        }
	    }
	    else {
	        setTimeout(check, 500); // check again in a second
	    }
	}
	check();   
}

function showPosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    var i;
    for (i = 0; i < counter; i++) {
    	var eventLatitude = myObj.events[i].latitude;
    	var eventLongitude = myObj.events[i].longitude;
    	var latitudeVector = eventLatitude - latitude;
        var longitudeVector = eventLongitude - longitude;
        theta.push(calcAngleDegrees(latitudeVector, longitudeVector));
        if (theta[i] < 0) {
        	theta[i] += 360;
        }
        theta[i] += 100;
        if (theta[i] > 360) {
        	theta[i] -= 360;
        }
    }
    
}

function toRadians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}

/*
 * This part is not used at the moment; it reads data from sensors with FULLTILT API.
 */

/*
var promise = FULLTILT.getDeviceOrientation({ 'type': 'world' });
var dataContainerMotions = document.getElementById('dataContainerMotion');
if ('ondeviceorientationabsolute' in window) {
	window.addEventListener('deviceorientationabsolute', function(event) {
		alpha_new = event.alpha;
		//dataContainerMotions.innerHTML = 'alpha: ' + event.alpha + '<br/>beta: ' + event.beta + '<br />gamma: ' + event.gamma + '<br />abs: ' + event.absolute;
	}, true);
	} else if ('ondeviceorientation' in window) {
		dataContainerMotions.innerHTML = 'not';
	}
*/

/*
 * -----------------------------------------------------------------------
 * -----------------------------------------------------------------------
 * ----------------- This part of code may be used later -----------------
 * -----------------------------------------------------------------------
 * -----------------------------------------------------------------------
 */

/*
// Wait for Promise result
promise.then(function(deviceOrientation) { // Device Orientation Events are supported

  // Register a callback to run every time a new 
  // deviceorientation event is fired by the browser.
  deviceOrientation.listen(function() {

    // Get the current *screen-adjusted* device orientation angles
    var currentOrientation = deviceOrientation.getScreenAdjustedEuler();

    // Calculate the current compass heading that the user is 'looking at' (in degrees)
    var compassHeading = 360 - currentOrientation.alpha;

    dataContainerMotions.innerHTML = compassHeading;

  });

}).catch(function(errorMessage) { // Device Orientation Events are not supported

  console.log(errorMessage);

  // Implement some fallback controls here...

});
*/


/*

function compassHeading(alpha, beta, gamma) {
	
	  var dataContainerMotion = document.getElementById('dataContainerMotion');

	  // Convert degrees to radians
	  var alphaRad = alpha * (Math.PI / 180);
	  var betaRad = beta * (Math.PI / 180);
	  var gammaRad = gamma * (Math.PI / 180);

	  // Calculate equation components
	  var cA = Math.cos(alphaRad);
	  var sA = Math.sin(alphaRad);
	  var cB = Math.cos(betaRad);
	  var sB = Math.sin(betaRad);
	  var cG = Math.cos(gammaRad);
	  var sG = Math.sin(gammaRad);

	  // Calculate A, B, C rotation components
	  var rA = - cA * sG - sA * sB * cG;
	  var rB = - sA * sG + cA * sB * cG;
	  var rC = - cB * cG;

	  // Calculate compass heading
	  var compassHeading = Math.atan(rA / rB);

	  // Convert from half unit circle to whole unit circle
	  if(rB < 0) {
	    compassHeading += Math.PI;
	  }else if(rA < 0) {
	    compassHeading += 2 * Math.PI;
	  }

	  // Convert radians to degrees
	  compassHeading *= 180 / Math.PI;

	  return compassHeading;

	}

	window.addEventListener('deviceorientation', function(evt) {

	  heading = compassHeading(alpha, beta, gamma);

	  dataContainerMotion.innerHTML = heading;

	}, false);

*/


