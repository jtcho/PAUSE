'use strict';

angular.module('pauseApp', [
    'ui.router'
])
.config(function($stateProvider) {

    console.log('Setting up config for the states.');

    $stateProvider
    .state('main', {
        abstract: true,
        template: '<ui-view />'
    })
    .state('main.test', {
        url: '',
        template: '<h1>Test</h1>',
        controller: function() {
            console.log('Test2.');
        }
    })
    ;
});
