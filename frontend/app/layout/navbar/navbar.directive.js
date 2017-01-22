(function() {
    'use strict';

    angular
        .module('app.layout')
        .directive('navbar', navBar);

    /* @ngInject */
    function navBar() {
        var directive = {
            restrict: 'EA',
            templateUrl: '/app/layout/navbar/navbar.html',
            scope: {
            },
            link: linkFunc,
            controller: Controller,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {
            $(document).ready(function() {
               $(".button-collapse").sideNav();
            })
        }
    }

    Controller.$inject = [];

    /* @ngInject */
    function Controller() {
        var vm = this;

        activate();

        function activate() {

        }
    }
})();
