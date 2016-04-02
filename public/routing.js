	var mainApp = angular.module('mainApp', ['ngRoute']);
	mainApp.config(['$routeProvider',
	  function($routeProvider) {
		$routeProvider.
			when('/', {
			templateUrl: 'HTML/home.html'
		}).
		  when('/home', {
			templateUrl: 'HTML/home.html'
		}).
		  when('/phones', {
			templateUrl: 'HTML/phone.html',
			controller : 'phoneCtrl'
		  }).
		  when('/phones/:phId', {
			templateUrl: 'HTML/phone-specs.html',
			controller : 'phoneDetailCtrl'
			}).
		  when('/cart', {
			templateUrl: 'HTML/cart.html',
			controller : 'phoneCtrl'
		  }).
          when('/confirm', {
              templateUrl: 'HTML/confirm.html',
              controller : 'mainCtrl'
          }).
		  otherwise({
			redirectTo: 'HTML/home.html'
		  });
	}]);
	mainApp.controller('mainCtrl', ["$scope", function($scope){
        $scope.cart=[];
        $scope.$on('addPhones', function(event, obj){
			$scope.phoneArray = obj.phoneArray;
            /*$scope.phoneArray.qty=1;*/
            $scope.$broadcast("addCart",{"phoneArray": obj.phoneArray});
		});

        $scope.addToCart=function(){
            if($scope.cart.length >=1) {
                for (var i = 0; i < $scope.cart.length; i++) {
                    if ($scope.cart[i].phone == $scope.phoneArray.phone) {
                        $scope.cart[i].qty = ($scope.cart[i].qty)+1;
                    }else{
                        $scope.cart.push($scope.phoneArray);
                    }
                    break;
                }
            }else {
                $scope.cart.push($scope.phoneArray);
            }
        };
        $scope.removeItem = function(index) {
            $scope.cart.splice(index, 1);
        };
        $scope.subTotal = function() {
            var subTotal = 0;
            angular.forEach($scope.cart, function(c) {
                subTotal += c.qty * c.price;
            });

            return subTotal;
        };
        $scope.confirm=function(){
            $scope.cart = [];
        }
	}]);
	mainApp.controller('phoneCtrl', ["$scope", "$http", function($scope, $http){
		$http.get('https://api.mongolab.com/api/1/databases/gadgets/collections/phone_preview?apiKey=myAPIKey', { params: {apiKey: "cd4welMGu-pPRQYrf4d2bcmcYnkRVC9g"} })
		.success(function(response) {
				$scope.phones = response;
		});

		$scope.addToPrice=function(x){
            this.x.qty=1;
			$scope.$emit("addPhones", {"phoneArray":this.x});
		}
      /*  $scope.orderProp= $scope.orderProp.sort;*/
	}]);

	mainApp.controller('phoneDetailCtrl', function($scope, $http, $routeParams) {
		$http.get('Phones/'+ $routeParams.phId +'.json')
		.success(function(response) {$scope.phone = response;
		});
	});

	mainApp.controller('cartCtrl', function($scope){
        $scope.$on("addCart", function(event,obj){
            $scope.cartItems=obj.phoneArray;
        });

        /*$scope.qty=1;
        $scope.cost= $scope.price * $scope.qty;
        $scope.subTotal = $scope.price;
        $scope.tax = ($scope.subTotal * 8.6)/100;
        $scope.total = $scope.subTotal + $scope.tax;*/
    });

