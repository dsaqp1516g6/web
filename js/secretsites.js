
$(document).ready(function() {
	
	var ssPoints = [];
	
	$.get("http://eetacdsa2c.upc.es:8085/secretsites/interestpoints").done(function(points) {
		ssPoints = points.interestPoints;
		var i = 0;
		var html = "";
		while(i < ssPoints.length) {
			html = html + "<tr class='data" + i + "'>" +
			"<td id='tdnam" + i + "'>" + ssPoints[i].name + "</td>" +
			"<td id='tdlon" + i + "'>" + ssPoints[i].longitude + "</td>" +
			"<td id='tdlat" + i + "'>" + ssPoints[i].latitude + "</td>" +
			"<td>" + ssPoints[i].rating + "</td>" +
			"<td>" + ssPoints[i].creationTimestamp + "</td>" +
			"<td><button value='" + i + "' type='button' class='btn btn-info'>Edit</button></td>" +
			"<td><button value='" + i + "' type='button' class='btn btn-danger'>Delete</button></td>" +
			"</tr>" + "<tr style='display: none;' class='edit" + i + "'>" +
			"<td><input id='innam" + i + "' type='text' class='form-control textbox' placeholder='" + ssPoints[i].name + "'></input></td>" +
			"<td><input id='inlon" + i + "' type='text' class='form-control textbox' placeholder='" + ssPoints[i].longitude + "'></input></td>" +
			"<td><input id='inlat" + i + "' type='text' class='form-control textbox' placeholder='" + ssPoints[i].latitude + "'></input></td>" +
			"<td>" + ssPoints[i].rating + "</td>" +
			"<td>" + ssPoints[i].creationTimestamp + "</td>" +
			"<td><button value='" + i + "' type='button' class='btn btn-succes'>Accept</button></td>" +
			"<td><button value='" + i + "' type='button' class='btn btn-warning'>Cancel</button></td>" +
			"</tr>";
			i++;
		}
		$("#tableData").html(html);
		
		$(".btn-info").click(function() {	
			$(".data" + $(this).val()).hide();
			$(".edit" + $(this).val()).show();
		});
		
		$(".btn-danger").click(function() {
			var id =  $(this).val();
			var url = "http://eetacdsa2c.upc.es:8085/secretsites/interestpoints/" + ssPoints[$(this).val()].id;
			$.ajax({
				type: 'DELETE',
				url: url
			}).done(function(data) { 
				$("tr").remove(".data" + id + ", .edit" + id);
			}).fail(function(error){
				alert(JSON.stringify(error));
			});
		});
		
		$(".btn-succes").click(function() {
			var id = $(this).val();
			var url = "http://eetacdsa2c.upc.es:8085/secretsites/interestpoints/" + ssPoints[id].id;
			var pointsData = '{' + 
				'"links": null,' +
				'"id":"' + ssPoints[id].id + '",' +
				'"name":"' + $("#innam" + id).val() + '",' +
				'"longitude":"' + $("#inlon" + id).val() + '",' +
				'"latitude":"' + $("#inlat" + id).val() +
				'"}';
			$.ajax({
				type: 'PUT',
				url: url,
				data: pointsData,
				headers: {
					"Content-Type": "application/vnd.dsa.secretsites.point+json",
					"X-Auth-Token": "0DAAB027F4D911E5B12940167E1246AC"
				}	
			}).done(function(data) { 
				$("#tdname" + id).text(data.name);
				$("#tdlon" + id).text(data.longitude);
				$("#tdlat" + id).text(data.latitude);
				backToData(id);
			}).fail(function(error){
				alert(JSON.stringify(error));
			});
		});
	
		$(".btn-warning").click(function() {
			backToData($(this).val());
		});
	
		function backToData(id) {
			$(".data" + id).show();
			$(".edit" + id).hide();
			$("#inlog" + id).val("");
			$("#inlon" + id).val("");
			$("#inpas" + id).val("");
		}
	
	})
	.fail(function(error){
		alert(JSON.stringify(error));
	});
	
});