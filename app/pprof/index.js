'use strict';

myApp.controller('PprofCtrl', function($scope, $window, $timeout, Service, CONF, DTOptionsBuilder, DTColumnDefBuilder) {
    $scope.loading = true;
    $scope.options = {
        cpu: true,
        heap: true,
        trace: true,
        block: true
    }
    var timer = null;
    $scope.onSelect = function() {
        $scope.pprofs = null
        $scope.loading = true;
        $timeout.cancel(timer);
        timer = $timeout(function() {
            pprof($scope.selectedNode(), $scope.options, $scope.date)
        }, 600);
    }

    $scope.download = function(type, data) {
        data.downloading = true
        $window.open(CONF.baseUrl + "/download?type=" + type + "&nodeid=" + data.NodeID + "&created=" + data.Created, '_blank');
        data.downloading = false
    }

    function pprof(nodes, options, date) {
        if (nodes.length == 0) {
            $scope.loading = false
            return
        }
        var opt = [];
        angular.forEach(options, function(v, k) {
            if (v === true) {
                opt.push(k);
            }
        })
        if (opt.length == 0) {
            return;
        }
        var data = {
            "nodes": nodes,
            "options": opt,
            "date": {
                "start": (new Date(date.start).getTime() / 1000),
                "end": (new Date(date.end).getTime() / 1000)
            }
        }

        $scope.loading = true;
        Service.Profile.query(data, function(response) {
            $scope.loading = false;
            $scope.pprofs = response;
        }, function(e) {
            $scope.loading = false;
            console.log(e)
            $scope.errmsg = e.config.method + " " + e.config.url + " " + e.status + " " + e.statusText;
        })
    }

    $scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers')
        .withDisplayLength(10).withOption('order', [0, 'desc']);
    $scope.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(3).notSortable()
    ];

    $scope.$on("$destroy", function() {
        $timeout.cancel(timer);
    });
});
