'use strict';

angular.module('pauseApp')
.controller('MainCtrl', ['$scope', 'localStorageService', '$state', 'storageLiason',
	function($scope, localStorageService, $state, storageLiason) {

		var themes = ['metroTwilight', 'starryNight'];
		var cssLink = angular.element('link[title="activeTheme"]');

		//If we have already existing data, skip character creation.
		if (storageLiason.isValid()) {
			cssLink.attr('href', 'styles/themes/'+storageLiason.getTheme()+'.css?v='+Math.random(10,10000));

			$state.go(storageLiason.getDefaultView(), [], {	location: false });	
			// $state.go('main.settings.general', [], {	location: false });	
			// $state.go('simple', [], { location: false});
			//location: false
			//Avoids annoying issue where state change cancels any pending url navigation.
		}
		else {
			var randomThemeIndex = Math.floor(Math.random()*themes.length);
			cssLink.attr('href', 'styles/themes/'+themes[randomThemeIndex]+'.css?v='+Math.random(10,10000));
			storageLiason.reset();
			storageLiason.init();
			storageLiason.setTheme(themes[randomThemeIndex]);
		}

		//Set up date to be used in application.
		$scope.dt = new Date();
		//Update every second.
        setInterval(function() {
            $scope.dt = Date.now();
            $scope.$apply();
        }, 1000);
	}
]);