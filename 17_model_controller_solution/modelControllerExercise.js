(function() {
  var module = angular.module('modelControllerExercise', []);

  module.directive('expressionValidator', function($parse) {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ngModelCtrl) {
        var expr = $parse(attrs.expressionValidator);
        console.log('attrs.expressionValidator', attrs.expressionValidator);
         console.log('expr', expr);

          scope.$watch(
              function() {
                return expr(scope, {$value: ngModelCtrl.$viewValue});
              },
              function(valid) {
                ngModelCtrl.$setValidity('expressionValidator', valid);
                }
          );
      }
    }
  });

})();
