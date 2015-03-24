(function() {
	var app = angular.module('picBoardCtrls', ['httpServices'])
				.controller('PicBoardCtrl', ['$scope', 'HttpQueriesSvc', function($scope, httpQueries) {

					$scope.picsList = httpQueries.getPics();
					
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