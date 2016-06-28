'use strict';

myApp.controller('StatsCtrl', function($scope) {
    $scope.onSelect = function() {
        var sn = $scope.selectedNode()

        clearTimeout(timer)
        timer = setTimeout(function() {
            console.log(sn)
        }, 600)
    }
    var timer = null;
    $scope.$on("$destroy", function() {
        clearTimeout(timer)
    });
});
