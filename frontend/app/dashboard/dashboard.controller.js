(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', dashboardController);

    dashboardController.$inject = ['$scope', '$interval', '$http'];

    /* @ngInject */
    function dashboardController($scope, $interval, $http) {
        var vm = this;

        vm.showLoader = false;
        vm.showResult = false;

        vm.funfact = "";
        vm.result = {};
        vm.facts = [
          "More than $5.3 Trillion are traded on the foreign exchange market each day",
          "Forex trading daily volume is 4 times global GDP.",
          "Forex is the most liquid market in the world.",
          "Forex is the only truly global market that never sleeps, except at weekends.",
          "The modern forex market started in 1973",
        ];

        vm.search = function() {
          vm.showResult = false;
          $(".valign-wrapper").addClass('move-top');
          $(".title").fadeOut();
          vm.showLoader = true;
          $http({
            method: 'POST',
            url   : '/search/'+vm.keyword
          }).then(function(res){
            vm.result = res.data;
            vm.showLoader = false;
            vm.links = _.filter(vm.result.links, function(l){
              return l != null;
            })
            vm.showResult = true;
          })
        }

        vm.getLikelihoodScore = function(num) {
          return Math.round(num * 100)/100;
        }

        vm.keypress = function ($event){
             if ($event.which == 13){
                 vm.search();
             }
        };

        activate();

        function activate() {

          $interval(function () {
            vm.funfact = vm.facts[Math.floor(Math.random()*vm.facts.length)];
          }, 3000);

        }
    }
})();
