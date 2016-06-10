var app = angular.module("secretSites", []);

app.controller("SearchCtrl", function($scope, $http){

	$scope.items = [];
	var markers = [];

	$scope.goInterest = function(id){
		console.log(id);
		location.href = "InterestPoint.html?id=" + id;
	}

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