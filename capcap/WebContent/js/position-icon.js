var alpha;
var beta;
var gamma;
var betta;
var aalpha;

var eventLatitude = 45.8009741;
var eventLongitude = 16.0293145;

var latitudeVector;
var longitudeVector;

var latitude;
var longitude;

var heading;

var theta;

var counter;

function countEvents() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	        var myObj = JSON.parse(this.responseText);
	        counter = Object.keys(myObj.events).length;
	    }
	};
	xmlhttp.open("GET", "https://api.myjson.com/bins/b7co7", true);
	xmlhttp.send();
}

function createEvent() {
	countEvents();
	var i;
	for (i = 0; i < 1; i++) { //TODO: 1 should be changed to counter
		var div = document.createElement('div');
		var eventType;
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
		    if (this.readyState == 4 && this.status == 200) {
		        var myObj = JSON.parse(this.responseText);
		        eventType = myObj.events[i-1].eventType;
		        div.innerHTML = "<i class=\"fas fa-" + eventType + " fa-7x\" id=\"" + eventType + "-icon\"></i>" + counter;
		    	div.setAttribute('id', 'icon');
		    	div.setAttribute('class', 'icon');
		    }
		};
		xmlhttp.open("GET", "https://api.myjson.com/bins/qa9fb", true);
		xmlhttp.send();
		document.body.appendChild(div);
	}
}

function makeNewPosition(betta, aalpha){
    
    var h = $(window).height() - 150;
    var w = $(window).width() - 100;
    
    if (betta > 60 && betta < 66) {
    	var nh = Math.floor(0 * h);
        showIcon();
        hideDownArrow();
        hideUpArrow();
    } else if (betta >= 66 && betta < 72) {
    	var nh = Math.floor(0.1 * h);
        showIcon();
        hideDownArrow();
        hideUpArrow();
    } else if (betta >= 72 && betta < 78) {
    	var nh = Math.floor(0.2 * h);
        showIcon();
        hideDownArrow();
        hideUpArrow();
    } else if (betta >= 78 && betta < 84) {
    	var nh = Math.floor(0.3 * h);
        showIcon();
        hideDownArrow();
        hideUpArrow();
    } else if (betta >= 84 && betta < 90) {
    	var nh = Math.floor(0.4 * h);
        var nw = Math.floor(0.5 * w);
        showIcon();
        hideDownArrow();
        hideUpArrow();
    } else if (betta >= 90 && betta < 96) {
    	var nh = Math.floor(0.5 * h);
        showIcon();
        hideDownArrow();
        hideUpArrow();
    } else if (betta >= 96 && betta < 102) {
    	var nh = Math.floor(0.6 * h);
        showIcon();
        hideDownArrow();
        hideUpArrow();
    } else if (betta >= 102 && betta < 108) {
    	var nh = Math.floor(0.7 * h);
        showIcon();
        hideDownArrow();
        hideUpArrow();
    } else if (betta >= 108 && betta < 114) {
    	var nh = Math.floor(0.8 * h);
        showIcon();
        hideDownArrow();
        hideUpArrow();
    } else if (betta >= 114 && betta < 120) {
    	var nh = Math.floor(0.9 * h);
        showIcon();
        hideDownArrow();
        hideUpArrow();
    } else if (betta >= 120) {
    	var nh = Math.floor(1 * h);
        showDownArrow();
        moveDown();
        hideIcon();
    } else {
    	var nh = Math.floor(0 * h);
        showUpArrow();
        hideIcon();
        moveUp();
    }
    
    if (theta < aalpha + 10 && theta > aalpha - 10) {
    	if (aalpha - theta > -10 && aalpha - theta <= -8) {
    		var nw = Math.floor(0 * w);
    	} else if (aalpha - theta > -8 && aalpha - theta <= -6) {
    		var nw = Math.floor(0.1 * w);
    	} else if (aalpha - theta > -6 && aalpha - theta <= -4) {
    		var nw = Math.floor(0.2 * w);
    	} else if (aalpha - theta > -4 && aalpha - theta <= -2) {
    		var nw = Math.floor(0.3 * w);
    	} else if (aalpha - theta > -2 && aalpha - theta <= 0) {
    		var nw = Math.floor(0.4 * w);
    	} else if (aalpha - theta > 0 && aalpha - theta <= 2) {
    		var nw = Math.floor(0.5 * w);
    	} else if (aalpha - theta > 2 && aalpha - theta <= 4) {
    		var nw = Math.floor(0.6 * w);
    	} else if (aalpha - theta > 4 && aalpha - theta <= 6) {
    		var nw = Math.floor(0.7 * w);
    	} else if (aalpha - theta > 6 && aalpha - theta <= 8) {
    		var nw = Math.floor(0.8 * w);
    	} else if (aalpha - theta > 8 && aalpha - theta <= 10) {
    		var nw = Math.floor(0.9 * w);
    	}
    } else {
    	var nh = Math.floor(1 * h);
    	var nw = Math.floor(1 * w);
    }
    
    return [nh,nw];    
    
}

function animateDiv(betta, aalpha){
    var newq = makeNewPosition(betta, aalpha);
    $('.icon').animate({ top: newq[0], left: newq[1] });
    
};

function moveDown(betta, aalpha){
    var newq = makeNewPosition(betta, aalpha);
    $('.downicon').animate({ top: newq[0], left: newq[1] });
    
};

function moveUp(betta, aalpha){
    var newq = makeNewPosition(betta, aalpha);
    $('.upicon').animate({ top: newq[0], left: newq[1] });
    
};

function hideIcon() {
	var x = document.getElementById("icon");
	x.style.display = "none";
}

function showIcon() {
	var x = document.getElementById("icon");
	x.style.display = "block";
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

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    latitudeVector = eventLatitude - latitude;
    longitudeVector = eventLongitude - longitude;
    theta = calcAngleDegrees(latitudeVector, longitudeVector);
    if (theta < 0) {
    	theta += 360;
    }
    theta += 100;
    if (theta > 360) {
    	theta -= 360;
    }
}

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
              if(alpha!=null || beta!=null || gamma!=null) 
                dataContainerOrientation.innerHTML = 'alpha: ' + alpha + '<br/>beta: ' + beta + '<br />gamma: ' + gamma
                + '<br />abs: ' + abs + '<br />theta: ' + theta;
            }, true);
    }

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
    
    setInterval(function() {
    	betta = beta;
    	aalpha = alpha;
    	animateDiv(betta, aalpha);
    	}, 500);
  }


var promise = FULLTILT.getDeviceOrientation({ 'type': 'world' });
var dataContainerMotions = document.getElementById('dataContainerMotion');
if ('ondeviceorientationabsolute' in window) {
	window.addEventListener('deviceorientationabsolute', function(event) {
		dataContainerMotions.innerHTML = 'alpha: ' + event.alpha + '<br/>beta: ' + event.beta + '<br />gamma: ' + event.gamma + '<br />abs: ' + event.absolute;
	}, true);
	} else if ('ondeviceorientation' in window) {
		dataContainerMotions.innerHTML = 'not';
	}
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


