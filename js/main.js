
var map;
var urlMaps = "http://eetacdsa2c.upc.es:8085/secretsites/apimaps/";
var urlPoints = "http://eetacdsa2c.upc.es:8085/secretsites/interestpoints";
var baseUrl = "http://eetacdsa2c.upc.es:8085/secretsites";
var longitude;
var latitude;


  function isLoged(){
  var a = false;
  		if(obtenerCookie("token") != "undefined" ) {
			if(obtenerCookie("token") != ""){
				console.log("ola");
				$("#nologed").hide();
				$("#loged").show();
				$("#punto").show();
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
							console.log("HOLA");
							alert(JSON.stringify(error));
						});
			} else{
			$("#nologed").show();
			$("#loged").hide();
			}
  	}

$(document).ready(function() {
/*google.maps.event.addListener(map, "click", function (e) {

    //lat and lng is available in e object
    var latLng = e.latLng;
console.log(e);
});*/
$("#marcador").hide();
$("#puntos").hide();

	isLoged();

	$('#loged').on('click', '#logout', function() {
    	console.log("pepe");
    	crearCookie("token", "");
    	isLoged();
    	location.reload();
    });
	$("#showArrow").hide();
	var myLatlng = new google.maps.LatLng(41.3871734, 2.0850284);
	var myOptions = {
		zoom: 8,
		center: myLatlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map($("#map-canvas").get(0), myOptions);

	google.maps.event.addListener(map, "click", function (e) {

        //lat and lng is available in e object
        var latLng = e.latLng;		
		console.log(e.latLng.lat());
		console.log(e.latLng.lng());
    longitude=e.latLng.lng();
    latitude=e.latLng.lat();
    $("#vlatitude").text(""+latitude+"");
    $("#vlongitude").text(""+longitude+"");

    });

	//getAllPoints();
	getMyLocation();

	$("#punto").click(function() {
	$("#puntos").show();

        	});

	$("#anadirpunto").click(function() {
    	ponerpunto();
        	});

	function ponerpunto(){
            var url = "http://eetacdsa2c.upc.es:8085/secretsites/interestpoints";
            	$.ajax({
                		type: 'POST',
                		url: url,
                		contentType: 'application/x-www-form-urlencoded',
                		headers:{"X-Auth-Token":obtenerCookie("token")},
                		data:{
                			name: $("#namepoint").val(),
                			longitude: longitude,
                			latitude: latitude
                		}
                	}).done(function(data) {
                		console.log(data);
                		location.reload();
                	}).fail(function(error){
                		alert(JSON.stringify(error));
                	});}

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

	$("#localizar").click(function() {
	getMyLocation();
    	});

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
        var url = "http://eetacdsa2c.upc.es:8085/secretsites/login";
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
            		location.reload();
            	}).fail(function(error){
            		alert(JSON.stringify(error));
            	});


         }
         $( "#homepage" ).click(function() {
         			 console.log("ola");
                });

		  $( "#regbtn" ).click(function() {
			 register();
       });
           function register(){
                 var url = "http://eetacdsa2c.upc.es:8085/secretsites/users";
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
							location.reload();
                     	}).fail(function(error){
                     		alert(JSON.stringify(error));
                     	});
                     	}
                     	else{
                     	alert("Los password deben ser iguales");
                     	}

                  }
                    function viewpoint(){
                          var url = "http://eetacdsa2c.upc.es:8085/secretsites/interestpoints/";
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



                                   /*$("#flag").click(function() {
                                    $("#flag").css("color","#40FF00");

                                   }


                                   $("#corazon").click(function() {
                                   console.log("ola");
                                    $("#corazon").css("color","#40FF00");
                                            }*/



                           }

                            $( "#punto" ).click(function() {
                            $("#marcador").show();
                           			 //ponerpunto();
                                  });

                                  $("#searchBut").click(function() {
                                  $("#puntos").hide();
                                  });


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