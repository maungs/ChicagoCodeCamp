var jPresenters;
var PresentersModel;
function onPresentersPage(){
    
	if (window.XMLHttpRequest)
	  {// code for IE7+, Firefox, Chrome, Opera, Safari
	  xmlhttp=new XMLHttpRequest();
	  }
	else
	  {// code for IE6, IE5
	  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	  }
    LoadPresenters(5);
}
function LoadPresenters(EventId){
	  xmlhttp.open("GET","http://www.chicagocodecamp.com/api/Presenters/" + EventId,true);
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
		
		ko.applyBindings(PresentersModel);
    }
}
