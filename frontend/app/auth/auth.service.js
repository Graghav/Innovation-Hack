(function() {
    'use strict';

    angular
        .module('app.auth')
        .factory('authService', authService);

    authService.$inject = ['$window', 'config'];

    /* @ngInject */
    function authService($window, config) {

        var storage = $window.localStorage;

        var auth = {
            setToken          : setToken,
            getToken          : getToken,
            removeToken       : removeToken,
            isLoggedIn        : isLoggedIn
        };

        return auth;

        function setToken(value) {
            storage.setItem(config.auth_key, value);
        }

        function getToken() {
            return storage.getItem(config.auth_key);
        }

        function removeToken() {
          storage.removeItem(config.auth_key);
        }

        function isLoggedIn() {
          return !! this.getToken();
        }
    }
})();
