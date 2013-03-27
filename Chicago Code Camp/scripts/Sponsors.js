
var jSponsors;
var SponsorsModel;

function onSponsorsPage(){
    
    app.showLoading();
    LoadSponsors(5);
}
function LoadSponsors(EventId){
	  xmlhttp.open("GET","http://www.chicagocodecamp.com/api/Sponsors/" + EventId,true);
	  xmlhttp.send();
	  xmlhttp.onreadystatechange = SponsorsLoaded;
}
function SponsorsLoaded( result){
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
        jSponsors = jQuery.parseJSON(xmlhttp.responseText);
		SponsorsModel = {
				Sponsors: ko.observableArray(jSponsors)
            };
		
		ko.applyBindings(SponsorsModel, document.getElementById('SponsorsList'));
    }
    app.hideLoading();
}

