/**
 * Created by edgar on 04/08/16.
 */
(function() {
    'use strict';

    angular
        .module('appCorona')
        .controller('RegisterController', RegisterController);

    /** @ngInject */
    function RegisterController($scope, $auth, $state, $http, toastr, $location) {
        var vm = this;
        vm.idGuerrero = false;
        vm.user = {};
        vm.server = [];
        var token = null;

        if($location.$$search.referral_code !== undefined){

            var referral_code = $location.$$search.referral_code;
        }else{
            var referral_code = "";
        }

        vm.authenticate = function(provider) {
            $auth.authenticate(provider)
                .then(function(response) {
                    console.log(response);
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
            console.log(vm.user);
            // check to make sure the form is completely valid
            if (form.$valid) {

                if(vm.user.id){

                    var date = vm.user.birthdate;
                    var pieces = date.split('-');
                    pieces.reverse();
                    var reversed = pieces.join('-');

                    var phone = vm.user.telephone.replace(/[.*+?^${}()|[\]\\-]/g, "");
                    phone = phone.replace(' ', '');

                    $http({
                        method: 'PUT',
                        url: 'http://dev.corona.geekies.co:8000/accounts/' + vm.user.id +'/',
                        data: {"birthdate": reversed, "last_name": vm.user.last_name,
                            "first_name": vm.user.first_name, "username": vm.user.username,
                            "password": vm.user.password, "telephone": phone, "email": vm.user.email,
                            "id_guerrero": vm.user.id_guerrero},
                        headers:{
                            'Authorization': 'Token ' + token
                        }
                    }).then(function successCallback(response) {

                        $state.go('login');
                        // this callback will be called asynchronously
                        // when the response is available
                    }, function errorCallback(response) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                        vm.server = response.data;
                    });

                }else{

                    var date = vm.user.birthdate;
                    var pieces = date.split('-');
                    pieces.reverse();
                    var reversed = pieces.join('-');

                    var phone = vm.user.telephone.replace(/[.*+?^${}()|[\]\\-]/g, "");
                    phone = phone.replace(' ', '');


                    $auth.signup({
                        username:   vm.user.username,
                        password:   vm.user.password,
                        city:       vm.user.city,
                        birthdate:  reversed,
                        first_name: vm.user.first_name,
                        last_name:  vm.user.last_name,
                        telephone:  phone,
                        email:      vm.user.email,
                        referral_code: referral_code
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

                    token = response.data.token;

                    /* Function para la fecha */
                    var birthdate = response.data.user.birthdate;
                    var pieces = birthdate.split('-');
                    pieces.reverse();
                    var reversed = pieces.join('-');

                    vm.user = response.data.user;
                    vm.user.birthdate = reversed;
                    vm.user.password = "";
                    // this callback will be called asynchronously
                    // when the response is available
                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    toastr.error('ID Guerrero no Existe');
                    vm.user.id_guerrero = null;
                    vm.registerGuerrero();
                });


            };
        }

    }
})();
