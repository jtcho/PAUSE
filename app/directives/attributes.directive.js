'use strict';

angular.module('pauseApp')
.directive('attributes', ['$window', 'storageLiason',
	function($window, storageLiason) {
		return {
			restrict: 'E',
			templateUrl: 'views/directives/attributes.directive.html',
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
					var attributes = storageLiason.getAttributes();
					for (var i = 0; i < attributes.length; i++) {
						scope.attributes[i][1] = attributes[i][1];
					}
				}, 500);
			}
		};
	}
]);