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
        var opt = false;
        angular.forEach(options, function(v, k) {
            if (v === true) {
                opt = true;
            }
        })
        if (opt == false) {
            return;
        }
        var data = {
            "node": nodes,
            "option": options,
            "date": date
        }

        $("#chart_container").empty()
        $scope.loading = true;
        Service.Stats.query(data, function(response) {
            $scope.loading = false;
            if (response.errno != 0) {
              console.log(response);
              scope.errmsg = response.errmsg;
              return
            }
            // TODO render chart

        }, function(e) {
            $scope.loading = false;
            console.log(e)
            $scope.errmsg = e.config.method + " " + e.config.url + " " + e.status + " " + e.statusText;
        })


        var seriesOptions = [],
            seriesCounter = 0,
            names = ['MSFT', 'AAPL', 'GOOG'];
        function createChart() {
            var el = $('<div class="jumbotron"></div>')
            $("#chart_container").append(el)
            $(el).highcharts('StockChart', {
                legend: {
                    enabled: true
                },
                series: seriesOptions
            });
        }
        $.each(names, function(i, name) {
            $.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=' + name.toLowerCase() + '-c.json&callback=?', function(data) {
                seriesOptions[i] = {
                    name: name,
                    data: data
                };
                seriesCounter += 1;
                if (seriesCounter === names.length) {
                    createChart();
                }
            });
        });
    }





    var timer = null;
    $scope.$on("$destroy", function() {
        clearTimeout(timer)
    });
});
