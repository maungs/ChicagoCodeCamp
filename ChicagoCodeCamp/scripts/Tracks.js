
var jTracks;
var TracksModel;

function onTracksPage(){
    LoadTracks(EventId);
}
function LoadTracks(Id){
     alert('Hey');   
    app.showLoading();
    var today=new Date();
    var one_hour=1000*60*60;
    var TracksLastPulled = storage["TracksLast"];
    var TracksLast = TracksLastPulled==null? today.getTime(): parseInt(TracksLastPulled);
    var now = today.getTime();
    var hoursPassed = (now-TracksLast) / one_hour;
    if ((hoursPassed >= 12) || (hoursPassed ==0)) { 
        xmlhttp.open("GET","http://www.chicagocodecamp.com/api/Tracks/" + Id,true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = TracksLoaded;
    }
    else
    {
        LoadTracksFromStorage();
    }
}
function TracksLoaded( result){
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
        jTracks = jQuery.parseJSON(xmlhttp.responseText);
        BindTracks(jTracks);
		var today=new Date();
        var TracksList = xmlhttp.responseText;
        storage["TracksList"] =TracksList;
        storage["TracksLast"]= today.getTime().toString();
    }
    app.hideLoading();
}
function LoadTracksFromStorage()
{
       var TracksList = storage["TracksList"];
       var jsonFeed = jQuery.parseJSON(TracksList);
       BindTracks(jsonFeed);
       app.hideLoading();
}
function BindTracks(jsonArray)
{
    TracksModel = {
				Tracks: ko.observableArray(jsonArray)
            };
		
	ko.applyBindings(TracksModel, document.getElementById('TracksList'));
}