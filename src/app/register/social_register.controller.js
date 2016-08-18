/**
 * Created by edgar on 04/08/16.
 */
(function() {
  'use strict';

  angular
    .module('appCorona')
    .controller('SocialRegisterController', SocialRegisterController);

  /** @ngInject */
  function SocialRegisterController($scope, $auth, $state, $http, toastr) {
    var vm = this;
    vm.server = [];
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

    $http.get(
      'https://graph.facebook.com/me?access_token='+localStorage.getItem("token_facebook")+'')
      .then(function(result){
        console.log(result.data)
        vm.user = {};
        vm.user.email = result.data.email;
        vm.user.ciudad = result.data.hometown.name;
        vm.user.lastname = result.data.last_name;
        vm.user.firstname = result.data.first_name;
        var pieces = result.data.birthday.split('/');
        vm.user.birthday = pieces.join('-');
        vm.user.image_url = 'http://graph.facebook.com/'+result.data.id+'/picture?type=large';
      }, function(result){
        console.log(result)
      });

  }
})();
