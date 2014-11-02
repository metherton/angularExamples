(function() {
  var module = angular.module('httpDemo', ['ngResource', 'ngRoute']);
  module.config(function($routeProvider) {
    $routeProvider
      .when('/employees', {
        templateUrl: 'partials/employeeOverview.html',
        controller: 'EmployeeOverviewCtrl'})
      .when('/employees/:employeeId', {
        templateUrl: 'partials/employeeDetails.html',
        controller: 'EmployeeDetailsCtrl'})
      .otherwise({redirectTo: '/employees'});
  });

  // $http version

  module.controller('EmployeeOverviewCtrl', function($scope, $http, $route) {
    // populate scope with employees
    $http.get('/api/employees').success(function(employees) {
      $scope.employees = employees;
    });

    $scope.addEmployee = function() {
      $http.post('/api/employees', $scope.newEmployee).then($route.reload);
    };
  });

  module.controller('EmployeeDetailsCtrl', function($scope, $http, $routeParams) {
    $http.get('/api/employees/' + $routeParams.employeeId).success(function(employee) {
      $scope.employee = employee;
    });
  });

  // $resource version

  module.factory('employeeResource', function($resource) {
    return $resource('/api/employees/:employeeId', {employeeId: '@id'});
  });

  module.controller('EmployeeOverviewCtrlResource', function($scope, employeeResource, $route) {
    $scope.employees = employeeResource.query();

    $scope.addEmployee = function() {
      employeeResource.save($scope.newEmployee).$promise.then($route.reload);
      $scope.newEmployee = {};
    };
  });

  module.controller('EmployeeDetailsCtrlResource', function($scope, employeeResource, $routeParams) {
    $scope.employee = employeeResource.get({employeeId: $routeParams.employeeId});
  });

  module.filter('employeeDetailsUrl', function() {
    return function(employee) {
      if(employee && employee.id) {
        return '#/employees/' + employee.id;
      }
      return '';
    }
  });
})();
