'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
    'ngRoute',
    'ngResource',
    'ngCookies',
    'datatables',
    'ADM-dateTimePicker'
]).
config(['$locationProvider', '$routeProvider', '$resourceProvider', function($locationProvider, $routeProvider, $resourceProvider) {
        $.material.init()

        //$locationProvider.hashPrefix('!');
        $routeProvider
            .when('/pprof', {
                templateUrl: 'pprof/index.html',
                controller: 'PprofCtrl'
            })
            .when('/stats', {
                templateUrl: 'stats/index.html',
                controller: 'StatsCtrl'
            })
            .when('/setting', {
                templateUrl: 'setting/index.html',
                controller: 'SettingCtrl'
            })
            .when("/setting/goroot", {
                templateUrl: 'setting/goroot.html',
                controller: 'GorootCtrl'
            })
            .otherwise({
                redirectTo: '/pprof'
            });
    }])
    .constant("CONF", {
        baseUrl: "http://127.0.0.1:8980"
    });
