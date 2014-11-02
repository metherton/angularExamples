(function() {
  var module = angular.module('app',[]);
  module.controller('DatabindingCtrl', function ($scope) {
    // A single todo item on scope
    $scope.comment = {
      id: 1,
      author: 'Bob',
      title: 'Learn AngularJS',
      content: 'Lorem ipsum dolor sit amet.'
    };
  });
})();
