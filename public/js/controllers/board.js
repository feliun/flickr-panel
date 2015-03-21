(function() {
	var app = angular.module('picBoardCtrls', ['httpServices'])
				.controller('PicBoardCtrl', ['$scope', 'HttpQueriesSvc', function($scope, httpQueries) {
					$scope.picsList = [];

					$scope.$on('newPics', function(event, pics) {
				        $scope.picsList = pics;
				        console.log($scope.picsList);
				        $scope.$digest();
				    });   
				}]);
})();