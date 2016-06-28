'use strict';

myApp.controller('StatsCtrl', function($scope) {
  $scope.nodes = [
    {nodeid:"node1", tags:"t1,t2", internal_ip:"192.168.1.1", external_ip:"222.222.222.222"},
    {nodeid:"node2", tags:"t1", internal_ip:"192.168.1.2", external_ip:"192.168.1.1"},
    {nodeid:"node3", tags:"t2", internal_ip:"127.0.0.2", external_ip:"172.0.0.1"},
  ];
  var timer = null
  $scope.onSelect = function() {
     var sn = []
     angular.forEach($scope.nodes, function(node){
       if(node.checked) {
         sn.push(node.nodeid)
       }
     });

     clearTimeout(timer)
     timer = setTimeout(function(){
       console.log(sn)
     }, 800)
     $scope.$on("$destroy", function(){
        clearTimeout(timer)
    });
  }
});
