(function() {
	var app = angular.module('picBoardCtrls', ['httpServices', 'ui.router'])
				.controller('PicBoardCtrl', ['$scope', 'HttpQueriesSvc', '$stateParams', '$timeout',
												function($scope, httpQueries, $stateParams, $timeout) {
					
					var COURTESY_DELAY = 1000;
					var MAX_TIME = 3000;
					$scope.picsList = [];
					$scope.loading = true;

					var tags = $stateParams.tags;
					tags = tags.split(',');
					httpQueries.flickrData(tags);
					$scope.validResult = true;

					$scope.$on('newPics', function(event, pics) {
						$scope.picsList = pics;
						$timeout(displayResult, COURTESY_DELAY);
				    });
				    $timeout(displayResult, MAX_TIME);

					function displayResult() {
						$scope.$apply(function() {
							$scope.loading = false;
							if ($scope.picsList.length === 0) $scope.validResult = false;
							$scope.picsList = _.map($scope.picsList, function(pic) {
								if (typeof pic.tags === 'string') pic.tags = pic.tags.split(' ');
								pic.score = Math.floor(Math.random() * 6);
								return pic;
							});
						});
					}
				}]);
})();