'use strict';

myApp.controller('SettingCtrl', function($scope, Service) {
    $scope.profile = {
        data: {},
        type: {},
    }

    $scope.onSelect = function(dfa) {
        if (!dfa) {
            var sn = $scope.selectedNode();
            if (sn.length != 1) {
                $scope.profile.data = {}
                return
            }
            var data = sn[0];
        } else {
            var data = {
                NodeID: "_default"
            }
            angular.forEach($scope.nodes, function(node){
              node.checked = false
            })
        }
        $scope.loading = true;
        Service.Setting.query({
            "nodeid": data.NodeID
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

    setTimeout(function() {
        $scope.onSelect()
    }, 1000)
})
