/**
 * Created by edgar on 10/08/16.
 */
(function() {
    'use strict';

    angular
        .module('appCorona')
        .controller('HomeController', HomeController, function ($scope){
            $scope.isCollapsed = true;
        });

    /** @ngInject */
    function HomeController() {
        var vm = this;

    }
})();
