(function() {
	var app = angular.module('filterCtrls', ['httpServices'])
				.controller('FilterCtrl', ['HttpQueriesSvc', '$scope', '$state', function(httpQueries, $scope, $state) {
					$scope.tags = [];

					$scope.queryPics = function() {
						var tags = _.pluck($scope.tags, 'text');
						tags = tags.join(',');
						$state.go("result", { tags: tags });
						$scope.tags = [];
					};

				}]);
})();
