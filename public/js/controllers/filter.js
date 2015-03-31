(function() {
	var app = angular.module('filterCtrls', ['httpServices'])
				.controller('FilterCtrl', ['HttpQueriesSvc', '$scope', '$state', function(httpQueries, $scope, $state) {
					$scope.tags = [];

					$scope.tagsFormatted = function() {
						return _.pluck($scope.tags, 'text').join(',');
					};

				}]);
})();
