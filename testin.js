
	app= angular.module("testApp", []);

	app.controller("myCtrl1", function($scope, $http, $rootScope){
		$http.get('testin.json')
		.success(function(response) {$scope.std = response;
		});
					
		$scope.addToCart = function(x) {
			$rootScope.$broadcast("addProduct", x);
		}
	});

	app.controller("myCtrl2", function($scope){
		$scope.pn=[{city:"Hyderabad"},{city:"Chennai"},{city:"Bengaluru"},];
		$scope.cart = [];
						
		$scope.$on("addProduct", add);
						
		function add(evt, x) {
			$scope.cart.push(x);
		}
	});
