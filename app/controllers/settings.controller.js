'use strict';

var transitionTo;

angular.module('pauseApp')
.controller('SettingsCtrl', ['$scope', '$state', '$document',
	function($scope, $state, $document) {

		//Setting Tabs
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

		$scope.isActive = function(stateName) {
			if ($state.is(stateName))
				return 'settings-tab-active';
			return '';
		};

		$scope.openSettingsView = function(stateName) {
			if (! $state.is(stateName))
				transitionTo($state, stateName);
		};

		$scope.keyDown = function(e) {
			console.log(e.which);
		};

		$document.bind('keydown', function(e) {
			if (e.which === 27) {
				angular.element('.modal').fadeOut(300, function() {
					this.remove();
				});
			}
		});

		$scope.openStatusView = function() {
			transitionTo($state, 'main.status', '.settings-screen');
		};
	}
])
.controller('GeneralSettingsCtrl', ['$scope', '$state', 'storageLiason',
	function($scope, $state, storageLiason) {

		$scope.isSoundEnabled = ! storageLiason.isSoundEnabled();

	}
])
.controller('UserSettingsCtrl', ['$scope', '$state', '$compile',
	function($scope, $state, $compile) {
		$scope.showErasePrompt = function() {
			var desc = 'Are you sure you want to erase all your character data?';
			var elem = angular.element($compile('<boolean-modal '+
					'modal-title=\"Wipe Data\" ' + 'desc=\"'+desc+'\"' +
					'/>')($scope)).hide().appendTo('body').fadeIn(300);
		};
	}
])
.controller('ThemeSettingsCtrl', ['$scope', '$state', 'storageLiason',
	function($scope, $state, storageLiason) {
		$scope.themes = [
			{
				name: 'Metropolitan Twilight',
				filename: 'metroTwilight',
				thumbnail: 'styles/themes/metroTwilight.png'
			},
			{
				name: 'Starry Night',
				filename: 'starryNight',
				thumbnail: 'styles/themes/starryNight.png'
			}
		];

		$scope.changeTheme = function(filename) {
			if (storageLiason.data.theme != filename) {
				var cssLink = angular.element('link[title="activeTheme"]');
				cssLink.attr('href', 'styles/themes/'+filename+'.css?v='+Math.random(10,10000));
				storageLiason.setTheme(filename);
			}
		};
	}
])
;