/**
 * Created by edgar on 04/08/16.
 */
(function() {
  'use strict';

  angular
    .module('appCorona')
    .controller('RegisterController', RegisterController);

  /** @ngInject */
  function RegisterController($scope, $auth, $state, $http, toastr) {
    var vm = this;
    vm.idGuerrero = false;


    vm.server = [];
    //  localStorage.removeItem('debug');


      vm.authenticate = function(provider) {
          $auth.authenticate(provider)
            .then(function(response) {
              localStorage.removeItem('satellizer_token');
              localStorage.setItem("token_facebook", response.access_token);
              $state.go('social_register');

            })
            .catch(function(error) {
              if (error.message) {
                toastr.error(error.message);
              } else if (error.data) {
                toastr.error(error.data.message, error.status);
              } else {
                toastr.error(error);
              }
            });
      };



      vm.submitForm = function(form) {
          console.log(form);
      vm.submitted = true;

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
            city:       vm.user.ciudad,
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

    vm.registerGuerrero = function(){
        vm.idGuerrero = !vm.idGuerrero;
    }

  }
})();
