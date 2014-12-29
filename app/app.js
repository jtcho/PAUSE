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
        controller: function($scope) {
            $scope.dt = new Date();
            setInterval(function() {
                $scope.dt = new Date();
            }, 1000);
        }
    })
    .state('main.test', {
        url: '',
        templateUrl: 'views/status.html',
        controller: 'StatusCtrl'
    })
    ;
});
