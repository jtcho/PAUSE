'use strict';

/*
 * Factory: soundManager
 * ----------------------
 * Handles and plays all sounds for the application.
 */
angular.module('pauseApp').factory('soundManager', ['storageLiason', 
    function(storageLiason) {
        return {
        	playSound : function(soundTitle, soundFile, delay, duration) {
        		if (storageLiason.isSoundEnabled()) {
	        		setTimeout(function() {
							angular.element('body').append('<audio title="'+soundTitle+'" src="assets/audio/'+soundFile+'.mp3" autoplay/>');
						},delay);
						setTimeout(function() {
							angular.element('audio[title="'+soundTitle+'"]').remove();
						}, duration);
				}
        	}
        };
    }
]);