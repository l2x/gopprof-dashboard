'use strict';

myApp
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
    .directive('datepicker', function() {
        return {
            restrict: 'E',
            link: function($scope, $el, $attrs, $controller) {
                $scope.dateSelect = function(s, $event) {
                    if (typeof $event != "undefined") {
                        var elm = angular.element($event.currentTarget || $event.srcElement);
                        elm.parent().find('a').removeClass('active')
                        elm.addClass('active')
                    }
                    var n = new Date();
                    $scope.date = {
                        start: n.setTime(n.getTime() - s),
                        end: new Date(),
                    }
                }
                $scope.dateSelect(3600000)
            },
            templateUrl: function(elem, attr) {
                return 'common/datepicker.html';
            }
        }
    })
    .directive('loadingbar', function() {
        return {
            restrict: 'E',
            templateUrl: function(elem, attr) {
                return 'common/loadingbar.html';
            }
        }
    })
    .directive('sidebar', function(Service) {
        return {
            restrict: 'E',
            link: function(scope, el, attrs, controller) {
                scope.sidebarSelect = function(nodes, node) {
                    node.checked = node.checked ? false : true;
                    if (!node.checked) {
                        scope.allChecked = false;
                        return;
                    }
                    var ak = true
                    angular.forEach(nodes, function(node, k) {
                        if (!node.checked) {
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
                };
                scope.selectedNode = function() {
                    var sn = []
                    angular.forEach(scope.nodes, function(node) {
                        if (node.checked) {
                            sn.push(node.nodeid)
                        }
                    });
                    return sn;
                }

                Service.Nodes.query({}, function(response) {
                    scope.nodes = response
                }, function(e) {
                    console.log(e)
                    scope.sidebar_errmsg = e.config.method + " " + e.config.url + " " + e.status + " " + e.statusText;
                });
            },
            templateUrl: function(elem, attr) {
                return 'common/sidebar.html';
            }
        }
    });
