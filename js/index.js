//document.addEventListener("deviceready", wakeUp, false);

var url="http://www.davidguest.me.uk/hello/data";
var mainContent = "";

function get(postfields, cback) {
    var xhr = new XMLHttpRequest;
    xhr.onload = function() {
        cback(xhr.responseText);
    }
    xhr.open('POST', url, true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=utf-8");
    xhr.send(postfields);
}

function getData() {

    var postfields = "";
    get( postfields, prepData);

}

function prepData(json) {

    var basicData = JSON.parse(json);
    var trafficLights = basicData.trafficLights;
    mainContent = "<p>Email status is "+trafficLights.email + "<br />Printing status is "+trafficLights.printing+"</p>";
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

});