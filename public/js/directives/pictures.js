(function() {
	var app = angular.module('picturesDirectives', [])
				.directive('picturesInfo', function() {
					return {
						restrict: 'E',
						templateUrl: "../partials/pictures-info.html",
						controller: function() {
							this.pics = [];
						},
						controllerAs: "picsCtrl"
					};
				});
})();