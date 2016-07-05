'use strict';

myApp.controller('StatsCtrl', function($scope, Service) {
    $scope.options = {
        goroutine: true,
        heap: true,
        gc: true
    }
    $scope.onSelect = function() {
        clearTimeout(timer)
        timer = setTimeout(function() {
            stats($scope.selectedNode(), $scope.options, $scope.date)
        }, 600)
    }

    function stats(nodes, options, date) {
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

        $("#chart_container").empty()
        $scope.loading = true;
        Service.Stats.query(data, function(response) {
            $scope.loading = false;
            angular.forEach(response, function(v) {
                createChart(v.type, v.data)
            })
        }, function(e) {
            $scope.loading = false;
            console.log(e)
            $scope.errmsg = e.config.method + " " + e.config.url + " " + e.status + " " + e.statusText;
        })
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

    var timer = null;
    $scope.$on("$destroy", function() {
        clearTimeout(timer)
    });
});
