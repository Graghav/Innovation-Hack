(function() {
    'use strict';

    var core = angular.module('app.core');

    core.run(run);

    run.$inject = ['$rootScope', '$state', '$timeout'];

    /* @ngInject */
    function run($rootScope, $state, $timeout) {
        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams) {

                    event.preventDefault();

                    $timeout(function() {
                        $state.go(toState.name, toParams, {
                            notify: false
                        }).then(function() {
                            $rootScope.$broadcast('$stateChangeSuccess', toState, toParams, fromState, fromParams);
                        });
                    }, 100);
            }
        );
    }
})();
