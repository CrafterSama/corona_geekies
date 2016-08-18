/**
 * Created by edgar on 17/08/16.
 */
(function() {
    'use strict';

    angular
        .module('appCorona')
        .controller('VerifyController', VerifyController);

    /** @ngInject */
    function VerifyController($location, $http) {
        var vm = this;

        var code = $location.$$search.code;

        $http({
            method: 'GET',
            url: 'http://dev.corona.geekies.co:8000/accounts/verify/?code=' + code
        }).then(function successCallback(response) {
            console.log(response);
            vm.result = response.data;
            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {
            vm.result = response.data;
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });


    }
})();