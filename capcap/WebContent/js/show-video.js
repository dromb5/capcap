/*
 * Script for getting access to the camera, and showing camera viewfinder on the screen.
 */

var video = document.getElementById('video');

// Get access to the camera!
if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Not adding `{ audio: true }` since we only want video now
    navigator.mediaDevices.getUserMedia({ video: { facingMode: { exact: "environment" } }}).then(function(stream) {
        video.src = window.URL.createObjectURL(stream);
        video.play();
    });
} else if(navigator.getUserMedia) { // Standard
    navigator.getUserMedia({ video: { facingMode: { exact: "environment" }}}, function(stream) {
        video.src = stream;
        video.play();
    }, errBack);
} else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
    navigator.webkitGetUserMedia({ video: { facingMode: { exact: "environment" } }}, function(stream){
        video.src = window.webkitURL.createObjectURL(stream);
        video.play();
    }, errBack);
} else if(navigator.mozGetUserMedia) { // Mozilla-prefixed
    navigator.mozGetUserMedia({ video: { facingMode: { exact: "environment" } }}, function(stream){
        video.src = window.URL.createObjectURL(stream);
        video.play();
    }, errBack);
}

if (video.requestFullscreen) {
  video.requestFullscreen();
}

