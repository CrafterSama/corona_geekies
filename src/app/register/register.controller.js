/**
 * Created by edgar on 04/08/16.
 */
(function() {
    'use strict';

    angular
        .module('appCorona')
        .controller('RegisterController', RegisterController);

    /** @ngInject */
    function RegisterController($scope, $auth, $state, $http, toastr, $location, $filter) {
        var vm = this;
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

            vm.submitted = true;
            console.log(vm.user);
            // check to make sure the form is completely valid
            if (form.$valid) {

                if(vm.user.id){

                    var date = vm.user.birthdate;
                    var reversed = $filter('date')(date, "yyyy-MM-dd");

                    var phone = vm.user.telephone.replace(/[.*+?^${}()|[\]\\-]/g, "");
                    phone = phone.replace(' ', '');

                    $http({
                        method: 'PUT',
                        url: 'http://dev.corona.geekies.co:8000/accounts/' + vm.user.id +'/',
                        data: {"birthdate": reversed, "last_name": vm.user.last_name, "city": vm.user.city,
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
                    var reversed = $filter('date')(date, "yyyy-MM-dd");

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


            }
        };

        $scope.myDate = new Date();

        $scope.minDate = new Date(
            $scope.myDate.getFullYear(),
            $scope.myDate.getMonth() - 2,
            $scope.myDate.getDate());

        $scope.maxDate = new Date(
            $scope.myDate.getFullYear(),
            $scope.myDate.getMonth() + 2,
            $scope.myDate.getDate());

        $scope.onlyWeekendsPredicate = function(date) {
            var day = date.getDay();
            return day === 0 || day === 6;
        };

        $scope.today = function() {
            vm.user.birthdate = new Date();
        };

        $scope.today();

        $scope.clear = function() {
            vm.user.birthdate = null;
        };

        $scope.inlineOptions = {
            customClass: getDayClass,
            minDate: new Date(),
            showWeeks: true
        };

        $scope.dateOptions = {
            dateDisabled: disabled,
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };

        // Disable weekend selection
        function disabled(data) {
            var date = data.date,
                mode = data.mode;
            return mode === 'day' && (date.getDay() === -1 || date.getDay() === 7);
        }

        $scope.toggleMin = function() {
            $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
            $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
        };

        $scope.toggleMin();

        $scope.open1 = function() {
            $scope.popup1.opened = true;
        };

        $scope.open2 = function() {
            $scope.popup2.opened = true;
        };

        $scope.setDate = function(year, month, day) {
            vm.user.birthdate= new Date(year, month, day);
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate', 'dd/MM/yyyy'];
        $scope.format = $scope.formats[4];
        $scope.altInputFormats = ['M!/d!/yyyy'];

        $scope.popup1 = {
            opened: false
        };

        $scope.popup2 = {
            opened: false
        };

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 1);
        $scope.events = [
            {
                date: tomorrow,
                status: 'full'
            },
            {
                date: afterTomorrow,
                status: 'partially'
            }
        ];

        function getDayClass(data) {
            var date = data.date,
                mode = data.mode;
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0,0,0,0);

                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }
            return '';
        }
    }
})();