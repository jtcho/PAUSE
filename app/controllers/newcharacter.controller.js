'use strict';

//Declarations from util.js.
var transitionTo;
var zodiacSign;
var isVowel;

angular.module('pauseApp')
//CONTROLLER FOR CHOOSING NAME PAGE
.controller('NewNameCtrl', ['$scope', '$state', 'storageLiason',
	function($scope, $state, storageLiason) {
		/*
		 * Function: onSubmit
		 * ------------------
		 * Invoked when the user enters the name form.
		 */
		$scope.onSubmit = function() {

			//Don't accept empty names or non-alphabetical.
			if (! $scope.characterName || !/[a-zA-Z]+/.test($scope.characterName) || $scope.characterName.length > 10)
				return;

            storageLiason.setName($scope.characterName.toUpperCase());
			transitionTo($state, 'main.newgender');
		};
	}
])
//CONTROLLER FOR CHOOSING GENDER PAGE
.controller('NewGenderCtrl', ['$scope', '$state', 'storageLiason', 
	function($scope, $state, storageLiason) {

		$scope.name = storageLiason.data.name;

		/*
		 * Function: pickGender
		 * --------------------
		 * Invoked when the user clicks a gender button.
		 */
		$scope.pickGender = function(gender) {

			storageLiason.setGender(gender);
			transitionTo($state, 'main.newbirthday');

		};

		$scope.genderColor = angular.element('h2').css('color');
	}
])
.controller('NewBirthdayCtrl', ['$scope', '$state', '$filter', 'storageLiason',
function($scope, $state, $filter, storageLiason) {

	var keys = {};
	var input = angular.element('#birthdayInput');

	//On alt + down, prevent calendar dialog from showing.
	input.keydown(function(e) {
		keys[e.which] = true;

		if (keys[18] && keys[40])
			e.preventDefault();

		if (keys[13])
			$scope.onSubmit();
	});
	//
	input.keyup(function(e) {
		delete keys[e.which];
	});

	//
	$scope.value = new Date(2000, 0, 1);

	/*
	 * Function: onSubmit
	 * ------------------
	 * Invoked when the user submits a birthdate.
	 */
	$scope.onSubmit = function() {
		storageLiason.setBirthday($scope.value);
		transitionTo($state, 'main.newclass');
	};

}
])
.controller('NewClassCtrl', ['$scope', '$state', 'storageLiason',
	function($scope, $state, storageLiason) {

		$scope.zodiac = zodiacSign(storageLiason.data.birthday);
		$scope.article = isVowel($scope.zodiac.charAt(0)) ? 'An' : 'A';
		$scope.onSubmit = function() {

			if (! $scope.className || !/[a-zA-Z]+/.test($scope.className) || $scope.className.length > 15)
				return;

			storageLiason.setClassName($scope.className.toUpperCase());
			storageLiason.setValid(true);
			transitionTo($state, 'main.newsw');
		};

	}
])
.controller('NewSWCtrl', ['$scope', '$state', 'storageLiason', 
	function($scope, $state, storageLiason) {
		$scope.attrs = ['STR', 'INT', 'DEX', 'WIS', 'LCK', 'CHA'];

        $scope.sIndex = 0;
        $scope.wIndex = 0;
        $scope.updateSIndex = function(mod) {
        	$scope.sIndex = ($scope.sIndex + mod);
        	if ($scope.sIndex < 0 )
        		$scope.sIndex = $scope.attrs.length + $scope.sIndex;
        	else
        		$scope.sIndex %= $scope.attrs.length;
        };
        $scope.updateWIndex = function(mod) {
        	$scope.wIndex = ($scope.wIndex + mod);
        	if ($scope.wIndex < 0 )
        		$scope.wIndex = $scope.attrs.length + $scope.wIndex;
        	else
        		$scope.wIndex %= $scope.attrs.length;
        };
	}
])
;