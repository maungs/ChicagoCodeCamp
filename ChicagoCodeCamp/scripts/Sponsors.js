
var jSponsors;
var SponsorsModel;

function onSponsorsPage(){
    storage = window.localStorage;
    LoadSponsors(EventId);
}
function LoadSponsors(Id){
        app.showLoading();
        var today=new Date();
        var one_hour=1000*60*60;
        var SponsorsLastPulled = storage.getItem("SponsorsLast");
        var SponsorsLast = SponsorsLastPulled==null? today.getTime(): parseInt(SponsorsLastPulled);
        var now = today.getTime();
        var hoursPassed = (now-SponsorsLast) / one_hour;
        if ((hoursPassed >= 12 || hoursPassed ==0)) { 
            xmlhttp.open("GET","http://www.chicagocodecamp.com/api/Sponsors/" + Id,true);
            xmlhttp.send();
            xmlhttp.onreadystatechange = SponsorsLoaded;
        }
        else
        {
            alert('No-XHR');
            LoadSponsorsFromStorage();
        }
}
function SponsorsLoaded( result){
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
        jSponsors = jQuery.parseJSON(xmlhttp.responseText);
        BindEvents(jSponsors);
        var sponsorsList = xmlhttp.responseText;
        storage.setItem("SponsorsList", sponsorsList);
        storage.setItem("SponsorsLast", today.getTime().toString());
    }
    app.hideLoading();
}
function LoadSponsorsFromStorage()
{
       var sponsorsList = storage.SponsorsList;
       var jsonFeed = jQuery.parseJSON(sponsorsList);
       BindSponsors(jsonFeed);
       app.hideLoading();
}
function BindSponsors(jsonArray)
{
    SponsorsModel = {
				Sponsors: ko.observableArray(jsonArray)
            };
		
	ko.applyBindings(SponsorsModel, document.getElementById('SponsorsList'));
}