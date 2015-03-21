(function() {
	var app = angular.module('filterDirectives', ['filterCtrls'])
				.directive('filterSelector', function() {
					return {
						restrict: 'E',
						templateUrl: "../../html/filter-selector.html",
						controller: 'FilterCtrl'
					}
				});

})();