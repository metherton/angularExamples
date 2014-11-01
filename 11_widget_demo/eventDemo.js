(function() {
  var module = angular.module('directivesDemo', []);
  module.controller('PageCtrl', function($scope, $window) {
    this.employees = [
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

    var nextEmployeeId = 5;

    this.newEmployee = {};

    this.addEmployee = function(newEmployee) {
        this.newEmployee.id = nextEmployeeId++;
        this.employees.push(newEmployee);
    };
  });

  module.directive('employeeList', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'employeeList.html',
      scope: {
        employees: '='
      }
    };

  });

  module.directive('addEmployeeForm', function() {
    return {
      restrict: 'E',
      replace: true,
      controller: function($scope) {
        $scope.newEmployee = {};
        $scope.submit = function() {
          if($scope.addEmployeeForm.$valid) {
            $scope.addEmployee($scope);
            $scope.newEmployee = {};
            $scope.addEmployeeForm.$setPristine();
          }
          else {
            $window.alert("Please enter valid values");
          }
        }
      },
      templateUrl: 'addEmployeeForm.html',
      scope: {
        addEmployee: '&'
      }
    }
  });
})();
