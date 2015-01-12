'use strict';

angular.module('pauseApp', [
    'ui.router',
    'LocalStorageModule',
    'ngAnimate'
])
.config(function($stateProvider, localStorageServiceProvider, $urlRouterProvider) {

    //
    localStorageServiceProvider.setPrefix('pause');

    $urlRouterProvider.otherwise('/');

    //Set up states.
    $stateProvider
    .state('main', {
        abstract: true,
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        url: ''
    })
    /*
     * CHARACTER CREATION STATES
     */
    .state('main.newcharacter', {
        templateUrl: 'views/character_creation/new_name.html',
        url: '',
        controller: 'NewNameCtrl'
    })
    .state('main.newgender', {
        templateUrl: 'views/character_creation/new_gender.html',
        url: '',
        controller: 'NewGenderCtrl'
    })
    .state('main.newbirthday', {
        templateUrl: 'views/character_creation/new_birthday.html',
        url: '',
        controller: 'NewBirthdayCtrl'
    })
    .state('main.newclass', {
        templateUrl: 'views/character_creation/new_class.html',
        url: '',
        controller: 'NewClassCtrl'
    })
    .state('main.newalignment', {
        template: '<h2 class="text-center sheen">Coming soon...</h2>',
        url: '',
        controller: function($scope) {}
    })
    .state('main.newsw', {
        templateUrl: 'views/character_creation/new_sw.html',
        url: '',
        controller: 'NewSWCtrl'
    })
    /*
     * MAIN STATES
     */
    .state('main.status', {
        // url: '/status', //Note that these urls don't actually show up in browser.
        templateUrl: 'views/status.html',
        url:'',
        controller: 'StatusCtrl'
    })
    .state('main.settings', {
        templateUrl: 'views/settings.html',
        url:'',
        controller: 'SettingsCtrl'
    })
    .state('main.settings.general', {
        templateUrl: 'views/settings/settings_general.html',
        url: '',
        controller: 'GeneralSettingsCtrl'
    })
    .state('main.settings.user', {
        templateUrl: 'views/settings/settings_user.html',
        url: '',
        controller: 'UserSettingsCtrl'
    })
    .state('main.settings.theme', {
        templateUrl: 'views/settings/settings_theme.html',
        url: '',
        controller: 'ThemeSettingsCtrl'
    })
    /*
     * CLOCK MODE
     */
     .state('simple', {
        templateUrl: 'views/simple.html',
        url: '',
        controller: 'SimpleCtrl'
     })
    ;
});
