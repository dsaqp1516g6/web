
$(document).ready(function() {

	$('#login').submit(function(e) {
		var userData = new FormData($(this));
		$.ajax({
			url: 'http://eetacdsa2c.upc.es:8085/secretsites/login',
			type: 'POST',
			crossDomain : true,
			data: userData,
			cache: false,
			contentType: false
		})
		.done(function (data) {
			console.log(data);
		})
		.fail(function (jqXHR, textStatus) {
			alert("KO");
			console.log(textStatus);
		});
	});
	
	$('#register').submit(function(e) {
		var userData = new FormData($(this));
		alert(userData);
	});
});