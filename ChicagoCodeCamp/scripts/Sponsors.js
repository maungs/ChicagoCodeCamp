
var jSponsors;
var SponsorsModel;

function onSponsorsPage(){
    LoadSponsors(EventId);
}
function LoadSponsors(Id){
        app.showLoading();
        var today=new Date();
        var one_hour=1000*60*60;
        var SponsorsLastPulled = storage["SponsorsLast"];
        var SponsorsLast = SponsorsLastPulled==null? today.getTime(): parseInt(SponsorsLastPulled);
        var now = today.getTime();
        var hoursPassed = (now-SponsorsLast) / one_hour;
        if ((hoursPassed >= 24) || (hoursPassed ==0)) {
            xmlhttp.onreadystatechange = SponsorsLoaded;
            xmlhttp.open("GET","http://www.chicagocodecamp.com/api/Sponsors/" + Id.toString(),true);
            xmlhttp.send();
        }
        else if(jSponsors==null)
        {
            LoadSponsorsFromStorage();
        }
        else
        { 
            window.location.href="#SponsorsPage";
            app.hideLoading();
        }
}
function SponsorsLoaded(){
	var today=new Date();
    var sponsorsList;
    
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
        jSponsors = jQuery.parseJSON(xmlhttp.responseText);
        
        alert('Before bind');
        BindSponsors();
        sponsorsList = xmlhttp.responseText;
        storage["SponsorsList"] =sponsorsList;
        storage["SponsorsLast"]= today.getTime().toString();
        app.hideLoading();
    }
    
}
function LoadSponsorsFromStorage()
{
       var sponsorsList = storage["SponsorsList"];
       jSponsors = jQuery.parseJSON(sponsorsList);
       BindSponsors();
       app.hideLoading();
}
function BindSponsors()
{
    
        alert('Before');
    SponsorsModel = {
				Sponsors: ko.observableArray(jSponsors)
            };
        alert('After');
		
	ko.applyBindings(SponsorsModel, document.getElementById('SponsorsList'));
        alert('Now');
    window.location.href="#SponsorsPage";
}