(function() {
    'use strict';

    angular
        .module('app.cache')
        .factory('cacheService', cacheService);

    cacheService.$inject = ['$window', 'config'];

    /* @ngInject */
    function cacheService($window, config) {

        var storage = $window.localStorage;

        var cache = {
            setCache          : setCache,
            setCacheWithExpiry: setCacheWithExpiry,
            getCache          : getCache,
            removeCache       : removeCache,
            clearCache        : clearCache
        };

        return cache;

        function setCacheWithExpiry(key, value, expires) {
            var expiration = Date.now() + ( expires || config.cacheExpiration);
            storage.setItem(key, JSON.stringify(value));
            storage.setItem(key + "_expires", expiration);
        }

        function setCache(key,value) {
            storage.setItem(key, value);
        }

        function getCache(key) {
          var data       = storage.getItem(key);
          var expiration = storage.getItem(key + "_expires");

          if(data && ( expires > Date.now() )){
      			return JSON.parse(data);
      		}
      		else {
      			return null;
      		}
        }

        function removeCache(key) {
          storage.removeItem(key);
        }

        function clearCache() {
          storage.clear();
        }
    }
})();
