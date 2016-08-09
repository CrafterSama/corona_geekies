(function() {
  'use strict';

  angular
    .module('appCorona')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
