(function() {
  var module = angular.module('parseExercise', []);
  module.controller('PageCtrl', function($scope) {
    $scope.onMousemove = function(x, y) {
      $scope.x = x;
      $scope.y = y;
    }
  });

  module.directive('myMousemove', function($parse) {
    return function link(scope, element, attrs) {
      element.on('mousemove', function(event) {
         var fn = $parse(attrs.myMousemove);
         scope.$apply(function () {
           fn(scope, { x: event.pageX, y: event.pageY});
         });       
      });
    }
  });

  module.directive('myOpen', function($parse) {
    return function link(scope, element, attrs) {
      var expr = $parse(attrs.myOpen);
      scope.$watch(expr, function(value) {
        attrs.$set('open', !!value);
      });
      element.on('click', function(event) {
        scope.$apply(function() {
          expr.assign(scope, element.attr('open') === undefined);
        });
      });
    }
  });

})();
