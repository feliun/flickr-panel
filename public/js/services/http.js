(function() {
	var app = angular.module('httpServices', [])
				.service('HttpQueriesSvc', ['$http', function($http) {
					this.randomWord = function() {
						var randomWordUrl = 'http://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&minLength=3&maxLength=10&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';
						return $http.get(randomWordUrl);
					};

					this.flickrData = function(tagList, cb) {
						var flickrUrl = 'http://www.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=?';
						var tagsQuery = tagList.join(',');
						flickrUrl += '&tags=' + tagsQuery;
						$.getJSON(flickrUrl, cb);
					}; //Using this method because $http finds a CORS issue - maybe needs config

				}]);

})();