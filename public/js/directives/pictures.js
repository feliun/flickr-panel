(function() {
	var app = angular.module('picturesDirectives', ['picturesCtrls'])
				.directive('picturesInfo', function() {
					return {
						restrict: 'E',
						templateUrl: "../partials/pictures-info.html",
						controller: 'PicturesCtrl'
					};
				});
})();