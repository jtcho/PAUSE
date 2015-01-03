'use strict';

angular.module('pauseApp')
.directive('attributes', ['$window',
	function($window) {
		return {
			restrict: 'E',
			templateUrl: 'views/attributes.directive.html',
			link: function(scope) {
				scope.Math = Math;
				scope.attributes = [
					['STR', 0, 'Strength: '],
					['INT', 0, 'Intelligence: '],
					['DEX', 0, 'Dexterity: '],
					['WIS', 0, 'Wisdom: '],
					['LCK', 0, 'Luck: '],
					['CHA', 0, 'Charisma: ']
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