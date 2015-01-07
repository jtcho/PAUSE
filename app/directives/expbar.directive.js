'use strict';

angular.module('pauseApp')
.directive('expbar', ['$window',
	function($window) {
		return {
			restrict: 'E',
			templateUrl: 'views/directives/expbar.directive.html',
			link: function(scope, element, attrs) {
				// scope.Math = Math;
			}
		};
	}
]);