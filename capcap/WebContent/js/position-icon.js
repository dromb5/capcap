

var alpha;
var beta;
var gamma;
var betta;

function makeNewPosition(betta){
    
    // Get viewport dimensions (remove the dimension of the div)
    var h = $(window).height() - 150;
    var w = $(window).width() - 100;
    
    if (betta > 60 && betta < 66) {
    	var nh = Math.floor(0 * h);
        var nw = Math.floor(0.5 * w);
        showIcon();
        hideDownArrow();
        hideUpArrow();
    } else if (betta >= 66 && betta < 72) {
    	var nh = Math.floor(0.1 * h);
        var nw = Math.floor(0.5 * w);
        showIcon();
        hideDownArrow();
        hideUpArrow();
    } else if (betta >= 72 && betta < 78) {
    	var nh = Math.floor(0.2 * h);
        var nw = Math.floor(0.5 * w);
        showIcon();
        hideDownArrow();
        hideUpArrow();
    } else if (betta >= 78 && betta < 84) {
    	var nh = Math.floor(0.3 * h);
        var nw = Math.floor(0.5 * w);
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
        var nw = Math.floor(0.5 * w);
        showIcon();
        hideDownArrow();
        hideUpArrow();
    } else if (betta >= 96 && betta < 102) {
    	var nh = Math.floor(0.6 * h);
        var nw = Math.floor(0.5 * w);
        showIcon();
        hideDownArrow();
        hideUpArrow();
    } else if (betta >= 102 && betta < 108) {
    	var nh = Math.floor(0.7 * h);
        var nw = Math.floor(0.5 * w);
        showIcon();
        hideDownArrow();
        hideUpArrow();
    } else if (betta >= 108 && betta < 114) {
    	var nh = Math.floor(0.8 * h);
        var nw = Math.floor(0.5 * w);
        showIcon();
        hideDownArrow();
        hideUpArrow();
    } else if (betta >= 114 && betta < 120) {
    	var nh = Math.floor(0.9 * h);
        var nw = Math.floor(0.5 * w);
        showIcon();
        hideDownArrow();
        hideUpArrow();
    } else if (betta >= 120) {
    	var nh = Math.floor(1 * h);
        var nw = Math.floor(0.5 * w);
        showDownArrow();
        moveDown();
        hideIcon();
    } else {
    	var nh = Math.floor(0 * h);
        var nw = Math.floor(0.5 * w);
        showUpArrow();
        hideIcon();
        moveUp();
    }
  
    return [nh,nw];    
    
}

function animateDiv(betta){
    var newq = makeNewPosition(betta);
    $('.icon').animate({ top: newq[0], left: newq[1] });
    
};

function moveDown(betta){
    var newq = makeNewPosition(betta);
    $('.downicon').animate({ top: newq[0], left: newq[1] });
    
};

function moveUp(betta){
    var newq = makeNewPosition(betta);
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
              if(alpha!=null || beta!=null || gamma!=null) 
                dataContainerOrientation.innerHTML = 'alpha: ' + alpha + '<br/>beta: ' + beta + '<br />gamma: ' + gamma;
            }, false);
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
    	animateDiv(betta);
    	}, 500);
  }