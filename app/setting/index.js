'use strict';

myApp.controller('SettingCtrl', function($scope, $timeout, Service) {

    var timer = null;
    $scope.onSelect = function() {
        $timeout.cancel(timer);
        var sn = $scope.selectedNode();
        if (sn.length == 0) {
            $scope.setting = null
            return
        }
        if (sn.length > 1) {
          $scope.setting = {}
          return
        }
        timer = $timeout(function() {
            request(sn)
        }, 600);
    }

    function request(nodeid) {
        $scope.loading = true;
        Service.Setting.query({
            "nodeid": nodeid
        }, function(response) {
            $scope.setting = {}
            $scope.setting = response.toJSON()
            if (!response.EnableProfile) {
                return
            }
            $scope.setting.ProfileType = {}
            angular.forEach(response.Profile, function(v) {
                $scope.setting.ProfileType[v] = true
            })
        }).$promise.finally(function() {
            $scope.loading = false;
        });
    }

    $scope.submit = function() {
        var sn = $scope.selectedNode();
        if(sn.length == 0) {
          return
        }
        var setting = $scope.setting;
        setting.Profile = []
        angular.forEach($scope.setting.ProfileType, function(v, k) {
            if (v == true) {
                setting.Profile.push(k)
            }
        });
        var data = {
            setting: $scope.setting,
            nodes: sn,
        }
        return Service.SettingSave.query(data, function() {
            $.snackbar({
                content: 'save success'
            });
        })
    }

    $timeout(function() {
        $scope.onSelect()
    }, 600);

    $scope.$on("$destroy", function() {
        $timeout.cancel(timer);
    });
});


myApp.controller('GorootCtrl', function($rootScope, $scope, Service) {
    $scope.addRow = function() {
        $scope.goroots.push({})
    }
    $scope.loading = true;
    Service.SettingGoroot.query({}, function(response) {
        $scope.goroots = response.length > 0 ? response : [{}]
    }).$promise.finally(function() {
        $scope.loading = false;
    });

    $scope.submit = function() {
        angular.forEach($scope.goroots, function(v, k) {
            if ((!v.version || !v.path) && k != 0) {
                $scope.goroots.splice(k, 1)
            }
        })
        if ($scope.goroots.length == 0) {
            return
        }

        return Service.SettingGorootSave.query($scope.goroots, function() {
            $.snackbar({
                content: 'save success'
            });
        });
    }
});
