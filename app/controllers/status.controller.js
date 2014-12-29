'use strict';

angular.module('pauseApp')
//Status Screen Angular Controller
.controller('StatusCtrl', ['$rootScope', '$scope', 'localStorageService', function($rootScope, $scope, localStorageService) {

	//Load previous data.
	$rootScope.data = localStorageService.get('data');

	if (! $rootScope.data) {
		$rootScope.data = {};
		$rootScope.data.level = 1;
		$rootScope.data.expPercent = 0.2;
	}
	
	// setInterval(function() {
	// 	$rootScope.data.expPercent += 0.001;
	// 	if ($rootScope.data.expPercent > 1.0) {
	// 		$rootScope.data.expPercent -= 1.0;
	// 		$rootScope.data.level++;
	// 	}
	// 	if ($rootScope.data.level > 100)
	// 		$rootScope.data.level = 1;
	// 	$scope.$apply(function() {
	// 		localStorageService.set('data', $rootScope.data);
	// 	});
	// }, 15);

}])
//Custom Directive for QTip2 Tooltips
.directive('tooltip', function() {
	return function(scope, element, attrs) {
		console.log(angular.element(element).attr('tooltip-content'));
		element.qtip({
	    	style: {
	    		classes: 'qtip-dark tooltip-center'
	    	},
	        content: {
	        	text: function(event, api) {
	        		return Math.round(angular.element(this).attr('tooltip-content'))+'%' || '';
	        	}
	        },
	        position: {
	        	target: 'mouse',
	        	adjust: {
	        		x:10,
	        		y:20,
	        		mouse: true
	        	}
	        }
	 	});
	};
})
;