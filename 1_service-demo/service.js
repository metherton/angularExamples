(function() {
  var module = angular.module('serviceDemo', []);
  module.controller('ServiceDemoCtrl', function($scope, alertService, alertService2, alertService3) {
    $scope.showAlert = function() {
      alertService.showAlert($scope.message);
    };
    $scope.showAlert2 = function() {
      alertService2.showAlert($scope.message);
    };
    $scope.showAlert3 = function() {
      alertService3.showAlert($scope.message);
    };
  });

  module.factory('alertService', function ($window) {
    return {
      showAlert: function(msg) {
        $window.alert(msg);
      }
    };
  });

  module.service('alertService2', function($window) {
    this.showAlert = function(msg) {
      $window.alert(msg);
    }
  });

  module.provider('alertService3', function() {
    var self = this;
    self.prefix='Message: ';
    self.$get = function(alertService) {
      return {
        showAlert: function(msg) {
          alertService.showAlert(self.prefix + msg);
        }
      };
    };
  });

  module.config(function(alertService3Provider) {
    alertService2Provider.prefix = 'Error message: ';
  });
})();
