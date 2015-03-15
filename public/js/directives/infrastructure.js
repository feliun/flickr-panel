//Contains directives for sorrounding components such as navigation, header, footer...
(function() {
	var app = angular.module('infrastructureDirectives', ['infrastructureCtrls'])
				.directive('navigationBar', function() {
					return {
						restrict: 'E',
						templateUrl: "../partials/navigation-bar.html",
						controller: function() {
							
						},
						controllerAs: "navCtrl"
					};
				})
				.directive('criteriaSelector', function() {
					return {
						restrict: 'E',
						templateUrl: "../partials/criteria-selector.html",
						controller: 'CriteriaSelectorCtrl',
						controllerAs: "criteriaCtrl"
					}
				});

})();