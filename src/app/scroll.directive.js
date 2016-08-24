/**
 * Created by edgar on 14/08/16.
 */
'use strict';

angular.module('appCorona')
    .directive("myNavscroll", function($window) {
        return function(scope) {
            angular.element($window).bind("scroll", function() {
                if (!scope.scrollPosition) {
                    scope.scrollPosition = 0;
                }

                if (this.pageYOffset > scope.scrollPosition) {
                    scope.boolChangeClass = true;
                } else {
                    scope.boolChangeClass = false;
                }
                scope.scrollPosition = this.pageYOffset;
                scope.$apply();
            });
        };
    });
