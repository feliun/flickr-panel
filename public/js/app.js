(function() {
	var app = angular.module('flickrApp', [ 'ui.router', 'ngTagsInput',
											'httpServices',
											'navigationCtrls', 'filterCtrls', 'picBoardCtrls', 'loadingCtrls',
											'navigationDirectives' ])
				.controller('MainCtrl', function($rootScope, $scope) {
					$scope.collapseHeader = false;
					$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
						var statesWithHeader = [ 'filter' ];
						$scope.collapseHeader = !_.includes(statesWithHeader, toState.name);
					})
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
