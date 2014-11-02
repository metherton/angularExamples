(function () {
  var module = angular.module('routingDemo', ['ngRoute']);

  module.config(function ($routeProvider) {
    $routeProvider
      .when('/page1', { templateUrl: 'static/partials/page1.html' })
      .when('/page2', { templateUrl: 'static/partials/page2.html', controller: 'Page2Ctrl' })
      .otherwise({redirectTo: '/page1'});
  });

  module.config(function ($locationProvider) {
    $locationProvider.html5Mode(true).hashPrefix("!");
  });

  module.controller('Page2Ctrl', function ($scope) {
    $scope.message = "Hello from page 2!";
  });
})();
