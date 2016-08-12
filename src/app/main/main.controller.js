(function() {
  'use strict';

  angular
    .module('appCorona')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, toastr, $http, $log, $auth) {

    var vm = this;
    var token = $auth.getToken();



    $http({
      method: 'GET',
      url: 'http://dev.corona.geekies.co:8000/accounts/',
    }).then(function successCallback(response) {
      vm.user = response.data;
      // this callback will be called asynchronously
      // when the response is available
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      $log.info(response);
    });


    vm.salir = function(){

      $auth.logout();
      $state.go('home');
    }

  }
})();
