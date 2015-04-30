(function() {
  var module = angular.module('simpleDirective', []);

  module.directive('simpleDirective', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'simpleDirectiveTemplate.html'
   //   template: '<h3>Hello {{name}}!</h3>'
    };
  });
})();
