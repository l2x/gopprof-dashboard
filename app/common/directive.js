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
    .directive('sidebar', function(ServiceNode) {
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

                var data = [{
                    nodeid: "node1",
                    tags: "t1,t2",
                    internal_ip: "192.168.1.1",
                    external_ip: "222.222.222.222"
                }, {
                    nodeid: "node2",
                    tags: "t1",
                    internal_ip: "192.168.1.2",
                    external_ip: "192.168.1.1"
                }, {
                    nodeid: "node3",
                    tags: "t2",
                    internal_ip: "127.0.0.2",
                    external_ip: "172.0.0.1"
                }, ];

                ServiceNode.Nodes.query({}, function(response) {
                    console.log("ok", response)
                    scope.nodes = data
                }, function(response) {
                    console.log("err", response)
                })
            },
            templateUrl: function(elem, attr) {
                return 'common/sidebar.html';
            }
        }
    });
