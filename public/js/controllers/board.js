(function() {
	var app = angular.module('picBoardCtrls', ['httpServices'])
				.controller('PicBoardCtrl', ['$scope', 'HttpQueriesSvc', function($scope, httpQueries) {
					$scope.picsList = [];

					$scope.$on('newPics', function(event, pics) {
						$scope.$apply(function() {
							pics = _.map(pics, function(pic) {
								pic.tags = pic.tags.split(' ');
								return pic;
							});
							$scope.picsList = pics;
						});
				    });

				    $scope.getRandomNumber = function(num) {
				    	var randomStarNumber = Math.floor(Math.random() * 6);
					    return new Array(randomStarNumber);
					}
				}]);
})();