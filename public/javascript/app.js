
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

app.controller('accessdb', function($scope, $http) {
	
	var refresh = function() {
		$http.get('/mongodblist')
		.then(function(response) {
			$scope.users = response.data;
			$scope.user = null;
		});
	}
	
	refresh();
	
	$scope.addUser = function() {console.log($scope.user);
		$http.post('/mongodblist', $scope.user).then(function(response) {
			console.log(response.data);
			refresh();
		});
	}
	
});