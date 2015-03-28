(function() {
	var app = angular.module('loadingCtrls', ['ui.router'])
				.controller('LoadingCtrl', ['$scope', '$state', '$timeout', '$stateParams',
											function($scope, $state, $timeout, $stateParams) {

					var COURTESY_DELAY = 1000;
					var MAX_TIME = 3000;

					$scope.$on('newPics', function(event, pics) {
						$timeout(function() {
							$state.go("result", { tags: $stateParams.tags });
						}, COURTESY_DELAY);
				    });

				    $timeout(function() {
							$state.go("result");
					}, MAX_TIME);
				}]);
})();