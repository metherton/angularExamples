(function() {
  var module = angular.module('directivesDemo', []);
  module.controller('PageCtrl', function($scope) {
    $scope.clicked = function() {
      alert('Clicked!');
    }
  });
  module.directive('myClick', function() {
    return function link(scope, element, attrs) {
      element.on('click', function() {
        scope.$apply(function() {
          scope.$eval(attrs.myClick);
        });
      });
    }
  });
})();
