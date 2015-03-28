(function() {
	var app = angular.module('loadingCtrls', ['ui.router', 'httpServices'])
				.controller('LoadingCtrl', ['$scope', '$rootScope', '$state', '$interval', '$timeout', 'HttpQueriesSvc', 
											function($scope, $rootScope, $state, $interval, $timeout, httpQueries) {

					var COURTESY_DELAY = 1000;
					var MAX_TIME = 3000;

					$scope.$on('newPics', function(event, pics) {
						$timeout(function() {
							$state.go("result");
						}, COURTESY_DELAY);
				    });

				    $timeout(function() {
							$state.go("result");
					}, MAX_TIME);
				}]);
})();