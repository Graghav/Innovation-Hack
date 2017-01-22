(function() {
    'use strict';

    angular
        .module('blocks.logger')
        .factory('logger', logger);

    logger.$inject = ['$log'];

    function logger($log) {
        var service = {
            error   : error,
            info    : info,
            success : success,
            warning : warning,
            log     : $log.log
        };

        return service;
        /////////////////////

        function error(message, data, title) {
            Materialize.toast(message, 4000)
            $log.error('Error: ' + message, data);
        }

        function info(message, data, title) {
            Materialize.toast(message, 4000)
            $log.info('Info: ' + message, data);
        }

        function success(message, data, title) {
            Materialize.toast(message, 4000)
            $log.info('Success: ' + message, data);
        }

        function warning(message, data, title) {
            Materialize.toast(message, 4000)
            $log.warn('Warning: ' + message, data);
        }
    }
}());
