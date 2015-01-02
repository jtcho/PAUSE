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
    /*
     * MAIN STATES
     */
    .state('main.status', {
        // url: '/status', //Note that these urls don't actually show up in browser.
        templateUrl: 'views/status.html',
        url:'',
        controller: 'StatusCtrl'
    })
    ;
});
