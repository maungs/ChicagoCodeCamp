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
    xmlhttp.abort();
    onSchedulePage();
}

function gotoSessions(){
    xmlhttp.abort();
    onSessionsPage();
}

function gotoPresenters(){
    xmlhttp.abort();
    onPresentersPage();
}

function gotoSponsors(){
    xmlhttp.abort();
    onSponsorsPage();
}

function gotoAbout(){
    xmlhttp.abort();
    window.location.href="#AboutPage";
}

function gotoLocations(){
    xmlhttp.abort();
    window.location.href="#LocationPage";
}