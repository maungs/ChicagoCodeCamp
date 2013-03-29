var jEvents;
var EventsModel;
var EventId=5;

function onEventsPage(){
    LoadEvents();
}
function LoadEvents(){
    var today=new Date();
	var one_hour=1000*60*60;
	var lastPulled = 0;
	try {
		lastPulled=storage["EventsLastPulled"];
	} catch (e) {
	 
	}
	lastPulled = lastPulled==null? today.getTime(): parseInt(lastPulled);
	var now = today.getTime();
	var hoursPassed = (now-lastPulled) / one_hour;
    if ((hoursPassed >= 12 || hoursPassed ==0)) { 
        app.showLoading();
        xmlhttp.open("GET","http://www.chicagocodecamp.com/api/Events/",true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = EventsLoaded;
    }
    if(jEvents==null)
    {
        app.showLoading();
        LoadEventsFromStorage();
    }
}
function EventsLoaded( result){
    EventId=5;
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
        jEvents = jQuery.parseJSON(xmlhttp.responseText);
        BindEvents();
		var today=new Date();
        var eventsList = xmlhttp.responseText;
        storage["eventsList"]=eventsList;
        storage["EventsLastPulled"]=today.getTime().toString();
    }
    app.hideLoading();
}
function LoadEventsFromStorage()
{
    var eventsList = storage.eventsList;
    jEvents = jQuery.parseJSON(eventsList);
    BindEvents();
    app.hideLoading();
}
function BindEvents()
{
    EventsModel = {
				Events : ko.observableArray(jEvents),
				selectedId : ko.observable(jEvents[0].Id)  // Nothing selected by default
			};
    ko.applyBindings(EventsModel, document.getElementById('sEventSchedule'));
    EventId=jEvents[0].Id;
    document.getElementById('sEventSchedule').style.display = "block";
}
function eventChanged(sel) {
    EventId = sel.options[sel.selectedIndex].value;
}

