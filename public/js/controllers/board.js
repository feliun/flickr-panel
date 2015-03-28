(function() {
	var app = angular.module('picBoardCtrls', ['httpServices', 'ui.router'])
				.controller('PicBoardCtrl', ['$scope', 'HttpQueriesSvc', '$stateParams', function($scope, httpQueries, $stateParams) {

					$scope.validResult = true;
					$scope.picsList = httpQueries.getPics();
					if ($scope.picsList.length === 0) $scope.validResult = false;
					
					$scope.picsList = _.map($scope.picsList, function(pic) {
						pic.tags = pic.tags.split(' ');
						pic.score = Math.floor(Math.random() * 6);
						return pic;
					});

				    $scope.getArrayFromNumber = function(num) {
					    return new Array(num);
					}
				}]);
})();