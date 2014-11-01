(function() {
  var module = angular.module('directivesDemo', []);
  module.directive('templateUrlDemo', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'myTemplate.html'
    };
  });
})();
