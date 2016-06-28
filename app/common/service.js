'use strict';

myApp
    .factory('ServiceNode', function($resource) {
        return {
            Nodes: $resource("api/nodes"),
        };
    });
