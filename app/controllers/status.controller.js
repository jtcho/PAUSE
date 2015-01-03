'use strict';

angular.module('pauseApp')
//Status Screen Angular Controller
.controller('StatusCtrl', ['$scope', 'localStorageService', 'storageLiason',
	function($scope, localStorageService, storageLiason) {

		//
		angular.element('.animate-screen').css('opacity', 0.0);
		angular.element('.animate-screen').animate({
				opacity: 1,
				'-webkit-animation-fill-mode': 'forwards'
			}, 1000, function() {});

		$scope.data = storageLiason.data;

		var birthday = new Date($scope.data.birthday);
		$scope.birthdayString = (birthday.getMonth()+1) + '/' + birthday.getDate();

		// setInterval(function() {
		// 	$rootScope.data.expPercent += 0.001;
		// 	if ($rootScope.data.expPercent > 1.0) {
		// 		$rootScope.data.expPercent -= 1.0;
		// 		$rootScope.data.level++;
		// 	}
		// 	if ($rootScope.data.level > 100)
		// 		$rootScope.data.level = 1;
		// 	$scope.$apply();
		// }, 15);
	}
])
//Custom Directive for QTip2 Tooltips
.directive('tooltip', function() {
	return function(scope, element, attrs) {
		element.qtip({
	    	style: {
	    		classes: 'qtip-dark tooltip-center'
	    	},
	        content: {
	        	text: function(event, api) {
	        		// return Math.round(angular.element(this).attr('tooltip-content'))+'%' || '';
	        		return angular.element(this).attr('tooltip-content') || '';
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