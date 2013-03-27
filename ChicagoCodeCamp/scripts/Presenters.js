
var jPresenters;
var PresentersModel;

function onPresentersPage(){
    LoadPresenters(EventId);
}
function LoadPresenters(Id){
        app.showLoading();
        var today=new Date();
        var one_hour=1000*60*60;
        var PresentersLastPulled = storage["PresentersLast"];
        var PresentersLast = PresentersLastPulled==null? today.getTime(): parseInt(PresentersLastPulled);
        var now = today.getTime();
        var hoursPassed = (now-PresentersLast) / one_hour;
        if ((hoursPassed >= 24) || (hoursPassed ==0)) { 
            xmlhttp.open("GET","http://www.chicagocodecamp.com/api/Presenters/" + Id,true);
            xmlhttp.send();
            xmlhttp.onreadystatechange = PresentersLoaded;
        }
        else
        {
            LoadPresentersFromStorage();
        }
}
function PresentersLoaded( result){
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
        jPresenters = jQuery.parseJSON(xmlhttp.responseText);
        BindPresenters(jPresenters);
		var today=new Date();
        var PresentersList = xmlhttp.responseText;
        storage["PresentersList"] =PresentersList;
        storage["PresentersLast"]= today.getTime().toString();
    }
    app.hideLoading();
}
function LoadPresentersFromStorage()
{
       var PresentersList = storage["PresentersList"];
       var jsonFeed = jQuery.parseJSON(PresentersList);
       BindPresenters(jsonFeed);
       app.hideLoading();
}
function BindPresenters(jsonArray)
{
    PresentersModel = {
				Presenters: ko.observableArray(jsonArray)
            };
		
	ko.applyBindings(PresentersModel, document.getElementById('PresentersList'));
}