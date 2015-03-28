(function() {
	var app = angular.module('filterCtrls', ['httpServices'])
				.controller('FilterCtrl', ['HttpQueriesSvc', '$scope', '$state', function(httpQueries, $scope, $state) {
					$scope.tags = [];

					$scope.queryPics = function() {
						var tags = [];
						angular.forEach($scope.tags, function(value, index) {
							this.push(value.text);
						}, tags);
						httpQueries.flickrData(tags);
						$state.go("loading", { tags: tags });
						$scope.tags = [];
					};

				}]);
})();
