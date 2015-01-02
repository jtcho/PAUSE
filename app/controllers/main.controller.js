'use strict';

angular.module('pauseApp')
.controller('MainCtrl', ['$rootScope', '$scope', 'localStorageService', '$state', '$location', 
	function($rootScope, $scope, localStorageService, $state, $location) {

	    //Load previous data.
		$rootScope.data = localStorageService.get('data');

		if ($rootScope.data) {
			$state.go('main.status', [], {	location: false });	
			//location: false
			//Avoids annoying issue where state change cancels any pending url navigation.
		}

		//Bind rootScope to local storage.
		localStorageService.bind($rootScope, 'data');

		//Set up date to be used in application.
		$scope.dt = new Date();
				//Update every second.
	            setInterval(function() {
	                $scope.dt = new Date();
	            }, 1000);
	}
]);