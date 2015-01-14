'use strict';

var transitionTo;

angular.module('pauseApp')
.controller('SettingsCtrl', ['$scope', '$state', '$document',
	function($scope, $state, $document) {

		// //Fadein effect.
		angular.element('.settings-screen').hide().fadeIn(1000);
		// angular.element('.settings-screen').css('opacity', 0.0);
		// angular.element('.settings-screen').animate({
		// 		opacity: 1,
		// 		'-webkit-animation-fill-mode': 'forwards'
		// 	}, 1000, function() {});

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
.controller('UserSettingsCtrl', ['$scope', '$state', '$compile', 'storageLiason',
	function($scope, $state, $compile, storageLiason) {
		/*
		 * Function: showErasePrompt
		 * -------------------------
		 * Shows the erase user data prompt.
		 */
		$scope.showErasePrompt = function() {
			var desc = 'Are you sure you want to erase all your character data?';
			var elem = angular.element($compile('<boolean-modal '+
					'modal-title=\"Wipe Data\" ' + 'desc=\"'+desc+'\"' +
					'/>')($scope)).hide().appendTo('body').fadeIn(300);
		};

		/*
		 * Function: showNamePrompt
		 * -------------------------
		 * Shows the change avatar name prompt.
		 */
		$scope.showNamePrompt = function() {
			var desc = 'Enter your new name.';
			var elem = angular.element($compile('<text-modal '+
				'modal-title="Choose New Name" ' + 'desc="'+
				desc+'" submit-action="onSubmitName"/>')($scope)).hide().appendTo('body').fadeIn(300);
		};

		/*
		 * Function: onSubmitName
		 * -------------------------
		 * Changes user name.
		 */
		$scope.onSubmitName = function(name) {
			angular.element('text-modal').fadeOut(300, function() {
						this.remove();
					});
			if (! name || !/[a-zA-Z]+/.test(name) || name.length > 10) {
				return;
			}

            storageLiason.setName(name.toUpperCase());
		};

		$scope.showClassPrompt = function() {
			var desc = 'Enter your new class.';
			var elem = angular.element($compile('<text-modal '+
				'modal-title="Reclass" ' + 'desc="'+
				desc+'" submit-action="onSubmitClass"/>')($scope)).hide().appendTo('body').fadeIn(300);
		};

		$scope.onSubmitClass = function(className) {
			angular.element('text-modal').fadeOut(300, function() {
				this.remove();
			});
			if (! className || !/[a-zA-Z]+/.test(className) || className.length > 15) {
				return;
			}

            storageLiason.setClassName(className.toUpperCase());
		};

		$scope.showLocationPrompt = function() {
			var desc = 'Enter your location.';
			angular.element($compile('<location-modal '+
				'modal-title="Choose Location" ' + 'desc="'+
				desc+'" submit-action="onSubmitLocation"/>')($scope)).hide().appendTo('body').fadeIn(300);
		};

		$scope.onSubmitLocation = function(location) {
			angular.element('location-modal').fadeOut(300, function() {
				this.remove();
			});
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