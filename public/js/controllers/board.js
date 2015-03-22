(function() {
	var app = angular.module('picBoardCtrls', ['httpServices'])
				.controller('PicBoardCtrl', ['$scope', 'HttpQueriesSvc', function($scope, httpQueries) {
					$scope.picsList = [];

					$scope.$on('newPics', function(event, pics) {
						$scope.$apply(function() {
							$scope.picsList = pics;
						});
				    });

				    $scope.getRandomNumber = function(num) {
				    	var randomStarNumber = Math.floor(Math.random() * 6);
					    return new Array(randomStarNumber);
					}
				}]);
})();