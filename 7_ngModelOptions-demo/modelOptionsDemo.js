(function() {
  var module = angular.module('app', []);
  module.controller('ModelOptionsCtrl', function ($scope) {
    var _myValue = "foo";
    $scope.myValue = function(val) {
      if(angular.isDefined(val)) {
        _myValue = val;
        return val;
      }
      return _myValue;
    };
  });
})();
