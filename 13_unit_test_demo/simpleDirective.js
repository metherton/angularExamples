(function() {
  var module = angular.module('simpleDirective', []);

  module.directive('simpleDirective', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'simpleDirectiveTemplate.html'
    };
  });
})();
