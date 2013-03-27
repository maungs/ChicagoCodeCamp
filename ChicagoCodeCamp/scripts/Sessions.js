
var jSessions;
var SessionsModel;

function onSessionsPage(){
    LoadSessions(EventId);
}
function LoadSessions(Id){
        app.showLoading();
        var today=new Date();
        var one_hour=1000*60*60;
        var SessionsLastPulled = storage["SessionsLast"];
        var SessionsLast = SessionsLastPulled==null? today.getTime(): parseInt(SessionsLastPulled);
        var now = today.getTime();
        var hoursPassed = (now-SessionsLast) / one_hour;
        if ((hoursPassed >= 24) || (hoursPassed ==0)) { 
            xmlhttp.open("GET","http://www.chicagocodecamp.com/api/Sessions/" + Id,true);
            xmlhttp.send();
            xmlhttp.onreadystatechange = SessionsLoaded;
        }
        else
        {
            LoadSessionsFromStorage();
        }
}
function SessionsLoaded( result){
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
        jSessions = jQuery.parseJSON(xmlhttp.responseText);
        BindSessions(jSessions);
		var today=new Date();
        var SessionsList = xmlhttp.responseText;
        storage["SessionsList"] =SessionsList;
        storage["SessionsLast"]= today.getTime().toString();
    }
    app.hideLoading();
}
function LoadSessionsFromStorage()
{
       var SessionsList = storage["SessionsList"];
       var jsonFeed = jQuery.parseJSON(SessionsList);
       BindSessions(jsonFeed);
       app.hideLoading();
}
function BindSessions(jsonArray)
{
    SessionsModel = {
				Sessions: ko.observableArray(jsonArray)
            };
		
	ko.applyBindings(SessionsModel, document.getElementById('SessionsList'));
}