//Contains directives for sorrounding components such as navigation, header, footer...
(function() {
	var app = angular.module('infrastructure', [])
				.directive('navigationBar', function() {
					return {
						restrict: 'E',
						templateUrl: "../partials/navigation-bar.html",
						controller: function() {
							this.status = { test: 'foo' };
						},
						controllerAs: "navCtrl"
					};
				})
				.directive('criteriaSelector', function() {
					return {
						restrict: 'E',
						templateUrl: "../partials/criteria-selector.html",
						controller: function() {
							this.tagList = [];
							this.addTag = function(tag) {
								this.tagList.push(tag);
							}
						},
						controllerAs: "criteriaCtrl"
					}
				});
})();