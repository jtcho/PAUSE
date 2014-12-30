'use strict';

angular.module('pauseApp')
.controller('MainCtrl', ['$rootScope', '$scope', 'localStorageService', '$state', 
	function($rootScope, $scope, localStorageService, $state) {

		//Set up date to be used in application.
		$scope.dt = new Date();
				//Update every second.
	            setInterval(function() {
	                $scope.dt = new Date();
	            }, 1000);

	    //Load previous data.
		$rootScope.data = localStorageService.get('data');
		//Bind rootScope to local storage.
		localStorageService.bind($rootScope, 'data');

		//If no data, start from new screen.
		if (! $rootScope.data) {
			console.log('Creating new character!');
		}
		else {
			console.log('Found existing character!');
			$state.go('main.status');
		}
	}
]);