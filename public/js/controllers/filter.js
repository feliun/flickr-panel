(function() {
	var app = angular.module('filterCtrls', ['httpServices'])
				.controller('FilterCtrl', ['HttpQueriesSvc', '$scope', function(httpQueries, $scope) {
					$scope.tagList = [];
					$scope.currentTag = "";

					$scope.addTag = function() {
						$scope.tagList.push($scope.currentTag);
						$scope.currentTag = "";
					};

					$scope.addRandomTag = function() {
						httpQueries.randomWord()
							.success(function(data) {
					    		$scope.tagList.push(data[0].word.toLowerCase());
					    	})
					    	.error(function(err) {
					    		var randomNumber = Math.floor(Math.random(0, 10) * 100);
					    		$scope.tagList.push(randomNumber);	
					    	});
					};

					$scope.queryPics = function() {
						httpQueries.flickrData($scope.tagList);
						$scope.tagList = [];
					};

				}]);
})();