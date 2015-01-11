'use strict';

angular.module('pauseApp')
.controller('SettingsCtrl', ['$scope', '$state',
	function($scope, $state) {
		$scope.settingTabs = [
			{
				id: 'General',
				state: 'main.settings.general'
			},
			{
				id: 'User',
				state: 'main.settings.user'
			},
			{
				id: 'Theme',
				state: 'main.settings.theme'
			}
		];
	}
]);