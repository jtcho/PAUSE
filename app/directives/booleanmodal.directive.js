'use strict';

angular.module('pauseApp')
.directive('booleanModal', ['$window', '$state', 'storageLiason',
	function($window, $state, storageLiason) {
		return {
			restrict: 'E',
			templateUrl: 'views/directives/booleanmodal.directive.html',
			scope: {
				info:'='
			},
			link: function(scope, element, attrs) {
				scope.title = attrs.title;
				scope.desc = attrs.desc;
				scope.height = attrs.height;
				scope.closeModal = function() {
					element.fadeOut(300, function() {
						this.remove();
					});
				};
				scope.wipeUserData = function() {
					storageLiason.reset();
					scope.closeModal();
					$state.go('main.newcharacter', [], {	location: false });	
				};
			}
		};
	}
]);