function onBodyLoad(){
  document.addEventListener("deviceready", onDeviceReady, false);
  initializeItems();
}  

function onDeviceReady() {
  //navigator.geolocation.getCurrentPosition(onGPSSuccess, onGPSError);

}

function initializeItems(){

    
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