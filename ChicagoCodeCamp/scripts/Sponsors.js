
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

        xmlhttp.onreadystatechange = SponsorsLoaded;
        xmlhttp.open("GET","http://www.chicagocodecamp.com/api/Sponsors/" + Id.toString()+"?json=true",true);
        xmlhttp.send();
            
        if(jSponsors==null)
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
    SponsorsModel = {
				Sponsors: ko.observableArray(jSponsors)
            };
		
	ko.applyBindings(SponsorsModel, document.getElementById('SponsorsList'));
    window.location.href="#SponsorsPage";
}