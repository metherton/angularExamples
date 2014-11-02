(function() {
  var module = angular.module('app', []);

  module.filter('reverseString', function() {
    return function(str) {
      if(angular.isString(str)) {
        return str.split("").reverse().join("");
      }
      else {
        return str;
      }
    };
  });

  module.filter('slice', function() {
    return function(arr, beginIndex, endIndex) {
      if(angular.isArray(arr)) {
        if(!angular.isNumber(beginIndex)) {
          beginIndex = 0;
        }
        if(!angular.isNumber(endIndex)) {
          endIndex = arr.length;
        };
        return arr.slice(beginIndex, endIndex);
      }
      else {
        return arr;
      }
    };
  });

  module.controller('AppCtrl', function($scope) {
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
