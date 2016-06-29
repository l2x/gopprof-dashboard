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
        console.log(nodes, options, date)
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
        Service.Stats.query(data, function(response) {
            console.log(response)
        }, function(e) {
            console.log(e)
        })
    }

    var timer = null;
    $scope.$on("$destroy", function() {
        clearTimeout(timer)
    });
});
