
var map;
var urlMaps = "http://localhost:8080/secretsites/apimaps/";
var urlPoints = "http://localhost:8080/secretsites/interestpoints";
var app = angular.module("secretSites", []);

app.controller("SearchCtrl", function($scope, $http){

	$scope.items = [];
	var markers = [];
	
	$scope.searchPoint = function() {		
		$http({
		  method: 'GET',
		  url: urlPoints
		}).success(function (data) {
			$scope.items = data.interestPoints;
			markers = [];
			for(var i = 0; i < $scope.items.length; i++) {
				var marker = new google.maps.Marker({
					position: new google.maps.LatLng(data.interestPoints[i].latitude, data.interestPoints[i].longitude),
					url: '#' + $scope.items[i].id,
					map: map,
					animation: google.maps.Animation.DROP,
					title: $scope.items[i].name
				});					
				markers.push(marker);
			}
			for(var i = 0; i < markers.length; i++) {
				markers[i].addListener('mouseover', function() {
					$('#toScroll').animate({
						scrollTop : $(this.url).position().top - 100
					}, 800);
					$(this.url).css("background-color", "#f1f1f1");
				});
				markers[i].addListener('mouseout', function() {
					$(this.url).css("background-color", "#ffffff");
				});
			}
		}).error(function (error) {
				alert(JSON.stringify(error));
		});
	};
	
	$scope.mouseOver = function(index) {	
		markers[index].setAnimation(google.maps.Animation.BOUNCE);
		$(markers[index].url).css("background-color", "#f1f1f1");
	};
	
	$scope.mouseLeave = function(index) {		
		markers[index].setAnimation(null);
		$(markers[index].url).css("background-color", "#ffffff");
	};
	
});
  
$(document).ready(function() {

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