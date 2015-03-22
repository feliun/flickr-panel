(function() {
	var app = angular.module('filterCtrls', ['httpServices'])
				.controller('FilterCtrl', ['HttpQueriesSvc', '$scope', function(httpQueries, $scope) {
					$scope.tags = [];

					$scope.queryPics = function() {
						httpQueries.flickrData(_.pluck($scope.tags, 'text'));
						$scope.tags = [];
					};

				}]);
})();
