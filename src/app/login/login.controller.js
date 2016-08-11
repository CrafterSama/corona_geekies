(function() {
  'use strict';

  angular
    .module('appCorona')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($timeout, toastr, $auth, $state) {
    var vm = this;

    vm.submitForm = function(form) {

      vm.submitted = true;
      // check to make sure the form is completely valid
      if (form.$valid) {

        $auth.login({
            username: vm.user.username,
            password: vm.user.password
          })
          .then(function() {
            // Si se ha registrado correctamente,
            // Podemos redirigirle a otra parte
            $state.go('home');
            //$location.path("/private");
          })
          .catch(function(response) {
            //$log.info(response);
            vm.server = response.data;
            toastr.error(response.data.non_field_errors[0]);
            // Si ha habido errores, llegaremos a esta función
          });
      }

    };

  }
})();
