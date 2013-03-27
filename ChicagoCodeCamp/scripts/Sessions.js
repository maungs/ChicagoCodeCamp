var jSessions;
var SessionsModel;
function onSessionsPage(){
    LoadSessions(EventId);
}
function LoadSessions(Id){
    app.showLoading();
    xmlhttp.open("GET","http://www.chicagocodecamp.com/api/Sessions/" + Id,true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = SessionsLoaded;
}
function SessionsLoaded( result){
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
        jSessions = jQuery.parseJSON(xmlhttp.responseText);
		SessionsModel = {
				Sessions: ko.observableArray(jSessions)
            };
		
		ko.applyBindings(SessionsModel, document.getElementById('SessionsList'));
    }
    app.hideLoading();
}
