'use strict';

myApp
    .directive('activeLink', ['$location', function(location) {
        return {
            restrict: 'A',
            link: function(scope, el, attrs, controller) {
                var clazz = attrs.activeLink;
                var path = ""
                var data_href = el.attr('data-href')
                var data_prefix = el.attr('data-prefix')
                if (data_href) {
                    path = data_href
                } else if (data_prefix) {
                    path = data_prefix
                } else {
                    path = el.children('a').attr('href');
                }
                path = path.substring(1);
                scope.location = location;
                scope.$watch('location.path()', function(newPath) {
                    var cur = false
                    if (data_prefix) {
                        if (newPath.indexOf(path) == 0) {
                            cur = true
                        }
                    } else {
                        if (path === newPath) {
                            cur = true
                        }
                    }
                    if (cur) {
                        el.addClass(clazz);
                    } else {
                        el.removeClass(clazz);
                    }
                });
            }
        };
    }])
    .directive('datepicker', function($cookies) {
        return {
            restrict: 'E',
            link: function($scope, $el, $attrs, $controller) {
                $scope.datelist = [{
                    time: 3600000,
                    name: "1 hour"
                }, {
                    time: 3600000 * 6,
                    name: "6h"
                }, {
                    time: 3600000 * 12,
                    name: "12h"
                }, {
                    time: 3600000 * 24,
                    name: "1 day"
                }, {
                    time: 3600000 * 24 * 3,
                    name: "3d"
                }, {
                    time: 3600000 * 24 * 7,
                    name: "7d"
                }, {
                    time: 3600000 * 24 * 14,
                    name: "14d"
                }, {
                    time: 3600000 * 24 * 30,
                    name: "30d"
                }, ];

                $scope.dateSelect = function(s, $event) {
                    $scope.dateSelected = s
                    var n = new Date();
                    $scope.date = {
                        start: n.setTime(n.getTime() - s),
                        end: new Date(),
                    }
                    $cookies.putObject("datepicker:selected", s);
                }
                var s = $cookies.getObject("datepicker:selected");
                $scope.dateSelect(s ? s : 3600000);
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
    .directive('sidebar', function($cookies, Service) {
        return {
            restrict: 'E',
            link: function(scope, el, attrs, controller) {
                var single = el.attr("data-checkbox") == "single";
                if (single) {
                    scope.allCheckedHide = true;
                }
                var $selected;
                if (!single) {
                    $selected = $cookies.getObject("sidebar:node:selected");
                }
                if (!$selected) {
                    $selected = {}
                }

                scope.sidebarSelect = function(nodes, node) {
                    node.checked = node.checked ? false : true;
                    if (single) {
                        angular.forEach(nodes, function(n) {
                            if (n.NodeID != node.NodeID) {
                                n.checked = false
                            }
                        })
                    }
                    if (!single) {
                        saveSelect(node)
                    }
                    if (!node.checked) {
                        scope.allChecked = false;
                        return;
                    }
                    var ak = true
                    angular.forEach(nodes, function(n, k) {
                        if (!n.checked) {
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
                            sn.push(node.NodeID)
                        }
                    });
                    return sn;
                }

                Service.Nodes.query({}, function(response) {
                    scope.nodes = response
                    angular.forEach(scope.nodes, function(node) {
                        if ($selected[node.NodeID]) {
                            node.checked = true
                        }
                    })
                }, function(e) {
                    console.log(e)
                    scope.sidebar_errmsg = e.config.method + " " + e.config.url + " " + e.status + " " + e.statusText;
                });

                function saveSelect(node) {
                    if (node.checked) {
                        $selected[node.NodeID] = true;
                    } else {
                        delete $selected[node.NodeID];
                    }
                    $cookies.putObject("sidebar:node:selected", $selected);
                }
            },
            templateUrl: function(elem, attr) {
                return 'common/sidebar.html';
            }
        }
    });
