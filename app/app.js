'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
    'ngRoute',
    'ngResource',
    'ngCookies',
    'datatables',
    'ADM-dateTimePicker',
    'angularPromiseButtons'
]);

myApp.factory('myInterceptor', function($q) {
    var interceptor = {
        'responseError': function(rejection) {
            console.log(rejection)
            $.snackbar({
                content: ['<span class="text-danger">[ERROR] ', rejection.config.method, rejection.config.url, rejection.status, rejection.statusText, rejection.data ? '<br>' + rejection.data : "", '<span>'].join(" "),
                timeout: 0,
                htmlAllowed: true
            });
            return $q.reject(rejection);
        }
    };
    return interceptor;
});

myApp.config(['$locationProvider', '$routeProvider', '$resourceProvider', '$httpProvider', function($locationProvider, $routeProvider, $resourceProvider, $httpProvider) {
    $.material.init()
    $httpProvider.interceptors.push('myInterceptor');
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
}]);

myApp.constant("CONF", {
    baseUrl: ""
});
