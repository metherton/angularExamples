(function() {
  var module = angular.module('app', ['ngMessages']);

  module.controller('AppCtrl', function($scope, $window) {
    $scope.submitAttempted = false;

    $scope.submit = function() {
      $scope.submitAttempted = true;
      if($scope.myForm.$valid) {
        $window.alert('Form submitted!');
      }
    }
  });
})();
