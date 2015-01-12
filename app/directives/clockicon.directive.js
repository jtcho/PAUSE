'use strict';

//Defined in newcharacter.controller.js
var transitionTo;

angular.module('pauseApp')
.directive('clockicon', ['$window', '$state', 'storageLiason',
	function($window, $state, storageLiason) {
		return {
			restrict: 'E',
			templateUrl: 'views/directives/clockicon.directive.html',
			scope: {
				info:'='
			},
			link: function(scope, element, attrs) {
				scope.openClockView = function() {
            		storageLiason.setDefaultView('simple');
					transitionTo($state, 'simple');
				};
			}
		};
	}
]);