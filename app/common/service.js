'use strict';

myApp
    .factory('ServiceNode', function($resource) {
        return {
            Nodes: $resource("https://api.github.com/orgs/mozilla/repos", {}, {
                query: {
                    method: "get",
                    isArray: true
                }
            }),
        };
    });
