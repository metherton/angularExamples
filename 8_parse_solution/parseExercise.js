(function() {
  var module = angular.module('parseExercise', []);
  module.controller('PageCtrl', function($scope) {
    $scope.onMousemove = function(x, y) {
      $scope.x = x;
      $scope.y = y;
    }
  });
  module.directive('myMousemove', function($parse) {
    return function (scope, element, attrs) {
      element.on('mousemove', function(event) {
        var fn = $parse(attrs.myMousemove);
        scope.$apply(function() {
          fn(scope, { x: event.pageX, y: event.pageY });
        });
      });
    }
  });

  module.directive('myOpen', function($parse) {
    return {
      link: function myOpenLink(scope, element, attrs) {
        var expr = $parse(attrs.myOpen);
        scope.$watch(expr, function(value) {
          attrs.$set('open', !!value);
        });
        element.on('click', function() {
          scope.$apply(function() {
            expr.assign(scope, element.attr('open') === undefined);
          });
        })
      }
    }
  });

  // The directive below, which uses $watch to monitor the DOM
  // will not work correctly.
  // The reason is that the $watcher is not fired when the DOM changes -
  // The DOM change will not cause a $digest cycle.
  module.directive('myOpen2', function($parse) {
    return {
      compile: function(element, attrs) {
        var expr = $parse(attrs.myOpen2);
        return function myOpenLink(scope, element, attrs) {
          scope.$watch(expr, function(value) {
            attrs.$set('open', !!value);
          });
          scope.$watch(function() {
            return !!element.attr('open');
          }, function(value) {
            expr.assign(scope, value);
          });
        }
      }
    }
  });
})();
