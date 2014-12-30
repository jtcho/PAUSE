'use strict';

angular.module('pauseApp')
.controller('NewNameCtrl', ['$rootScope', '$scope', '$state', function($rootScope, $scope, $state) {

	$scope.onSubmit = function() {
		$rootScope.data = {};
		$rootScope.data.level = 1;
		$rootScope.data.expPercent = 0;
		$rootScope.data.name = $scope.characterName;

		$state.go('main.status');
	};

}]);