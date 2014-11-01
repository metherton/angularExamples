(function() {
  var module = angular.module('directivesDemo', []);
  module.controller('PageCtrl', function($scope) {
    $scope.clicked = function(event) {
      alert('Clicked ( ' + event.clientX + ', ' + event.clientY + ')');
    }
  });

  module.directive('myClick', function($parse) {
    return function link(scope, element, attrs) {
      element.on('click', function(event) {
        var fn = $parse(attrs.myClick);
        scope.$apply(function() {
          fn(scope, {$event: event});
        });
      });
    }
  });
})();
