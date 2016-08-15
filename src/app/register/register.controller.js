/**
 * Created by edgar on 04/08/16.
 */
(function() {
  'use strict';

  angular
    .module('appCorona')
    .controller('RegisterController', RegisterController);

  /** @ngInject */
  function RegisterController($scope, $auth, $state, $timeout) {
    var vm = this;


    vm.server = [];
    //  localStorage.removeItem('debug');

      vm.submitForm = function(form) {
      vm.submitted = true;

      $timeout(function(){
          vm.submitted = false;
      },2000);

      // check to make sure the form is completely valid
      if (form.$valid) {

          var date = vm.user.birthday;
          var pieces = date.split('-');
          pieces.reverse();
          var reversed = pieces.join('-');

          var phone = vm.user.phone_cel.replace(/[.*+?^${}()|[\]\\-]/g, "");
          phone = phone.replace(' ', '');


        $auth.signup({
            username:   vm.user.alias,
            password:   vm.user.password,
            birthdate:  reversed,
            first_name: vm.user.firstname,
            last_name:  vm.user.lastname,
            telephone:  phone,
            email:      vm.user.email
          })
          .then(function() {
            // Si se ha registrado correctamente,
            // Podemos redirigirle a otra parte
            $state.go('login');
          })
          .catch(function(response) {
            vm.server = response.data;
            // Si ha habido errores, llegaremos a esta función
          });
      }

    };

  }
})();
