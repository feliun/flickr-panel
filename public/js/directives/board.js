(function() {
	var app = angular.module('picturesDirectives', ['picBoardCtrls'])
				.directive('picturesBoard', function() {
					return {
						restrict: 'E',
						templateUrl: "../../html/pictures-board.html",
						controller: 'PicBoardCtrl'
					};
				});
})();