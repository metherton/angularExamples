(function() {
  var module = angular.module('app', []);
  module.controller('AppCtrl', function ($scope) {
    $scope.employees = [
      {id: 0,
        name: 'Mary',
        age: 65,
        job: 'Secretary'},
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
      {id: 5,
        name: 'Tom',
        age: 32,
        job: 'Developer'},
      {id: 4,
        name: 'Leonora',
        age: 51,
        job: 'Developer'},
      {id: 6,
        name: 'Dave',
        age: 32,
        job: 'CEO'}
    ];

  });
})();
