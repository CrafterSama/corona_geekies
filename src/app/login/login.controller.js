(function() {
  'use strict';

  angular
    .module('appCorona')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($timeout, toastr, $auth, $state, $scope, $remember) {
    var vm = this;
    $scope.remember = false;

    vm.submitForm = function(form) {

      vm.submitted = true;
      // check to make sure the form is completely valid
      if (form.$valid) {

        $auth.login({
            username: $scope.username,
            password: $scope.password
          })
          .then(function() {
            // Si se ha registrado correctamente,
            // Podemos redirigirle a otra parte
            $state.go('main');
            //$location.path("/private");
          })
          .catch(function(response) {
            //$log.info(response);
            vm.server = response.data;
            try {
              if(response.data.non_field_errors[0] !== null){
                toastr.error(response.data.non_field_errors[0]);
              }
            }
            catch(err) {
            }

            // Si ha habido errores, llegaremos a esta función
          });
      }

    };


    if ($remember('username') && $remember('password') ) {
      $scope.remember = true;
      
    }

      $scope.username = $remember('username');
      $scope.password = $remember('password');

    $scope.rememberMe = function() {
      if ($scope.remember) {
        $remember('username', $scope.username);
        $remember('password', $scope.password);
      } else {
        $remember('username', '');
        $remember('password', '');
      }
    };


    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    $scope.active = 0;
    var slides = $scope.slides = [];
    var currIndex = 0;

    $scope.addSlide = function() {
      var newWidth = 600 + slides.length + 1;
      slides.push({
        image: 'http://lorempixel.com/' + newWidth + '/300',
        text: ['Nice image','Awesome photograph','That is so cool','I love that'][slides.length % 4],
        id: currIndex++
      });
    };

    $scope.randomize = function() {
      var indexes = generateIndexesArray();
      assignNewIndexesToSlides(indexes);
    };

    for (var i = 0; i < 4; i++) {
      $scope.addSlide();
    }

    // Randomize logic below

    function assignNewIndexesToSlides(indexes) {
      for (var i = 0, l = slides.length; i < l; i++) {
        slides[i].id = indexes.pop();
      }
    }

    function generateIndexesArray() {
      var indexes = [];
      for (var i = 0; i < currIndex; ++i) {
        indexes[i] = i;
      }
      return shuffle(indexes);
    }

    // http://stackoverflow.com/questions/962802#962890
    function shuffle(array) {
      var tmp, current, top = array.length;

      if (top) {
        while (--top) {
          current = Math.floor(Math.random() * (top + 1));
          tmp = array[current];
          array[current] = array[top];
          array[top] = tmp;
        }
      }

      return array;
    }

  }
})();
