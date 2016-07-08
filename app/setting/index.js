'use strict';

myApp.controller('SettingCtrl', function($scope, Service) {
    $scope.profile = {
        data: {},
        type: {},
    }
    $scope.noselected = true
    $scope.setDefault = function() {
        $scope.noselected = false
        angular.forEach($scope.nodes, function(node) {
            node.checked = false
        })
        $scope.isSetDefault = true
        request("_default")
    }

    $scope.issave = false
    $scope.onSelect = function() {
        $scope.noselected =  false;
        $scope.isSetDefault = false
        var sn = []
        if ($scope.isSetDefault) {
            sn.push('_default')
        } else {
            sn = $scope.selectedNode();
        }
        if (sn.length == 0) {
            return
        }
        var nodeid = sn[0];
        request(nodeid)
    }

    function request(nodeid) {
        $scope.loading = true;
        $scope.issave = false
        Service.Setting.query({
            "nodeid": nodeid
        }, function(response) {
            $scope.loading = false;
            $scope.profile.data = response
            if (!response.EnableProfile) {
                return
            }
            angular.forEach(response.Profile, function(v) {
                $scope.profile.type[v] = true
            })

        }, function(e) {
            $scope.loading = false;
            console.log(e)
            $scope.errmsg = e.config.method + " " + e.config.url + " " + e.status + " " + e.statusText;
        })
    }

    $scope.submit = function() {
        if ($scope.issave) {
            return
        }
        var sn = [];
        if ($scope.isSetDefault) {
            sn.push('_default')
        } else {
            sn = $scope.selectedNode();
        }
        var typ = [];
        angular.forEach($scope.profile.type, function(v, k) {
            if (v == true) {
                typ.push(k)
            }
        })
        if ($scope.profile.data.EnableProfile && !$scope.profile.data.ProfileCron) {
            $scope.profile.data.ProfileCronErr = true;
            return
        }
        if ($scope.profile.data.EnableStats && !$scope.profile.data.StatsCron) {
            $scope.profile.data.StatsCronErr = true;
            return
        }
        $scope.profile.data.profile = typ;
        var data = {
            conf: $scope.profile.data.toJSON(),
            nodes: sn,
        }
        $scope.profile.errmsg = ""
        Service.SettingSave.query(data, function() {
            $scope.issave = true
        }, function(e) {
            console.log(e)
            $scope.profile.errmsg = e.config.method + " " + e.config.url + " " + e.status + " " + e.statusText;
        })
    }

    setTimeout(function() {
        $scope.onSelect()
    }, 1000)
})
