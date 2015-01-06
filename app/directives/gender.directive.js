'use strict';

angular.module('pauseApp')
.directive('gendericon', ['$window',
	function($window) {
		return {
			restrict: 'E',
			templateUrl: 'views/gender.directive.html',
			scope: {
				info:'='
			},
			link: function(scope, element, attrs) {
				// scope.color = attrs.color;
				scope.gender = attrs.gender;
				scope.boxLength = attrs.boxLength;
				scope.genderColor = attrs.color;
			}
		};
	}
])
.directive('ngLength', function() {
        return function(scope, element, attrs) {
            scope.$watch(attrs.ngLength, function(value) {
                element.attr('width', value);
                element.attr('height', value);
            });
        };
});