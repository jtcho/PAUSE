'use strict';

angular.module('pauseApp')
.directive('attributes', ['$window',
	function($window) {
		return {
			restrict: 'E',
			templateUrl: 'views/attributes.directive.html',
			link: function(scope) {
				console.log('Character Attributes directive link function called.');

				scope.attributes = [
					['STR', 0],
					['INT', 0],
					['DEX', 0],
					['WIS', 0],
					['LCK', 0],
					['CHA', 0]
				];

				scope.widths = [];
				
				setTimeout(function() {
					for (var i = 0; i < 6; i++) {
						scope.attributes[i][1] = Math.random()*100;
					}
				}, 500);
			}
		};
	}
]);