/**
 * Created by edgar on 10/08/16.
 */
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
        $authProvider.loginUrl = "http://dev.corona.geekies.co:8000/accounts/login/";
        $authProvider.signupUrl = "http://dev.corona.geekies.co:8000/accounts/";
        $authProvider.tokenType = 'Token';
        /* $authProvider.tokenName = "token";
         $authProvider.tokenPrefix = "corona";*/


    }

})();
