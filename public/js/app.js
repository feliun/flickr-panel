(function() {
	var app = angular.module('flickrApp', [ 'ui.router', 'ngTagsInput',
											'httpServices',
											'navigationCtrls', 'filterCtrls', 'picBoardCtrls', 'loadingCtrls',
											'navigationDirectives' ])
				.controller('MainCtrl', function() {
					//listen state on change - modify class to collapse header
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
							url: "/loading?tags",
							views: {
				                "mainView": {
				                    templateUrl: "../html/loading.html",
				                    controller: 'LoadingCtrl',
				                    resolve:{
										tags: ['$stateParams', function($stateParams){
											return $stateParams.tags;
										}]
								   }
				                }
				            }
						})
						.state('result', {
							url: "/result?tags",
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
