'use strict';

myApp.controller('SettingCtrl', function($scope, $timeout, Service) {
    //$scope.loading = true;
    $scope.profile = {
        data: {},
        type: {},
    }
    $scope.noselected = true
    $scope.issave = false
    $scope.onSelect = function() {
        var sn = []
        sn = $scope.selectedNode();
        if (sn.length == 0) {
            return
        }
        $scope.noselected = false;
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
        sn = $scope.selectedNode();
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
            $.snackbar({
                content: ['<span class="text-danger">[ERROR] ', e.config.method, e.config.url, e.status, e.statusText, '<span>'].join(" "),
                timeout: 0,
                htmlAllowed: true
            });
        })
    }

    $timeout(function() {
        $scope.onSelect()
    }, 1000)
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
