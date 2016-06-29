'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
    'ngRoute',
    'ngResource',
    'ADM-dateTimePicker'
]).
config(['$locationProvider', '$routeProvider', '$resourceProvider', function($locationProvider, $routeProvider, $resourceProvider) {
    $.material.init()

    //$locationProvider.hashPrefix('!');
    $routeProvider
        .when('/', {
            templateUrl: 'pprof/index.html',
            controller: 'PprofCtrl'
        })
        .when('/pprof', {
            templateUrl: 'pprof/index.html',
            controller: 'PprofCtrl'
        })
        .when('/stats', {
            templateUrl: 'stats/index.html',
            controller: 'StatsCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);
