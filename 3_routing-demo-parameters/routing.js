(function() {
  var module = angular.module('routingDemo', ['ngRoute']);

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

  module.factory('employeeService', function($window) {
    var employees = [
      {id: 1,
      name: 'Alice',
      age: 27,
      job: 'Developer'},
      {id: 2,
        name: 'Bob',
        age: 56,
        job: 'Secretary'},
      {id: 3,
        name: 'Charlie',
        age: 21,
        job: 'Janitor'},
      {id: 4,
        name: 'Dave',
        age: 32,
        job: 'CEO'}

    ];
    return {
      getEmployees: function( ){ return employees;} ,
      getEmployee: function(id) {
        id = $window.parseInt(id);
        for(var i = 0; i < employees.length; ++i) {
          if(employees[i].id === id) {
            return employees[i];
          }
        }
      }
    };
  });

  module.filter('employeeDetailsUrl', function() {
    return function(employee) {
      if(employee && employee.id) {
        return '#/employees/' + employee.id;
      }
      return '';
    }
  });

  module.controller('EmployeeOverviewCtrl', function($scope, employeeService) {
    $scope.employees = employeeService.getEmployees();
  });

  module.controller('EmployeeDetailsCtrl', function($scope, employeeService, $routeParams) {
    $scope.employee = employeeService.getEmployee($routeParams.employeeId);
  });
})();
