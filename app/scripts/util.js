'use strict';

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
var transitionTo = function($state, nextState, animateClass) {
	if (! animateClass)
		animateClass = '.animate-screen';

	angular.element(animateClass).animate({
		opacity: 0,
		'-webkit-animation-fill-mode': 'forwards'
	}, 500, function() {
		$state.go(nextState, [], {	location: false });
	});

};