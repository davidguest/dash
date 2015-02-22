//document.addEventListener("deviceready", wakeUp, false);

var url="http://www.sussex.ac.uk/its/dashboard/cachedversion";
var mainContent = "";

function get(postfields, cback) {
    var xhr = new XMLHttpRequest;
    xhr.onload = function() {
        cback(xhr.responseText);
    }
    xhr.open('GET', url, true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=utf-8");
    xhr.send(postfields);
}

function getData() {

    $("#refresh").addClass("fa-spin");
    var postfields = "";
    get( postfields, prepData);

}

function prepData(json) {

    var basicData = JSON.parse(json);
    var timeStamp = basicData.timestamp;
    var network = basicData.network;
    
    mainContent = "<h2>Networks</h2>";
    mainContent += "<p><span>"+network.auth+"</span><br /><span><b>Logins</b></span></p>";
    mainContent += "<p><span>"+network.quarantine+"</span><br /><span><b>Quarantined</b></span></p>";
    mainContent += "<p><span>"+network.failed+"</span><br /><span><b>Failed authentication</b></span></p>";
    
    $("#refresh").removeClass("fa-spin");
    updateMain();
    
}

function updateMain() {

    $("#main").html(mainContent);

}

function init() {
    
    mainContent = "<p>Ready...fetching data...</p>";
    updateMain();
    getData();

}

$(document).ready( function() {
    
    init();
    $("#refresh").on('click', getData);

});