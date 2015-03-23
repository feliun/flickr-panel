(function() {
	var app = angular.module('flickrApp', [ 'ui.router', 'ngTagsInput',
											'httpServices',
											'navigationCtrls', 'filterCtrls', 'picBoardCtrls', 'loadingCtrls',
											'navigationDirectives' ])
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
						.state('loading', {
							url: "/result",
							views: {
				                "mainView": {
				                    templateUrl: "../html/loading.html",
				                    controller: 'LoadingCtrl'
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
						})
						.state('about', {
							url: "/about",
							views: {
				                "mainView": {
				                    templateUrl: "../html/about.html"
				                }
				            }
						});
				});

})();
