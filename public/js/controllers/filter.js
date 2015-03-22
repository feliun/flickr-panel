(function() {
	var app = angular.module('filterCtrls', ['httpServices'])
				.controller('FilterCtrl', ['HttpQueriesSvc', '$scope', function(httpQueries, $scope) {
					$scope.tags = [];
					$scope.tagsToAdd = [];

					$scope.addTags = function() {
						$scope.tags = $scope.tags.concat($scope.tagsToAdd);
						$scope.tagsToAdd = [];
					};

					$scope.addRandomTag = function() {
						httpQueries.randomWord()
							.success(function(data) {
					    		$scope.tags.push({text: data[0].word.toLowerCase()});
					    	})
					    	.error(function(err) {
					    		var randomNumber = Math.floor(Math.random(0, 10) * 100);
					    		$scope.tags.push({text: randomNumber});
					    	});
					};

					$scope.queryPics = function() {
						var tags = [];
						angular.forEach($scope.tags, function(value, index) {
							this.push(value.text);
						}, tags);
						httpQueries.flickrData(tags);
						$scope.tags = [];
					};

				}]);
})();
