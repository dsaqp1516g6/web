
var map;
var urlMaps = "http://localhost:8080/secretsites/apimaps/";
var urlPoints = "http://localhost:8080/secretsites/interestpoints";
var baseUrl = "http://localhost:8080/secretsites";


  function isLoged(){
  var a = false;
  		if(obtenerCookie("token") != undefined ){
  		if(obtenerCookie("token") != ""){
  			console.log("ola");
  			$("#nologed").hide();
  			$("#loged").show();
  			a = true;
  			}
  		}
  		if(a){
  			$.ajax({
        				type: 'GET',
        				url: baseUrl  + "/users/" + obtenerCookie("id")
        			}).done(function(data) {
        				console.log(data);
        				$("#loged").html("<li class=\"dropdown\"><div style='float:left'>" + data.fullname + "</div> <a style='float:right; padding:0; margin-left: 10px;' id='logout'>Logout</<a></li>");
        			}).fail(function(error){
        				alert(JSON.stringify(error));
        			});
  		}else{
  		$("#nologed").show();
          			$("#loged").hide();
  		}
  	}
$(document).ready(function() {
	isLoged();

	$('#loged').on('click', '#logout', function() {
    	console.log("pepe");
    	crearCookie("token", "");
    	isLoged();
    });
	$("#showArrow").hide();
	var myLatlng = new google.maps.LatLng(41.3871734, 2.0850284);
	var myOptions = {
		zoom: 8,
		center: myLatlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map($("#map-canvas").get(0), myOptions);
	
	//getAllPoints();
	getMyLocation();
	

	$("#hideArrow").click(function() {
		$("#left").toggle(100);
		$("#map-canvas").css("width", "99%");
		google.maps.event.trigger(map, "resize");
		$("#showArrow").show();
	});
	
	$("#showArrow").click(function() {
		$("#showArrow").hide();
		$("#left").toggle(100);
		$("#map-canvas").css("width", "66%");
		google.maps.event.trigger(map, "resize");
	});
	
	/*
	$("#inputSearch").keydown(function(e) {
		if(e.keyCode == 13) {
			$.ajax({
				type: 'GET',
				url: urlMaps + $("#inputSearch").val()
			}).done(function(data) { 
				loadCity(data);
			}).fail(function(error){
				alert(JSON.stringify(error));
			});
		}
	});*/
	
	$("#gpsBut").click(function() {
	});
	
	function loadCity(data) {
		data = JSON.parse(data);
		var myLatlng = new google.maps.LatLng(data.viewport.northeast.lat, data.viewport.northeast.lng);
		var myLatlng2 = new google.maps.LatLng(data.viewport.southwest.lat, data.viewport.southwest.lng);
		var myLatlng3 = new google.maps.LatLng(data.viewport.northeast.lat, data.viewport.southwest.lng);
		var myLatlng4 = new google.maps.LatLng(data.viewport.southwest.lat, data.viewport.northeast.lng);
		var myLatlngL = new google.maps.LatLng(data.location.lat, data.location.lng);
		var myOptions = {
		  zoom: 8,
		  center: myLatlng,
		  mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		map = new google.maps.Map($("#map-canvas").get(0), myOptions);
		var marker = new google.maps.Marker({
		  position: myLatlng,
		  map: map,
		  title:"Top Right"
		});
		var marker2 = new google.maps.Marker({
		  position: myLatlng2,
		  map: map,
		  title:"Down Left"
		});
		var marker3 = new google.maps.Marker({
		  position: myLatlng3,
		  map: map,
		  title:"Top Left"
		});
		var marker4 = new google.maps.Marker({
		  position: myLatlng4,
		  map: map,
		  title:"Down Right"
		});
		var markerL = new google.maps.Marker({
		  position: myLatlngL,
		  map: map,
		  title:"location"
		});
	}

	function getAllPoints() {
		$.ajax({
			type: 'GET',
			url: urlPoints
		}).done(function(data) {
			var i = 0;
			while(i < data.interestPoints.length) {
				var marker = new google.maps.Marker({
					position: new google.maps.LatLng(data.interestPoints[i].latitude, data.interestPoints[i].longitude),
					map: map,
					title: data.interestPoints[i].name
				});
				i++;
			}
		}).fail(function(error){
			//alert(JSON.stringify(error));
		});
	}

	function getMyLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				var pos = {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				};
				var marker = new google.maps.Marker({
					position: pos,
					map: map,
					title: "My Location"
				});
				map.setCenter(pos);
			});
		} else {
			alert("Geolocation is not supported by this browser")
		}
	}

       $( "#loginbtn" ).click(function(e) {
       e.preventDefault();
			login();
       });
        function login(){
        var url = "http://localhost:8080/secretsites/login";
        	$.ajax({
            		type: 'POST',
            		url: url,
            		contentType: 'application/x-www-form-urlencoded',
            		data:{
            			username: $("#usernameLog").val(),
            			password: $("#passwordLog").val()
            		}
            	}).done(function(data) {
            		console.log(data);
            		crearCookie("token", data.token, 12);
            		crearCookie("id", data.userid, 12);
            		isLoged();
            	}).fail(function(error){
            		alert(JSON.stringify(error));
            	});

         }
		  $( "#regbtn" ).click(function() {
			 register();
       });
           function register(){
                 var url = "http://localhost:8080/secretsites/users";
                 if($("#passwordReg").val() == $("#passwordRegR").val()){
                 	$.ajax({
                     		type: 'POST',
                     		url: url,
                     		contentType: 'application/x-www-form-urlencoded',
                     		data:{
                     			loginid: $("#usernameReg").val(),
                     			password: $("#passwordReg").val(),
                     			email: $("#email").val(),
								fullname: $("#fullname").val()
                     		}
                     	}).done(function(data) {
                     		console.log(data);
							crearCookie("token", data.token, 12);
							crearCookie("id", data.userid, 12);
							isLoged();
                     	}).fail(function(error){
                     		alert(JSON.stringify(error));
                     	});
                     	}
                     	else{
                     	alert("Los password deben ser iguales");
                     	}

                  }
                    function viewpoint(){
                          var url = "http://localhost:8080/secretsites/interestpoints/";
                          	$.ajax({
                              		type: 'POST',
                              		url: url,
                              		contentType: 'application/x-www-form-urlencoded',
                              		data:{
                              			username: $("#usernameLog").val(),
                              			password: $("#passwordLog").val()
                              		}
                              	}).done(function(data) {
                              		console.log(data);
                              		crearCookie("token", data.token, 12);
                              		crearCookie("id", data.userid, 12);
                              	}).fail(function(error){
                              		alert(JSON.stringify(error));
                              	});

                           }
	/*
	
		var clickEvent = google.maps.event.addListener(map, 'click', function(e) {
		var marker = new google.maps.Marker({
          position: e.latLng,
          map: map
        });
	});
	google.maps.event.removeListener(clickEvent);
	
	
	*/
	
	
});