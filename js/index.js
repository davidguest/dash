

var url="http://www.sussex.ac.uk/its/dashboard/current";
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
    
    mainContent = $("#networks").html();
    mainContent = splice(mainContent, "{{netgraph}}", network.graph);
    mainContent = splice(mainContent, "{{netauth}}", network.auth);
    mainContent = splice(mainContent, "{{netfailed}}", network.failed);
    mainContent = splice(mainContent, "{{netquarantine}}", network.quarantine);
    
    $("#refresh").removeClass("fa-spin");
    updateMain();
    
}

function splice(host, element, injection) {
	
	var elements = host.split(element);
	return elements.join(injection);
	
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