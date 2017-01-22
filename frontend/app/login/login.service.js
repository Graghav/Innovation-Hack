(function() {
    'use strict';

    angular
        .module('app.login')
        .factory('loginService', loginService);

    loginService.$inject = ['$http', 'logger', 'Base64', 'apiEndpoints'];

    /* @ngInject */
    function loginService($http, logger, Base64, apiEndpoints) {
        var service = {
            login: login
        };

        return service;

        function login(data) {
            var AuthHeader = 'Basic ' + Base64.encode(data.username + ":" + data.password);

            return $http({
              method : 'POST',
              url    : apiEndpoints.path.login,
              headers: {
                'Authorization': AuthHeader
              }
            });
        }
    }
})();
