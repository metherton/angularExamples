(function() {
  var module = angular.module('app', ['ngMessages']);

  module.controller('AppCtrl', function($scope, $window) {

    $scope.submit = function() {
      $window.alert('Form submitted!');
    }
  });
})();
