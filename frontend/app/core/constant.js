(function() {
    'use strict';

    var core = angular.module('app.core');

    var base = "http://localhost:1000";

    var endpoints = {
        login : base + "/login"
    };

    var apiEndpoints = {
      base : base,
      path : endpoints
    }

    core.constant('apiEndpoints', apiEndpoints);
    
})();
