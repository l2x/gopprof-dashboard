'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
    'ngRoute',
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
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
    }])
    .directive('sidebar', function() {
      return {
        restrict: 'E',
        link: function(scope, el, attrs, controller) {
            scope.sidebarSelect  = function(nodes, node) {
              node.checked = node.checked ? false : true;
              if(!node.checked) {
                scope.allChecked = false;
                return;
              }
              var ak = true
              angular.forEach(nodes, function(node, k) {
                if(!node.checked) {
                  ak = false;
                  return;
                }
              })
              scope.allChecked = ak;
            };
            scope.sidebarSelectAll = function(nodes) {
               scope.allChecked = scope.allChecked ? false : true;
               angular.forEach(nodes, function(node, k) {
                 node.checked = scope.allChecked
               })
            }
        },
        templateUrl: function(elem, attr) {
          return 'common/sidebar.html';
        }
      }
    })
;
