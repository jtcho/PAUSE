'use strict';

angular.module('pauseApp')
.controller('NewNameCtrl', ['$scope', function($scope) {

	$scope.onSubmit = function() {
		console.log('Submitted.');
	};

}]);