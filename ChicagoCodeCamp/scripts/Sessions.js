
var jSessions;
var SessionsModel;

function onSessionsPage(){
    LoadSessions(EventId);
}
function LoadSessions(Id){
        var today=new Date();
        var one_hour=1000*60*60;
        var SessionsLastPulled = storage["SessionsLast"];
        var SessionsLast = SessionsLastPulled==null? today.getTime(): parseInt(SessionsLastPulled);
        var now = today.getTime();
        var hoursPassed = (now-SessionsLast) / one_hour;
        if ((hoursPassed >= 0) || (hoursPassed ==0)) { 
            xmlhttp.open("GET","http://www.chicagocodecamp.com/api/Sessions/" + Id,true);
            xmlhttp.send();
            xmlhttp.onreadystatechange = SessionsLoaded;
        }
        if(jSessions==null)
        {
            LoadSessionsFromStorage();
        }
        else
        { 
            window.location.href="#SessionsPage";
            app.hideLoading();
        }
}
function SessionsLoaded( result){
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
        jSessions = jQuery.parseJSON(xmlhttp.responseText);
        BindSessions();
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
       jSessions= jQuery.parseJSON(SessionsList);
       BindSessions();
       app.hideLoading();
}
function BindSessions()
{
    SessionsModel = {
				Sessions: ko.observableArray(jSessions),
                SessionSelected : SessionSelect
            };
		
	ko.applyBindings(SessionsModel, document.getElementById('SessionsList'));
    window.location.href="#SessionsPage";
}
function SessionSelect(e) {
    alert(e.Id);
}