'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.view1',
    'myApp.view2',
    'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    //$locationProvider.hashPrefix('!');
    $routeProvider.otherwise({
        redirectTo: '/view1'
    });
}])
.directive('activeLink', ['$location', function(location) {
    return {
        restrict: 'A',
        link: function(scope, el, attrs, controller) {
            var clazz = attrs.activeLink;
            var path = el.children('a').attr('href');
            path = path.substring(1);
            scope.location = location;
            scope.$watch('location.path()', function(newPath) {
                if (path === newPath) {
                    el.addClass(clazz);
                } else {
                    el.removeClass(clazz);
                }
            });
        }
    };
}]);
