'use strict';

angular.module('pauseApp', [
    'ui.router'
])
.config(function($stateProvider) {
    //Set up states.
    $stateProvider
    .state('main', {
        abstract: true,
        templateUrl: 'views/main.html'
    })
    .state('main.test', {
        url: '',
        templateUrl: 'views/status.html',
        controller: function($scope) {
            $scope.expPercent = 0.2;
            setInterval(function() {
                $scope.expPercent += 0.005;
                if ($scope.expPercent > 1.0)
                    $scope.expPercent -= 1.0;
                $scope.$apply();
            }, 15);
        }
    })
    ;
});
