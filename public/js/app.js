(function() {
	var app = angular.module('flickrApp', [ 'ui.router',
											'httpServices',
											'navigationCtrls', 'filterCtrls', 'picBoardCtrls',
											'navigationDirectives', 'filterDirectives', 'picturesDirectives' ])
				.controller('MainCtrl', function() {
					
				})
				.config(function($stateProvider, $urlRouterProvider) {
					$urlRouterProvider.otherwise("/");
					$stateProvider
						.state('filter', {
							url: "/",
							views: {
				                "mainView": {
				                    templateUrl: "../html/filter-selector.html",
				                    controller: "FilterCtrl"
				                }
				            }
						})
						.state('result', {
							url: "/result",
							views: {
				                "mainView": {
				                    templateUrl: "../html/pictures-board.html",
				                    controller: "PicBoardCtrl"
				                }
				            }
						});
				});

})();