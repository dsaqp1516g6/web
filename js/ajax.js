


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