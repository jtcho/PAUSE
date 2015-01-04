'use strict';

//Custom Directive for Enabling 2-way Binding with contentEditable HTML5 elements.
angular.module('pauseApp')
.directive('contenteditable', function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {

      function read() {
        ngModel.$setViewValue(element.html());
      }

      ngModel.$render = function() {
        element.html(ngModel.$viewValue || '');
      };

      element.bind('blur keyup change', function() {
        scope.$apply(read);
      });
    }
  };
});