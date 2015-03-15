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
						controller: ['$http', function($http) {
							this.tagList = [];
							this.currentTag = "";
							this.addTag = function() {
								this.tagList.push(this.currentTag);
								this.currentTag = "";
							};
							this.addRandomTag = function() {
								var randomWordUrl = 'http://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&minLength=3&maxLength=10&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';
								var tags = this.tagList;
								$http.get(randomWordUrl)
									.success(function(data) {
							    		tags.push(data[0].word.toLowerCase());
							    	})
							    	.error(function(err) {
							    		var randomNumber = Math.floor(Math.random(0, 10) * 100);
							    		tags.push(randomNumber);	
							    	});
							};
							this.queryPics = function() {
								var flickrUrl = 'http://www.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=?';
								var tagsQuery = this.tagList.join(',');
								flickrUrl += '&tags=' + tagsQuery;
								var tags = this.tagList;
								$.getJSON(flickrUrl,
									function(data){
										tags = []; //TODO bind the <ul> with the tagList model so they get deleted
										console.log('data:', data);
									}
								); //Using this method because $http finds a CORS issue - maybe needs config
							};
						}],
						controllerAs: "criteriaCtrl"
					}
				});

})();