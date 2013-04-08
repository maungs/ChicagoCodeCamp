
function onSessionPage(e){
    app.showLoading();
    var scroller = e.view.scroller;
    scroller.reset();
    HideProfileImage();
    var URL = window.location.toString();
    var queryList = URL.split("?");       
    var SessionId = queryList[1];
    
    if(jSessions == null || jSessions.length==0)
    {
        var SessionsList = storage["SessionsList"];
        jSessions = jQuery.parseJSON(SessionsList);
        LoadSession(SessionId);
    }
    else 
    {
        GetLocalSession(SessionId);
        LoadSession(SessionId);
    }
}
function HideProfileImage(){
    document.getElementById('sProfileImg').style.display = "none";
    document.getElementById('sProfile2Img').style.display = "none";
}
function GetLocalSession(SessionId){
    var i =0;
    for(i = 0; i<jSessions.length; i++){
        if(jSessions[i].Id ==SessionId)
        {
            FillOutSession(jSessions[i]);
            LoadSession(SessionId);
            break;
        }
    }
}

function LoadSession(Id){
    xmlhttp.onreadystatechange = SessionLoaded;
    xmlhttp.open("GET","http://www.chicagocodecamp.com/api/Session/" + Id.toString()+"?json=true",true);
    xmlhttp.send();
}
function SessionLoaded(){
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
        var jSession = jQuery.parseJSON(xmlhttp.responseText);
        FillOutSession(jSession);
    }
    app.hideLoading();
}
function FillOutSession(Session)
{
    document.getElementById('sTitle').innerHTML = Session.Title;
    if(Session.hasOwnProperty("SpeakerAvatar"))
    {
        if(Session.SpeakerAvatar)
        {
            document.getElementById('sSpeaker').innerHTML = Session.SpeakerName;
            document.getElementById('sProfileImg').style.backgroundImage="url('"+Session.SpeakerAvatar+"')";
            document.getElementById('sProfileImg').style.display = "block";
            sSpeaker = Session.SpeakerId;
        }
    }
    if(Session.hasOwnProperty("SecondSpeakerAvatar"))
    {
        if(Session.SecondSpeakerAvatar)
        {
            document.getElementById('sSpeaker2').innerHTML = Session.SecondSpeakerName;
            document.getElementById('sProfile2Img').style.backgroundImage="url('"+Session.SecondSpeakerAvatar+"')";
            document.getElementById('sProfile2Img').style.display = "block";
            sSpeaker2=Session.SecondSpeakerId;
        }
    }
    if(Session.hasOwnProperty("Abstract"))
    {
        if(Session.Abstract)
        {
            document.getElementById('sAbstract').innerHTML = Session.Abstract;
        }
    }
    if(Session.hasOwnProperty("Level"))
    {
        if(Session.Level)
        {
            document.getElementById('sLevel').innerHTML = Session.Level;
        }
    }
    if(Session.hasOwnProperty("keywords"))
    {
        if(Session.keywords)
        {
            document.getElementById('sKeywords').innerHTML = Session.keywords;
        }
    }
}
function goto1presenter()
{
    window.location.href="#PresenterPage?"+sSpeaker;
}
function goto2presenter()
{
    window.location.href="#PresenterPage?"+sSpeaker2;
}