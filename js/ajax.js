function ajaxGet(getUrl) {
	$.ajax({
		type: 'GET',
		url: getUrl
	}).done(function(data) { 
		return data;
	}).fail(function(error){
		alert(JSON.stringify(error));
	});
}

$(window).ready(function(){
$("#dos").hide();
	console.log(location.href.split('=')[1]);
	var url = "http://localhost:8080/secretsites/interestpoints/" + location.href.split('=')[1];
	$.ajax({
    		type: 'GET',
    		url: url
    	}).done(function(data) {
    		console.log(data);
    	}).fail(function(error){
    		location.href = "/";
    	});
})