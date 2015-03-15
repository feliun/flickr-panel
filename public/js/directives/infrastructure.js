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
							this.currentTag = "";
							this.addTag = function() {
								this.tagList.push(this.currentTag);
								this.currentTag = "";
							}
						},
						controllerAs: "criteriaCtrl"
					}
				});
})();