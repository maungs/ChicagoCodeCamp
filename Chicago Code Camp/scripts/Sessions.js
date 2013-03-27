var jSessions;
var SessionsModel;
function onSessionsPage(){
    LoadSessions(jEvents[0].Id);
}
function eventChanged(sel) {
    var value = sel.options[sel.selectedIndex].value;
    LoadSessions(value);
}
function LoadSessions(EventId){
    app.showLoading();
    xmlhttp.open("GET","http://www.chicagocodecamp.com/api/Sessions/" + EventId,true);
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
