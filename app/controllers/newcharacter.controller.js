'use strict';

angular.module('pauseApp')
.controller('NewNameCtrl', ['$rootScope', '$scope', '$state', function($rootScope, $scope, $state) {

	/*
	 * Function: onSubmit
	 * ------------------
	 * Invoked when the user enters the name form.
	 */
	$scope.onSubmit = function() {

		//Don't accept empty names or non-alphabetical.
		if (! $scope.characterName || !/[a-zA-Z]+/.test($scope.characterName) || $scope.characterName.length > 10)
			return;

		$rootScope.data = {};
		$rootScope.data.level = 1;
		$rootScope.data.expPercent = 0;
		$rootScope.data.name = $scope.characterName.toUpperCase();

		transitionTo($state, 'main.newgender');
	};

}]);

var transitionTo = function($state, nextState) {

	angular.element('.animate-screen').animate({
		opacity: 0,
		'-webkit-animation-fill-mode': 'forwards'
	}, 500, function() {
		$state.go(nextState, [], {	location: false });
	});

};