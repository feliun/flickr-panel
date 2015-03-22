(function() {
	var app = angular.module('filterCtrls', ['httpServices'])
				.controller('FilterCtrl', ['HttpQueriesSvc', '$scope', function(httpQueries, $scope) {
					$scope.tags = [];

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
