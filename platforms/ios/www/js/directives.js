'use strict';
/**
 * Directives
 * @constructor
 */
angular.module('drugExpertSystem.directives', ['ngSanitize']).
  directive('waterSolubilityDirective', ['$sce', function($sce) {
    return {
      restrict: 'A', // only activate on element attribute
      require: 'ngModel', // get a hold of NgModelController
      link: function(scope, element, attrs, ngModel) {
        if (!ngModel) return; // do nothing if no ng-model

        // Specify how UI should be updated
        ngModel.$render = function() {
          element.html($sce.getTrustedHtml(ngModel.$viewValue || ''));
          
        };

        // Listen for change events to enable binding
        element.on('blur keyup change', function() {
          scope.$apply(read);
        });
        read(); // initialize

        // Write data to the model
        function read() {
          var html = element.html();
          ngModel.$setViewValue(html);
        }
      }
    };
  }]);