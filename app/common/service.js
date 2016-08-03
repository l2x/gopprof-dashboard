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
            }),
            Setting: $resource(CONF.baseUrl + "/setting", {}, {
                query: {
                    method: "get",
                    isArray: false
                }
            }),
            SettingSave: $resource(CONF.baseUrl + "/setting/save", {}, {
                query: {
                    method: "post"
                }
            }),
            SettingGoroot: $resource(CONF.baseUrl + "/setting/goroot", {}, {
                query: {
                    method: "get",
                    isArray: true,
                }
            }),
            SettingGorootSave: $resource(CONF.baseUrl + "/setting/goroot/save", {}, {
                query: {
                    method: "post"
                }
            }),
        };
    });
