(function() {
  var module = angular.module('directivesDemo', []);
  module.directive('isolated', function() {
    return {
      scope: {
        attr: '@attribute',
        expr: '&expression',
        twoway: '='
      },
      template: '<dl><dt>attr:</dt>' +
        '<dd>{{ attr }}</dd>' +
        '<dt>expr:</dt>' +
        '<dd>{{ expr() }}</dd>' +
        '<dt>twoway:</dt>' +
        '<dd><input ng-model="twoway"></dd>' +
        '</dl>'
    }
  });

  // the directive below does the same as the 'isolated' directive above,
  // but set up the bindings manually
  module.directive('isolated2', function($parse) {
    return {
      scope: {},
      template: '<dl><dt>attr:</dt>' +
        '<dd>{{ attr }}</dd>' +
        '<dt>expr:</dt>' +
        '<dd>{{ expr() }}</dd>' +
        '<dt>twoway:</dt>' +
        '<dd><input ng-model="twoway"></dd>' +
        '</dl>',
      link: function(scope, element, attrs) {
        // setup the attribute binding specified by attr: '@attribute'
        attrs.$observe('attribute', function(value) {
          scope.attr = value;
        });

        // setup the expression binding specified by expr: '&expression'
        var expr = $parse(attrs.expression);
        scope.expr = function(locals) {
          return expr(scope.$parent, locals);
        }

        // setup the two-way binding specified by twoway: '='
        var twowayExpr = $parse(attrs.twoway);

        // propagate change from isolate to parent scope
        scope.$watch('twoway', function(newValue) {
          twowayExpr.assign(scope.$parent, newValue);
        });

        // propagate change from parent to isolate
        scope.$parent.$watch(twowayExpr, function(newValue) {
          scope.twoway = newValue;
        });

      }
    }
  });
})();
