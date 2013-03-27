var jEvents;
var EventsModel;
var EventId;

function onEventsPage(){
    LoadEvents();
}
function LoadEvents(){
    
    app.showLoading();
    
    
    var today=new Date();
	var one_hour=1000*60*60;
	var lastPulled = storage.getItem("EventsLastPulled");
	var lastPulled = lastPulled==null? today.getTime(): parseInt(lastPulled);
	var now = today.getTime();
	var hoursPassed = (now-lastPulled) / one_hour;
    if ((hoursPassed >= 12 || hoursPassed ==0)) { 
        xmlhttp.open("GET","http://www.chicagocodecamp.com/api/Events/",true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = EventsLoaded;
    }
    else
    {
        LoadEventsFromStorage();
    }
}
function EventsLoaded( result){
    EventId=5;
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
        jEvents = jQuery.parseJSON(xmlhttp.responseText);
        BindEvents(jEvents);
        var eventsList = xmlhttp.responseText;
        storage.setItem("eventsList", eventsList);
        storage.setItem("EventsLastPulled", today.getTime().toString());
    }
    app.hideLoading();
}
function LoadEventsFromStorage()
{
       var eventsList = storage.eventsList;
       var jsonFeed = jQuery.parseJSON(eventsList);
       BindEvents(jsonFeed);
       app.hideLoading();
}
function BindEvents(jsonArray)
{
    EventsModel = {
				Events : ko.observableArray(jsonArray),
				selectedId : ko.observable(jsonArray[0].Id)  // Nothing selected by default
			};
    ko.applyBindings(EventsModel, document.getElementById('sEventSchedule'));
    EventId=jsonArray[0].Id;
    document.getElementById('sEventSchedule').style.display = "block";
}
function eventChanged(sel) {
    EventId = sel.options[sel.selectedIndex].value;
}

