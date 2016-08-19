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
            controllerAs: 'main'/*,
            resolve: {
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
          .state('social_register', {
            url: '/social_register',
            templateUrl: 'app/register/social_register.html',
            controller: 'SocialRegisterController',
            controllerAs: 'social_register'
          })
          .state('terms', {
              url: '/terms',
              templateUrl: 'app/register/terms_conditions.html'
          })
          .state('home', {
            url: '/home',
            templateUrl: 'app/home/home.html',
            controller: 'HomeController',
            controllerAs: 'home'
          })
          .state('/accounts/verify/', {
              url: '/accounts/verify/:code',
              templateUrl: 'app/verify/verify.html',
              controller: 'VerifyController',
              controllerAs: 'verify'
          });

      $urlRouterProvider.otherwise('/home');

      $locationProvider.html5Mode({
          enabled: true,
          requireBase: false
      });


  }

})();
