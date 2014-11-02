(function() {
  var module = angular.module('app', []);
  module.controller('EventDemoCtrl', function ($scope, $window) {
    $scope.employees = [
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

    $scope.newEmployee = {};

    $scope.addEmployee = function() {
      if($scope.addEmployeeForm.$valid) {
        $scope.newEmployee.id = nextEmployeeId++;
        $scope.employees.push($scope.newEmployee);
        $scope.newEmployee = {};
        $scope.addEmployeeForm.$setPristine();
      }
      else {
        $window.alert("Please enter valid values");
      }
    };
  });
})();