var jSchedules;
var SchedulesModel;

function onSchedulePage(){
    app.showLoading();
    LoadSchedules(EventId);
}
function LoadSchedules(Id){
        var today=new Date();
        var one_hour=1000*60*60;
        var SchedulesLastPulled = storage["SchedulesLast"];
        var SchedulesLast = SchedulesLastPulled==null? today.getTime(): parseInt(SchedulesLastPulled);
        var now = today.getTime();
        var hoursPassed = (now-SchedulesLast) / one_hour;
        
            xmlhttp.onreadystatechange = SchedulesLoaded;
            xmlhttp.open("GET","http://www.chicagocodecamp.com/API/Schedules/" + Id.toString()+"?json=true",true);
            xmlhttp.send();
        
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
function SchedulesLoaded(){
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
    window.location.href="#SessionPage?"+e.SubmissionId;
}