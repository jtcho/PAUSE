'use strict';

angular.module('pauseApp')
.controller('NewNameCtrl', ['$rootScope', '$scope', '$state', function($rootScope, $scope, $state) {

	/*
	 * Function: onSubmit
	 * ------------------
	 * Invoked when the user enters the name form.
	 */
	$scope.onSubmit = function() {

		//TODO: Error if empty name?

		$rootScope.data = {};
		$rootScope.data.level = 1;
		$rootScope.data.expPercent = 0;
		$rootScope.data.name = $scope.characterName;

		setTimeout(function() {
			$state.go('main.status');
		}, 0);
	};

}]);