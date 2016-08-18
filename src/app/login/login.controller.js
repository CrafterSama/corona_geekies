(function() {
  'use strict';

  angular
    .module('appCorona')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($timeout, toastr, $auth, $state, $scope, $remember) {
    var vm = this;
    $scope.remember = false;
    window.localStorage.removeItem("satellizer_token");
    vm.submitForm = function(form) {

      vm.submitted = true;
      // check to make sure the form is completely valid
      if (form.$valid) {

        $auth.login({
            username_or_email: $scope.username,
            password: $scope.password
          })
          .then(function() {
            // Si se ha registrado correctamente,
            // Podemos redirigirle a otra parte
            $state.go('main');
            //$location.path("/private");
          })
          .catch(function(response) {
            //$log.info(response);
            vm.server = response.data;
            try {
              if(response.data.non_field_errors[0] !== null){
                toastr.error(response.data.non_field_errors[0]);
              }
            }
            catch(err) {
            }

            // Si ha habido errores, llegaremos a esta función
          });
      }

    };


    if ($remember('username') && $remember('password') ) {
      $scope.remember = true;
      
    }

      $scope.username = $remember('username');
      $scope.password = $remember('password');

    $scope.rememberMe = function() {
      if ($scope.remember) {
        $remember('username', $scope.username);
        $remember('password', $scope.password);
      } else {
        $remember('username', '');
        $remember('password', '');
      }
    };


  }
})();
