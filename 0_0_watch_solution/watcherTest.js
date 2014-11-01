(function() {
  var module = angular.module('watcherTest', []);
  module.controller('watchCtrl', function($scope) {
    $scope.$watch("message", function(newValue, oldValue) {
        console.log('message changed from "'+newValue+'" to "'+oldValue+'"');
    });

    $scope.getMessage = function() {
        setTimeout(function() {
            $scope.$apply(function() {
                $scope.message = 'Fetched after 3 seconds';
            });
        }, 2000);
    }
    $scope.getMessage();
  });
})();
