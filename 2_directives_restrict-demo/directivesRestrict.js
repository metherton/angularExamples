(function() {
  var module = angular.module('directivesDemo', []);
  module.directive('helloAttribute', function() {
    return {
      restrict: 'A',
      template: '<b>Hello world using attribute!</b>'
    };
  });
  module.directive('helloElement', function() {
    return {
      restrict: 'E',
      template: '<b>Hello world using element!</b>'
    };
  });
  module.directive('helloClass', function() {
    return {
      restrict: 'C',
      template: '<b>Hello world using class!</b>'
    };
  });
})();
