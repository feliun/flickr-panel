(function() {
	var app = angular.module('filterCtrls', ['httpServices'])
				.controller('FilterCtrl', ['HttpQueriesSvc', '$scope', '$state', function(httpQueries, $scope, $state) {
					$scope.tags = [];

					$scope.queryPics = function() {
						var tags = _.pluck($scope.tags, 'text');
						httpQueries.flickrData(tags);
						$state.go("loading", { tags: tags });
						$scope.tags = [];
					};

				}]);
})();
