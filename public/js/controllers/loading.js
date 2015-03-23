(function() {
	var app = angular.module('loadingCtrls', ['ui.router', 'httpServices'])
				.controller('LoadingCtrl', ['$scope', '$rootScope', '$state', '$interval', '$timeout', 'HttpQueriesSvc', 
											function($scope, $rootScope, $state, $interval, $timeout, httpQueries) {
					var MAX_VALUE = 100;
					var UPDATE_FREQ = 200;
					var COURTESY_DELAY = 1000;

					$scope.loaded = 0;

					var progress = $interval(function() {
						if ($scope.loaded >= MAX_VALUE) {
							$interval.cancel(progress);
						}
							
						if (MAX_VALUE - $scope.loaded <= 10) return $scope.loaded = MAX_VALUE;
						var random = Math.floor(Math.random() * 10);
						$scope.loaded += random;
					}, UPDATE_FREQ);

					$scope.$on('newPics', function(event, pics) {
						$scope.loaded = MAX_VALUE;
						$timeout(function() {
							$state.go("result");
						}, COURTESY_DELAY);
				    });
				}]);
})();