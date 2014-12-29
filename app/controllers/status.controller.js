'use strict';

angular.module('pauseApp')
.controller('StatusCtrl', ['$rootScope', '$scope', 'localStorageService', function($rootScope, $scope, localStorageService) {

	//Load previous data.
	$rootScope.data = localStorageService.get('data');

	if (! $rootScope.data) {
		$rootScope.data = {};
		$rootScope.data.level = 1;
		$rootScope.data.expPercent = 0.2;
	}
	
	setInterval(function() {
		$rootScope.data.expPercent += 0.001;
		if ($rootScope.data.expPercent > 1.0) {
			$rootScope.data.expPercent -= 1.0;
			$rootScope.data.level++;
		}
		$scope.$apply(function() {
			localStorageService.set('data', $rootScope.data);
		});
	}, 15);

}]);