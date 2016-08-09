/**
 * Created by edgar on 04/08/16.
 */
(function() {
  'use strict';

  angular
    .module('appCorona')
    .controller('RegisterController', RegisterController);

  /** @ngInject */
  function RegisterController($scope, $auth, $state) {
    var vm = this;

    vm.server = [];
    //  localStorage.removeItem('debug');

    vm.submitForm = function(form) {
      vm.submitted = true;
      // check to make sure the form is completely valid
      if (form.$valid) {
        $auth.signup({
            username:   vm.user.alias,
            password:   vm.user.password,
            birthdate:  vm.user.birthday,
            first_name: vm.user.firstname,
            last_name:  vm.user.lastname,
            telephone:  vm.user.phone_cel,
            email:      vm.user.email
          })
          .then(function() {
            // Si se ha registrado correctamente,
            // Podemos redirigirle a otra parte
            $state.go('home');
            // $log.info(result);
            //$location.path("/private");
          })
          .catch(function(response) {
            vm.server = response.data;

            // Si ha habido errores, llegaremos a esta función
          });
      }

    };

  }
})();
