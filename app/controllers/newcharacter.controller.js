'use strict';

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

			storageLiason.setLevel(1);
			storageLiason.setExp(0);
			storageLiason.setName($scope.characterName.toUpperCase());
			storageLiason.setTheme('starryNight');
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
			transitionTo($state, 'main.status');
		};

	}
])
;

/*
 * Function: zodiacSign
 * -----------------
 * Given a date, returns a string for
 * the particular astrological sign.
 */
var zodiacSign = function(date) {
	var month = date.getMonth()+1;
	var day = date.getDate();
	switch(month) {

		case 1:
			if (day < 20)
				return 'Capricorn';
			return 'Aquarius';
		case 2:
			if (day < 19)
				return 'Aquarius';
			return 'Pisces';
		case 3:
			if (day < 21)
				return 'Pisces';
			return 'Aries';
		case 4:
			if (day < 20)
				return 'Aries';
			return 'Taurus';
		case 5:
			if (day < 21)
				return 'Taurus';
			return 'Gemini';
		case 6:
			if (day < 21)
				return 'Gemini';
			return 'Cancer';
		case 7:
			if (day < 23)
				return 'Cancer';
			return 'Leo';
		case 8:
			if (day < 23)
				return 'Leo';
			return 'Virgo';
		case 9:
			if (day < 23)
				return 'Virgo';
			return 'Libra';
		case 10:
			if (day < 23)
				return 'Libra';
			return 'Scorpio';
		case 11:
			if (day < 22)
				return 'Scorpio';
			return 'Sagittarius';
		case 12:
			if (day < 22)
				return 'Sagittarius';
			return 'Capricorn';

	}
};

/*
 * Function: isVowel
 * -----------------
 * Returns whether the given letter is a vowel or not (caps only).
 */
var isVowel = function(letter) {
	var vowels = ['A', 'E', 'I', 'O', 'U'];
	for (var i = 0; i < 5; i++)
		if (letter === vowels[i])
			return true;
	return false;
};

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