'use strict';

myApp.controller('PprofCtrl', function($scope, Service, DTOptionsBuilder, DTColumnDefBuilder) {
    $scope.options = {
        profile: true,
        heap: true,
        trace: true,
        block: true
    }
    $scope.onSelect = function() {
        clearTimeout(timer)
        timer = setTimeout(function() {
            pprof($scope.selectedNode(), $scope.options, $scope.date)
        }, 600)
    }

    function pprof(nodes, options, date) {
        if (nodes.length == 0) {
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

    var timer = null;
    $scope.$on("$destroy", function() {
        clearTimeout(timer)
    });
});
