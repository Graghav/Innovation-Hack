(function() {
    'use strict';

    var core = angular.module('app.core');

    var config = {
        appErrorPrefix: '[IH Error] ', //Configure the exceptionHandler decorator
        appTitle: 'Innovation Hack',
        version: '0.0.1',
        cacheExpiration : 600000, //CacheExpiration to 10 min
        auth_key : 'auth_token'
    };

    core.value('config', config);


    core.config(configure);

    configure.$inject = ['$logProvider', '$locationProvider', '$httpProvider','routerHelperProvider'];

    /* @ngInject */
    function configure($logProvider, $locationProvider, $httpProvider,routerHelperProvider) {


        $httpProvider.defaults.useXDomain = true;

        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: true
        });
        // turn debugging off/on (no info or warn)
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }

        routerHelperProvider.configure({
            docTitle: config.appTitle + ' '
        });

    }
})();
