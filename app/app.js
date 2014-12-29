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
        templateUrl: 'views/main.html'
    })
    .state('main.test', {
        url: '',
        templateUrl: 'views/status.html',
        controller: 'StatusCtrl'
    })
    ;
});
