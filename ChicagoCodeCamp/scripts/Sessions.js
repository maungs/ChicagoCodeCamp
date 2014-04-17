
var jSessions;
var SessionsModel;

function onSessionsPage(){
    app.showLoading();
    LoadSessions(EventId);
}
function LoadSessions(Id){
        var today=new Date();
        var one_hour=1000*60*60;
        var SessionsLastPulled = storage["SessionsLast"];
        var SessionsLast = SessionsLastPulled==null? today.getTime(): parseInt(SessionsLastPulled);
        var now = today.getTime();
        var hoursPassed = (now-SessionsLast) / one_hour;

        xmlhttp.onreadystatechange = SessionsLoaded;
        xmlhttp.open("GET","http://www.chicagocodecamp.com/api/Sessions/" + Id.toString()+"?json=true",true);
        xmlhttp.send();
        
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
function SessionsLoaded(){
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
    window.location.href="#SessionPage?"+e.Id;
}