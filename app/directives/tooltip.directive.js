'use strict';

//Custom Directive for QTip2 Tooltips
angular.module('pauseApp')
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