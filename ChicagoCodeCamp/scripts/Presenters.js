var jPresenters;
var PresentersModel;
function onPresentersPage(){
    
    LoadPresenters(EventId);
}
function LoadPresenters(Id){
    app.showLoading();
    xmlhttp.open("GET","http://www.chicagocodecamp.com/api/Presenters/" + Id,true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = PresentersLoaded;
}
function PresentersLoaded( result){
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
        jPresenters = jQuery.parseJSON(xmlhttp.responseText);
		PresentersModel = {
				Presenters: ko.observableArray(jPresenters)
            };
		
		ko.applyBindings(PresentersModel, document.getElementById('PresentersList'));
    }
    app.hideLoading();
}
