'use strict';

angular.module('pauseApp')
//CONTROLLER FOR CHOOSING NAME PAGE
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

}])
//CONTROLLER FOR CHOOSING GENDER PAGE
.controller('NewGenderCtrl', ['$rootScope', '$scope', '$state', function($rootScope, $scope, $state) {

	/*
	 * Function: pickGender
	 * --------------------
	 * Invoked when the user clicks a gender button.
	 */
	$scope.pickGender = function(gender) {

		$rootScope.data.gender = gender;
		transitionTo($state, 'main.newbirthday');

	};

}])
;

/*
 * Function: transitionTo
 * ----------------------
 * Transitions the SPA from its current state to the next,
 * fading out all the currently loaded elements in the ui-view first.
 */
var transitionTo = function($state, nextState) {

	angular.element('.animate-screen').animate({
		opacity: 0,
		'-webkit-animation-fill-mode': 'forwards'
	}, 500, function() {
		$state.go(nextState, [], {	location: false });
	});

};