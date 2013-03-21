
var jSponsors;
var SponsorsModel;

function onSponsorsPage(){
    
    
	if (window.XMLHttpRequest)
	  {// code for IE7+, Firefox, Chrome, Opera, Safari
	  xmlhttp=new XMLHttpRequest();
	  }
	else
	  {// code for IE6, IE5
	  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	  }
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
}

