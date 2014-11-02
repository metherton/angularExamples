(function() {
  var module = angular.module('routingDemo', ['ngRoute']);

  module.config(function($routeProvider) {
    $routeProvider
      .when('/page1', {templateUrl: 'partials/page1.html'})
      .when('/page2', { templateUrl: 'partials/page2.html', controller: 'Page2Ctrl'})
      .otherwise({redirectTo: '/page1'});
  });

  module.controller('Page2Ctrl', function($scope) {
    $scope.message = "Hello from page 2!";
  });
})();
