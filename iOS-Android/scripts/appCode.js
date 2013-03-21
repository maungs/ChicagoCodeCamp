 var xmlhttp;
function onBodyLoad(){
  document.addEventListener("deviceready", onDeviceReady, false);
  initializeItems();
}  

function onDeviceReady() {
  //navigator.geolocation.getCurrentPosition(onGPSSuccess, onGPSError);

}

function initializeItems(){

    
}

function onLoadLandingPage(){
    $('.twoby').find('img').each(function(){
  var imgClass = (this.width/this.height > 1) ? 'wide' : 'tall';
  $(this).addClass(imgClass);
 });
    
	if (window.XMLHttpRequest)
	  {// code for IE7+, Firefox, Chrome, Opera, Safari
	  xmlhttp=new XMLHttpRequest();
	  }
	else
	  {// code for IE6, IE5
	  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	  }
}

function gotoSchedule(){
    window.location.href="#SchedulePage";
}

function gotoSessions(){
    window.location.href="#SessionsPage";
}

function gotoPresenters(){
    window.location.href="#PresentersPage";
}

function gotoSponsors(){
    window.location.href="#SponsorsPage";
}

function gotoAbout(){
    window.location.href="#AboutPage";
}

function gotoLocations(){
    window.location.href="#LocationPage";
}