(function() {
  var module = angular.module('modelControllerDemo', []);
  module.directive('secretValidator', function() {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ngModelCtrl) {
        ngModelCtrl.$parsers.push(function(viewValue) {
          var valid = (viewValue === 'secret');
          ngModelCtrl.$setValidity('secretValidator', valid);
          if(valid) {
            return viewValue;
          }
          else {
            return undefined;
          }
        });
      }
    }
  });

  module.directive('integer', function() {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ngModelCtrl) {
        ngModelCtrl.$parsers.unshift(function(viewValue) {

          var valid = /^[\d]*$/.test(viewValue);
          ngModelCtrl.$setValidity('integer', valid);
          if(valid && viewValue !== '') {
            return parseInt(viewValue, 10);
          }
          else {
            return null;
          }
        });
        ngModelCtrl.$formatters.push(function(modelValue) {
          if(modelValue === undefined || modelValue === null) {
            return '';
          }
          return '' + modelValue;
        });
      }
    }
  });
})();
