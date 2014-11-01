(function() {
  var module = angular.module('watcherTest', []);
  module.controller('watchCtrl', function($scope) {
    //.. some watcher maybe?
    $scope.$watch('message', function(newValue, oldValue) {
      console.log('message changed');
    });    

    setTimeout(function() { $scope.message = $scope.message + "!"; $scope.$apply();}, 3000);



    $scope.getMessage = function() {
    }
    $scope.getMessage();
  });
})();
