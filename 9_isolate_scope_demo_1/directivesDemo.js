(function() {
  var module = angular.module('directivesDemo', []);
  module.directive('isolatedGreeting', function() {
    return {
      scope: {
        greet: '=greeting'
      },
      template: '{{ greet }} world!<br /><input ng-model="greet" />'
    }
  });
})();
