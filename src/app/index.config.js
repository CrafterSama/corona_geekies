(function() {
  'use strict';

  angular
    .module('appCorona')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig, $authProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = false;
    toastrConfig.progressBar = true;


    // Parametros de configuración
    $authProvider.loginUrl = "http://corona.hobox.org/accounts/login/";
    $authProvider.signupUrl = "http://corona.hobox.org/accounts/";
    $authProvider.tokenType = 'Token';
   /* $authProvider.tokenName = "token";
    $authProvider.tokenPrefix = "corona";*/


  }

})();
