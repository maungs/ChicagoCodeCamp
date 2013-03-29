var jSchedules;
var SchedulesModel;

function onSchedulePage(){
    LoadSchedules(EventId);
}
function LoadSchedules(Id){
        app.showLoading();
        var today=new Date();
        var one_hour=1000*60*60;
        var SchedulesLastPulled = storage["SchedulesLast"];
        var SchedulesLast = SchedulesLastPulled==null? today.getTime(): parseInt(SchedulesLastPulled);
        var now = today.getTime();
        var hoursPassed = (now-SchedulesLast) / one_hour;
        if ((hoursPassed >= 2) || (hoursPassed ==0)) { 
            xmlhttp.open("GET","http://www.chicagocodecamp.com/API/Schedules/" + Id,true);
            xmlhttp.send();
            xmlhttp.onreadystatechange = SchedulesLoaded;
        }
        if(jSchedules==null)
        {
            LoadSchedulesFromStorage();
        }
        else
        { 
            window.location.href="#SchedulePage";
            app.hideLoading();
        }
}
function SchedulesLoaded( result){
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
        jSchedules = jQuery.parseJSON(xmlhttp.responseText);
        BindSchedules(jSchedules);
		var today=new Date();
        var SchedulesList = xmlhttp.responseText;
        storage["SchedulesList"] =SchedulesList;
        storage["SchedulesLast"]= today.getTime().toString();
    }
    
    app.hideLoading();
}
function LoadSchedulesFromStorage()
{
       var SchedulesList = storage["SchedulesList"];
       var jsonFeed = jQuery.parseJSON(SchedulesList);
       BindSchedules(jsonFeed);
       app.hideLoading();
}
function BindSchedules(jsonArray)
{
    SchedulesModel = {
				Schedules: ko.observableArray(jsonArray),
                SchedulesSelected : ScheduleSelect
            };	
	ko.applyBindings(SchedulesModel, document.getElementById('SchedulesList'));
    window.location.href="#SchedulePage";
}
function ScheduleSelect(e) {
    alert(e.SubmissionId);
}