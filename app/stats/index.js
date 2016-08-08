'use strict';

myApp.controller('StatsCtrl', function($scope, $timeout, Service) {
    $scope.loading = true;
    $scope.options = {
        goroutine: true,
        heap: true,
        gc: true
    }

    var timer = null;
    $scope.onSelect = function() {
        $scope.loading = true;
        $("#chart_container").empty()
        $timeout.cancel(timer);
        timer = $timeout(function() {
            stats($scope.selectedNode(), $scope.options, $scope.date)
        }, 600)
    }

    function stats(nodes, options, date) {
        if (nodes.length == 0) {
            $scope.loading = false;
            return
        }
        var opt = [];
        angular.forEach(options, function(v, k) {
            if (v === true) {
                opt.push(k);
            }
        })
        if (opt.length == 0) {
            $scope.loading = false;
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
        Service.Stats.query(data, function(response) {
            angular.forEach(response, function(v) {
                createChart(v.type, v.data)
            })
        }).$promise.finally(function() {
            $scope.loading = false;
        });
    }

    function createChart(title, series) {
        var title = titleDetail(title);
        var el = $('<div class="jumbotron"></div>');
        $("#chart_container").append(el);
        $(el).highcharts('StockChart', {
            title: {
                text: title
            },
            legend: {
                enabled: true
            },
            series: series
        });
    }

    function titleDetail(title) {
        switch (title) {
            case 'heap':
                return 'heap (byte)';
            case 'gc':
                return 'gc pause (ns)'
        }
        return title;
    }

    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });

    $scope.$on("$destroy", function() {
        $timeout.cancel(timer);
    });
});
