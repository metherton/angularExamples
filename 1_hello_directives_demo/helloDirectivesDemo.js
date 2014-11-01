(function() {
  var module = angular.module('directivesDemo', []);
  module.directive('helloWorld', function() {
    return {
      template: '<b>Hello world!</b>'
    };
  });
})();
