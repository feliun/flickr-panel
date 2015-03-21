(function() {
	var app = angular.module('navigationDirectives', ['navigationCtrls'])
				.directive('navigationBar', function() {
					return {
						restrict: 'E',
						templateUrl: "../../html/navigation-bar.html",
						controller: 'NavigationCtrl',
					};
				});

})();