'use strict';

myApp.controller('SettingCtrl', function($scope, Service) {
    $scope.profile = {
        data: {},
        type: {},
    }
    $scope.loading = true;
    $scope.isdfa = 0
    $scope.issave = false
    $scope.onSelect = function(dfa) {
        $scope.issave = false
        if (!dfa) {
            var sn = $scope.selectedNode();
            if (sn.length == 0) {
                $scope.isdfa = -1
                return
            }
            $scope.isdfa = 0
            if (sn.length > 1) {
                $scope.profile.data = {}
                return
            }
            var nodeid = sn[0];
        } else {
            $scope.isdfa = 1
            var nodeid = "_default"

            angular.forEach($scope.nodes, function(node) {
                node.checked = false
            })
        }
        $scope.loading = true;
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
        if ($scope.isdfa === -1 || $scope.issave) {
            return
        }
        var sn = [];
        if ($scope.isdfa == 1) {
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
