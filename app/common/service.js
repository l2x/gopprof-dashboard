'use strict';

myApp
    .factory('Service', function($resource, CONF) {
        return {
            Nodes: $resource(CONF.baseUrl + "/nodes", {}, {
                query: {
                    method: "get",
                    isArray: true
                }
            }),
            Stats: $resource(CONF.baseUrl + "/stats", {}, {
                query: {
                    method: "post",
                    isArray: true
                }
            }),
            Profile: $resource(CONF.baseUrl + "/pprof", {}, {
                query: {
                    method: "post",
                    isArray: true
                }
            })
        };
    });
