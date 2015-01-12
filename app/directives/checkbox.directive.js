'use strict';

//Defined in newcharacter.controller.js
var transitionTo;

angular.module('pauseApp')
.directive('checkbox', ['$window', '$state', 'storageLiason',
	function($window, $state, storageLiason) {
		return {
			restrict: 'E',
			templateUrl: 'views/directives/checkbox.directive.html',
			scope: {
				isChecked: '=',
				settingsKey: '='
			},
			link: function(scope, element, attrs) {
				scope.toggle = function() {
					scope.isChecked = ! scope.isChecked;
					storageLiason.setSettingsValue(scope.settingsKey, !scope.isChecked);
				};
			}
		};
	}
]);