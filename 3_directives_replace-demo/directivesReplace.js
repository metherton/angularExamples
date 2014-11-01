(function() {
  var module = angular.module('directivesDemo', []);
  module.directive('helloAttribute', function() {
    return {
      restrict: 'A',
      replace: true,
      template: '<b>Hello world using attribute!</b>'
    };
  });
  module.directive('helloElement', function() {
    return {
      restrict: 'E',
      replace: true,
      template: '<b>Hello world using element!</b>'
    };
  });
  module.directive('helloClass', function() {
    return {
      restrict: 'C',
      replace: true,
      template: '<b>Hello world using class!</b>'
    };
  });
})();
