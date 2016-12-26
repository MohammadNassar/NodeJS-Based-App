
var app = angular.module('usersInfo', []);

app.controller('mainCtrl', ['$scope', '$http', function($scope, $http) {
	
	$http({
		method : 'GET',
		url : '/allusers'
	})
	.then(function(response) {
		$scope.all_data = response.data;
	});
	
}]);
