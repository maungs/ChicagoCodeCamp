function onPresenterPage(){
    
    app.showLoading();
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
        alert('xhr complete');
        var jPresenter = jQuery.parseJSON(xmlhttp.responseText);
        alert(jPresenter[0].FirstName);
        FillOutPresenter(jPresenter[0]);
    }
    app.hideLoading();
}
function FillOutPresenter(Presenter)
{
    document.getElementById('PresenterName').innerHTML = Presenter.FirstName + ' ' + Presenter.LastName;
    if(Presenter.Twitter !=null && Presenter.Twitter.toString().length>0){
        document.getElementById('pTwitter').innerHTML = Presenter.Twitter;
        //document.getElementById('displayTwitter').style.display = "block";
    }
    if(Presenter.Website !=null && Presenter.Website.toString().length>0){
        document.getElementById('pWebsiteB').innerHTML = Presenter.Website;
        //document.getElementById('pWebsiteB').style.display = "block";
    }
    //document.getElementById('pContentB').innerHTML = '';
}