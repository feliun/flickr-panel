(function() {
	var app = angular.module('picBoardCtrls', ['httpServices', 'ui.router'])
				.controller('PicBoardCtrl', ['$scope', 'HttpQueriesSvc', '$stateParams', '$timeout',
												function($scope, httpQueries, $stateParams, $timeout) {
					
					var COURTESY_DELAY = 1000;
					var MAX_TIME = 10000;
					$scope.picsList = [];
					$scope.loading = true;
					$scope.validResult = true;

					var tags = $stateParams.tags;
					tags = tags.split(',');
					httpQueries.flickrData(tags)
						.success(function(data, status, headers, config) {
							$timeout(function() {
								displayResult(data.items);
							}, COURTESY_DELAY);
						})
						.error(function(data, status, headers, config) {
							console.log('error: ', status);
							displayResult([]);
						});

					function displayResult(pics) {
						$scope.picsList = pics;
						$scope.loading = false;
						if ($scope.picsList.length === 0) $scope.validResult = false;
						$scope.picsList = _.map($scope.picsList, function(pic) {
							if (typeof pic.tags === 'string') pic.tags = pic.tags.split(' ');
							pic.score = Math.floor(Math.random() * 6);
							return pic;
						});
					}
				}]);
})();