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

                var date = vm.user.birthdate;
                var pieces = date.split('-');
                pieces.reverse();
                var reversed = pieces.join('-');

                var phone = vm.user.phone_cel.replace(/[.*+?^${}()|[\]\\-]/g, "");
                phone = phone.replace(' ', '');


                $auth.signup({
                        username:   vm.user.alias,
                        password:   vm.user.password,
                        city:       vm.user.city,
                        birthdate:  reversed,
                        first_name: vm.user.first_name,
                        last_name:  vm.user.last_name,
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

        $http.get('https://graph.facebook.com/me?access_token='+localStorage.getItem("token_facebook")+'&fields=id,first_name,last_name,email,birthday,hometown,locale')
            .then(function(result){
                console.log(result.data);

            }, function(result){
                console.log(result)
            });



        $http.get('https://graph.facebook.com/me?access_token='+localStorage.getItem("token_facebook")+'')
            .then(function(result){
                var city = "";
                var pieces = "";
                if(result.data.hometown !== undefined){city = result.data.hometown.name}else{ city = "";}
                if(result.data.birthday !== undefined){var pieces = result.data.birthday.split('/'); pieces.join('-') }else{ pieces = "";}

                console.log(result.data);
                vm.user = {};
                vm.user.email = result.data.email;
                vm.user.ciudad = city;
                vm.user.last_name = result.data.last_name;
                vm.user.first_name = result.data.first_name;
                vm.user.birthdate = pieces;
                vm.user.image_url = 'http://graph.facebook.com/'+result.data.id+'/picture?type=large';
            }, function(result){
                console.log(result)
            });

    }
})();
