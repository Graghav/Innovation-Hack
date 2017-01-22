(function() {
    'use strict';

    angular.module('app.core', [
        /*
         * Angular modules
         */
        'ui.router', 'ngSanitize',
        /*
         * App code modules
         */
        'blocks.logger', 'blocks.router'

        /*
         * 3rd Party modules
         */
    ]);
})();
