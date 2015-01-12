'use strict';

angular.module('pauseApp')
.directive('textModal', ['$window', '$state', 'storageLiason',
	function($window, $state, storageLiason) {
		return {
			restrict: 'E',
			templateUrl: 'views/directives/modals/textmodal.directive.html',
			scope: {
				submitAction: '='
			},
			link: function(scope, element, attrs) {
				scope.title = attrs.modalTitle;
				scope.desc = attrs.desc;
				scope.height = attrs.height;
				scope.closeModal = function() {
					element.fadeOut(300, function() {
						this.remove();
					});
				};
				
			}
		};
	}
]);