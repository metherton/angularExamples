(function() {
  var module = angular.module('e2e', []);

  module.directive('simpleDirective', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'simpleDirectiveTemplate.html'
    };
  });
})();
