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

    module.directive('bla', function() {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, ngModelCtrl) {
                ngModelCtrl.$parsers.push(function (inputValue) {
                    // this next if is necessary for when using ng-required on your input.
                    // In such cases, when a letter is typed first, this parser will be called
                    // again, and the 2nd time, the value will be undefined
                    if (inputValue == undefined) return ''
                    var transformedInput = inputValue.replace(/[^0-9]/g, '');
                    if (transformedInput!=inputValue) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }

                    return transformedInput;
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
