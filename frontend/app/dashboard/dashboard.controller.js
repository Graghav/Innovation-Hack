(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', dashboardController);

    dashboardController.$inject = [];

    /* @ngInject */
    function dashboardController() {
        var vm = this;

        activate();

        function activate() {

        }
    }
})();
