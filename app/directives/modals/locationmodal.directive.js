'use strict';


var isLetter = function(keyCode) {
	return /[a-zA-Z]/.test(String.fromCharCode(keyCode));
};

angular.module('pauseApp')
.directive('locationModal', ['$window', '$state', '$http', 'storageLiason',
	function($window, $state, $http, storageLiason) {
		return {
			restrict: 'E',
			templateUrl: 'views/directives/modals/locationmodal.directive.html',
			scope: {
				submitAction: '='
			},
			link: function(scope, element, attrs) {
				scope.title = attrs.modalTitle;
				scope.desc = attrs.desc;
				scope.height = attrs.height;
				scope.textData = '';
				scope.closeModal = function() {
					element.fadeOut(300, function() {
						this.remove();
					});
				};
				scope.onUserInput = function(e) {
					if (isLetter(e.keyCode)) {
						var currentValue = scope.textData+String.fromCharCode(e.keyCode);
						
					}
				};
				
			}
		};
	}
]);