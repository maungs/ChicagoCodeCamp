function onPresenterPage(e){
    
    app.showLoading();
    var scroller = e.view.scroller;
    scroller.reset();
    HideSocial();
    var URL = window.location.toString();
    var queryList = URL.split("?");       
    var PresenterId = queryList[1];
    var PresentersList = storage["PresentersList"];
    jPresenters = jQuery.parseJSON(PresentersList);
    
    if(jPresenters!= null || jPresenters.length>0)
    {
        GetLocalPresenter(PresenterId);
        LoadPresenter(PresenterId);
    }
    else
    {
        LoadPresenter(PresenterId);
    }
}
function HideSocial(){
    document.getElementById('displayTwitter').style.display = "none";
    document.getElementById('displayWebsite').style.display = "none";
    document.getElementById('pBio').innerHTML = "";
    document.getElementById('pNameB').innerHTML="";
}
function GetLocalPresenter(PresenterId){
    var i =0;
    for(i = 0; i<jPresenters.length; i++){
        if(jPresenters[i].Id ==PresenterId)
        {
            FillOutPresenter(jPresenters[i]);
            LoadPresenter(PresenterId);
            break;
        }
    }
}

function LoadPresenter(Id){
    xmlhttp.open("GET","http://www.chicagocodecamp.com/api/Presenter/" + Id,true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = PresenterLoaded;
}
function PresenterLoaded( result){
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
        var jPresenter = jQuery.parseJSON(xmlhttp.responseText);
        FillOutPresenter(jPresenter);
    }
    app.hideLoading();
}
function FillOutPresenter(Presenter)
{
    document.getElementById('pNameB').innerHTML = Presenter.FirstName + '<br/>' + Presenter.LastName;
    if(Presenter.hasOwnProperty("AvatarURL"))
    {
        if(Presenter.AvatarURL)
        {
            document.getElementById('pProfileImg').style.backgroundImage="url('"+Presenter.AvatarURL+"')";
        }
    }
    if(Presenter.hasOwnProperty("Twitter"))
    {
        if(Presenter.Twitter)
        {
            document.getElementById('pTwitter').innerHTML = Presenter.Twitter;
            document.getElementById('displayTwitter').style.display = "block";
        }
    }
    if(Presenter.hasOwnProperty("Website"))
    {
        if(Presenter.Website)
        {
            document.getElementById('pWebsite').innerHTML = Presenter.Website;
            document.getElementById('displayWebsite').style.display = "block";
        }
    }
    if(Presenter.hasOwnProperty("Biography"))
    {
        if(Presenter.Biography)
        {
            document.getElementById('pBio').innerHTML = Presenter.Biography;
        }
    }
    //document.getElementById('pContentB').innerHTML = '';
}