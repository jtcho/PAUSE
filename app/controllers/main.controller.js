'use strict';

angular.module('pauseApp')
.controller('MainCtrl', ['$scope', 'localStorageService', '$state', 'storageLiason',
	function($scope, localStorageService, $state, storageLiason) {

		//If we have already existing data, skip character creation.
		if (storageLiason.isValid()) {
			$state.go('main.status', [], {	location: false });	
			//location: false
			//Avoids annoying issue where state change cancels any pending url navigation.
		}
		else
			storageLiason.reset();

		//Set up date to be used in application.
		$scope.dt = new Date();
				//Update every second.
	            setInterval(function() {
	                $scope.dt = new Date();
	            }, 1000);
	}
]);