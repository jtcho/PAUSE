'use strict';

//Defined in newcharacter.controller.js
var transitionTo;

angular.module('pauseApp')
.directive('gearicon', ['$window', '$state',
	function($window, $state) {
		return {
			restrict: 'E',
			templateUrl: 'views/directives/gear.directive.html',
			scope: {
				info:'='
			},
			link: function(scope, element, attrs) {

				scope.openSettings = function() {
					transitionTo($state, 'main.settings.general');
				};
			}
		};
	}
]);