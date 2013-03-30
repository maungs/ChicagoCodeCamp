var xmlhttp;
var storage;
var tempLong, tempLatt, map, mapContainer;
nokia.Settings.set("appId", "_peU-uCkp-j8ovkzFGNU"); 
nokia.Settings.set("authenticationToken", "gBoUkAMoxoqIWfxWA5DuMQ");

var app = new kendo.mobile.Application(document.body);

$().ready(function () {
  document.addEventListener("deviceready", onDeviceReady, false);
  initializeItems();
  initializeMap(); 
});

function onDeviceReady() {
  navigator.geolocation.getCurrentPosition(onGPSSuccess, onGPSError);

}

function onGPSSuccess(position) {
    tempLatt = position.coords.latitude;
    tempLong = position.coords.longitude;
    var resultSet;
    if (resultSet) map.objects.remove(resultSet);
    resultSet = new nokia.maps.map.Container();
    coord = new nokia.maps.geo.Coordinate(tempLatt, tempLong);
    var myLocationMarker = new nokia.maps.map.StandardMarker(
        [tempLatt, tempLong],
        { 
          text: 'ME',
          brush: { color: "#800000" },
          textPen: { strokeColor: "#FFF" },
          pen: { strokeColor: "#176cc2" }
        }
     );
     map.objects.add(myLocationMarker); 
    
    
 }

function onGPSError(error) { 
  // your callback here
  alert('GPS is not available on the device');
}

function initializeItems(){
    if (window.XMLHttpRequest)
	  {// code for IE7+, Firefox, Chrome, Opera, Safari
	  xmlhttp=new XMLHttpRequest();
	  }
	else
	  {// code for IE6, IE5
	  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	  }
    storage = window.localStorage;
    onEventsPage();
    delete initializeItems;
}

function initializeMap(){
    
    
    mapContainer = document.getElementById("mapContainer");
    map = new nokia.maps.map.Display(mapContainer, {
    	center: [42.360525,-88.010777],
    	zoomLevel: 11,
        components: [new nokia.maps.map.component.Behavior()]
    });
    
    var myLocationMarker = new nokia.maps.map.StandardMarker(
        [42.360525,-88.010777],
        { 
          text: 'CCC',
          brush: { color: "#176cc2" },
          textPen: { strokeColor: "#FFF" },
          pen: { strokeColor: "#176cc2" }
        }
     );
     map.objects.add(myLocationMarker); 
     coord = new nokia.maps.geo.Coordinate(42.360525,-88.010777);
     map.set("center", coord);
    
}


function onLoadLandingPage(){
    $('.twoby').find('img').each(function(){
      var imgClass = (this.width/this.height > 1) ? 'wide' : 'tall';
      $(this).addClass(imgClass);
     });
    delete onLoadLandingPage;
}

function gotoSchedule(){
    app.showLoading();
    StopXHR();
    onSchedulePage();
}

function gotoSessions(){
    app.showLoading();
    StopXHR();
    onSessionsPage();
}

function gotoPresenters(){
    app.showLoading();
    StopXHR();
    onPresentersPage();
}

function gotoSponsors(){
    app.showLoading();
    StopXHR();
    onSponsorsPage();
}

function gotoAbout(){
    window.location.href="#AboutPage";
}

function gotoLocations(){
    window.location.href="#LocationPage";
}
function StopXHR(){
    if(xmlhttp.readyState!=4 || xmlhttp.readyState!=0)
        xmlhttp.abort();
} 
