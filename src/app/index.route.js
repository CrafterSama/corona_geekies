(function() {
  'use strict';

  angular
      .module('appCorona')
      .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider, $locationProvider) {

      function loginRequired($q, $location, $auth) {
        var deferred = $q.defer();

        if ($auth.isAuthenticated()) {
          deferred.resolve();
        } else {
          $location.path('/login');
        }
        return deferred.promise;
      }


      $stateProvider
          .state('main', {
            url: '/main',
            templateUrl: 'app/main/main.html',
            controller: 'MainController',
            controllerAs: 'main',
            /*resolve: {
              loginRequired: loginRequired
          }*/
          })
          .state('login', {
            url: '/login',
            templateUrl: 'app/login/login.html',
            controller: 'LoginController',
            controllerAs: 'login'
          })
          .state('register', {
            url: '/register',
            templateUrl: 'app/register/register.html',
            controller: 'RegisterController',
            controllerAs: 'register'
          })
          .state('home', {
            url: '/home',
            templateUrl: 'app/home/home.html',
            controller: 'HomeController',
            controllerAs: 'home'
          });

      $urlRouterProvider.otherwise('/home');

  }

})();
