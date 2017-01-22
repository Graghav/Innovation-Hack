(function() {
    'use strict';

    angular
        .module('app.layout')
        .directive('sidenav', sidenav);

    /* @ngInject */
    function sidenav() {
        var directive = {
            restrict: 'EA',
            templateUrl: '/app/layout/sidenav/sidenav.html',
            scope: {
            },
            link: linkFunc,
            controller: Controller,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {
          $(document).ready(function(){
           $('.collapsible').collapsible({
             accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
           });
          });
        }
    }

    Controller.$inject = ['$location'];

    /* @ngInject */
    function Controller($location) {
        var vm = this;

        activate();

        function activate() {

          vm.getClass = function (path) {
              if ($location.path().substr(0, path.length) === path) {
                return 'active';
              } else {
                return '';
              }
          }

        }
    }
})();
