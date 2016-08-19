(function() {
  'use strict';

  angular
      .module('appCorona')
      .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, toastr, $http, $log, $auth, $state) {

    var vm = this;
    var token = $auth.getToken();



    $http({
      method: 'GET',
      url: 'http://dev.corona.geekies.co:8000/accounts/'
    }).then(function successCallback(response) {
      vm.user = response.data;
      // this callback will be called asynchronously
      // when the response is available
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      $log.info(response);
    });


    vm.salir = function(){
      $auth.logout();
      $state.go('home');
    };


    vm.facebookPost = function(id){

      $http.post( 'https://graph.facebook.com/me/feed', {
          "access_token": localStorage.getItem("token_facebook"),
          "link": 'http://dev.corona.geekies.co/#/register?referreal_code='+id+''
        })
        .then(
          function(data) {
            toastr.success('Enlace publicado con exito');
          }, function(error) {
            toastr.error('Su sesion de facebook ha expirado intente nuevamente');
            localStorage.removeItem('token_facebook');
          });

    };

    vm.authenticate = function(provider) {
      console.log(localStorage.getItem("token_facebook"));

      if(localStorage.getItem("token_facebook") === undefined || localStorage.getItem("token_facebook") == null){
        localStorage.setItem("satellizer_token2", localStorage.getItem("satellizer_token"));
        
        $auth.authenticate(provider)
            .then(function(response) { 
              localStorage.setItem("satellizer_token", localStorage.getItem("satellizer_token2") );
              localStorage.setItem("token_facebook", response.access_token);

              vm.facebookPost(vm.user.referral_code);
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
      }else{

        vm.facebookPost(vm.user.referral_code);

      }



    };

  }
})();
