'use strict';

var transitionTo;

angular.module('pauseApp')
.controller('SimpleCtrl', ['$scope', 'localStorageService', '$state', 'storageLiason',
	function($scope, localStorageService, $state, storageLiason) {

		//Fadein effect.
		angular.element('.animate-screen').css('opacity', 0.0);
		angular.element('.animate-screen').animate({
				opacity: 1,
				'-webkit-animation-fill-mode': 'forwards'
			}, 1000, function() {});

		$scope.name = storageLiason.data.name;

		//Set up date to be used in application.
		$scope.dt = new Date();
		//Update every second.
        setInterval(function() {
            $scope.dt = Date.now();
            $scope.$apply();
        }, 1000);

        $scope.openStatusView = function() {
            storageLiason.setDefaultView('main.status');
        	transitionTo($state, 'main.status');
        };

        $scope.timeGreeting = '';
        var hours = $scope.dt.getHours();
        if (hours >= 5 && hours < 12)
        	$scope.timeGreeting = 'morning';
        else if (hours >= 12 && hours < 17)
        	$scope.timeGreeting = 'afternoon';
        else
        	$scope.timeGreeting = 'evening';
	}
]);