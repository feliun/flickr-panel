(function() {
	var app = angular.module('loadingDirectives', [])
				.directive('loadingScreen', function() {
					return {
						restrict: 'E',
						templateUrl: "../../html/loading-screen.html"
					};
				});

})();