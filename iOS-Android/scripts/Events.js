var jEvents;
var EventsModel;

function onEventsPage(){
    LoadEvents();
}
function LoadEvents(){
    
    app.showLoading();
    xmlhttp.open("GET","http://www.chicagocodecamp.com/api/Events/",true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = EventsLoaded;
}
function EventsLoaded( result){
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
        jEvents = jQuery.parseJSON(xmlhttp.responseText);
		EventsModel = {
				Events : ko.observableArray(jEvents),
				selectedId : ko.observable(jEvents[0].Id)  // Nothing selected by default
			};
		ko.applyBindings(EventsModel, document.getElementById('sEventSchedule'));
		ko.applyBindings(EventsModel, document.getElementById('sEventSessions'));
    }
    app.hideLoading();
}

