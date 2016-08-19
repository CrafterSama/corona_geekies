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
      var url = 'https://graph.facebook.com/me/feed?link=http://dev.corona.geekies.co/#/register?referreal_code='+id+'&access_token='+localStorage.getItem("token_facebook")+'';

      $http({
        url: url,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
      })
          .success(function(data) {
            toastr.success('Enlace publicado con exito');
          })
          .error(function(error) {
            toastr.error('Enlace no fue publicado');
          });
    };

    vm.authenticate = function(provider) {
      console.log(localStorage.getItem("token_facebook"));

      if(localStorage.getItem("token_facebook") == undefined){

        $auth.authenticate(provider)
            .then(function(response) {
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
