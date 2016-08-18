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
    vm.user = {};


    vm.server = [];
    //  localStorage.removeItem('debug');


      vm.authenticate = function(provider) {
          $auth.authenticate(provider);
      };



      vm.submitForm = function(form) {
          console.log(form);
      vm.submitted = true;

      // check to make sure the form is completely valid
      if (form.$valid) {

          var date = vm.user.birthdate;
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
    };

    vm.postGuerrero = function(id) {
        if (id !== undefined) {
            var value = {id_guerrero: vm.user.guerrero};

            $http({
                method: 'POST',
                url: 'http://dev.corona.geekies.co:8000/accounts/id_guerrero/',
                data: value
            }).then(function successCallback(response) {

                var birthdate = response.data.user.birthdate;

                var pieces = birthdate.split('-');
                pieces.reverse();
                var reversed = pieces.join('-');

                vm.user = response.data.user;
                vm.user.birthdate = birthdate;
                vm.user.password = "";
                // this callback will be called asynchronously
                // when the response is available
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                toastr.error('ID Guerrero no Existe');
                vm.registerGuerrero();
            });


        };
    }

  }
})();
