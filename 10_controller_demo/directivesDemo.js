(function() {
  var module = angular.module('directivesDemo', []);
  module.directive('counter', function() {
    return {
      controller: function($scope, $attrs) {

        // Publish the controller API on $scope
        if($attrs.counter) {
          $scope[$attrs.counter] = this;
        }
        $scope.count = 0;

        // increment and decrement functions are
        // the API of the controller
        this.increment = function() {
          $scope.count++;
        };
        this.decrement = function() {
          $scope.count--;
        }
      },
      template: '{{count}}'
    }
  });
})();
