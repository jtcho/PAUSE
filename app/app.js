'use strict';

angular.module('pauseApp', [
    'ui.router',
    'LocalStorageModule'
])
.config(function($stateProvider, localStorageServiceProvider) {

    //
    localStorageServiceProvider.setPrefix('pause');

    //Set up states.
    $stateProvider
    .state('main', {
        abstract: true,
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
    })
    .state('main.newCharacter', {
        url: '',
        templateUrl: 'views/newcharacter.html',
        controller: function($scope) {

        }
    })
    .state('main.test', {
        url: '/status', //Note that these urls don't actually show up in browser.
        templateUrl: 'views/status.html',
        controller: 'StatusCtrl'
    })
    ;
});
