    (function () {
  var module = angular.module('httpDemo', ['ngResource', 'ngRoute']);
  module.config(function ($routeProvider) {
    $routeProvider
      .when('/employees', {
        templateUrl: 'partials/employeeOverview.html',
        controller: 'EmployeeOverviewCtrl',
        resolve: {
          employees: function (employeeResource) {
            return employeeResource.query().$promise;
          }
        }})
      .when('/employees/:employeeId', {
        templateUrl: 'partials/employeeDetails.html',
        controller: 'EmployeeDetailsCtrl',
        resolve: {
          employee: function (employeeResource, $route) {
            return employeeResource.get({employeeId: $route.current.params.employeeId}).$promise;
          }
        }})
      .otherwise({redirectTo: '/employees'});
  });

  // $resource version

  module.factory('employeeResource', function($resource) {
    return $resource('/api/employees/:employeeId', {employeeId: '@id'});
  });

  module.controller('EmployeeOverviewCtrl', function($scope, employees, employeeResource, $route) {
    $scope.employees = employees;

    $scope.addEmployee = function() {
      employeeResource.save($scope.newEmployee).$promise.then($route.reload);
      $scope.newEmployee = {};
    };
  });

  module.controller('EmployeeDetailsCtrl', function($scope, employee) {
    $scope.employee = employee;
  });

  module.filter('employeeDetailsUrl', function() {
    return function(employee) {
      if(employee && employee.id) {
        return '#/employees/' + employee.id;
      }
      return '';
    }
  });

  module.run(function($rootScope, $log) {
    $rootScope.$on('$routeChangeStart', function(event, route){
      $log.info('$routeChangeStart');
      console.dir(event);
      console.dir(route);
    });
    $rootScope.$on('$routeChangeSuccess', function(event, route){
      $log.info('$routeChangeSuccess');
      console.dir(event);
      console.dir(route);
    });
  });
})();
