var json = '{"latitude":45.8145084, "longitude":15.9798007, "eventType":fire}';
obj = JSON.parse(json);

var latitude = document.getElementById('JSONLatitude');
var longitude = document.getElementById('JSONLongitude');
var eventType = document.getElementById('eventType');

latitude.innerHTML = obj.latitude;
longitude.innerHTML = obj.longitude;
eventType.innerHTML = obj.eventType