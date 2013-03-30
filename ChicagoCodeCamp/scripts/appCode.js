var xmlhttp;
var storage;
var app = new kendo.mobile.Application(document.body);

	$().ready(function () {
  
    initializeItems();
		});


function onDeviceReady() {
  //navigator.geolocation.getCurrentPosition(onGPSSuccess, onGPSError);
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