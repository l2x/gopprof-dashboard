'use strict';

myApp
    .factory('Service', function($resource) {
        return {
            Nodes: $resource("https://api.github.com/orgs/mozilla/repos", {}, {
                query: {
                    method: "get",
                    isArray: true
                }
            }),
            Stats: $resource("https://api.github.com/orgs/mozilla/repos", {}, {
                query: {
                    method: "post",
                    isArray: true
                }
            }),
        };
    });
