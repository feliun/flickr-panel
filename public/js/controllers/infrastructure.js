(function() {
	var app = angular.module('infrastructureCtrls', ['httpServices'])
				.controller('CriteriaSelectorCtrl', ['HttpQueriesSvc', function(httpQueries) {
					this.tagList = [];
					this.currentTag = "";

					this.addTag = function() {
						this.tagList.push(this.currentTag);
						this.currentTag = "";
					};

					this.addRandomTag = function() {
						var self = this;
						httpQueries.randomWord()
							.success(function(data) {
					    		self.tagList.push(data[0].word.toLowerCase());
					    	})
					    	.error(function(err) {
					    		var randomNumber = Math.floor(Math.random(0, 10) * 100);
					    		self.tagList.push(randomNumber);	
					    	});
					};

					this.queryPics = function() {
						var self = this;
						httpQueries.flickrData(self.tagList, function(data) {
							self.tagList = [];
							console.log('data:', data);
						});
					};

				}]);
})();