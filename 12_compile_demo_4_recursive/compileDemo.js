(function() {
  var module = angular.module('compileDemo', []);

  module.controller('PageCtrl', function($scope) {
    $scope.tree = {
      title: 'root',
      children: [{
        title: 'child1',
        children: [{
          title: 'child1\'s child1',
          children: []
        }, {
          title: 'child1\'s child2',
          children: []
        }
        ]
      }, {
        title: 'child2',
        children: []
      }
      ]
    };
  });

  // naive implementation - does not work
  module.directive('renderNodeNaive', function() {
    return {
      scope: {
        node: '=renderNodeNaive'
      },
      template: '<p>{{node.title}}</p><ul><li ng-repeat="child in node.children" render-node-naive="child"></li></ul>'
    };
  });

  // more correct implementation - breaks the recursion by using
  // $compile in the link function
  module.directive('renderNode', function($compile) {
    return {
      scope: {
        node: '=renderNode'
      },
      link: function renderNodeLink(scope, element, attrs) {
        var template = '<p>{{node.title}}</p><ul><li ng-repeat="child in node.children" render-node="child"></li></ul>';
        element.html(template);
        $compile(element.contents())(scope);
      }
    };
  });

  module.directive('recursive', function($compile) {
    return {
      restrict: 'E',
      replace: true,
      compile: function(cElement) {
        var children = cElement.contents();
        children.remove();
        var compiledContents;
        return function(scope, element) {
          if(!compiledContents) {
            compiledContents = $compile(children);
          }
          compiledContents(scope, function(clone) {
            element.append(clone);
          });
        }
      }
    }
  });

  module.directive('renderNodeRecursive', function() {
    return {
      scope: {
        node: '=renderNodeRecursive'
      },
      template: '<p>{{node.title}}</p>' +
        '<recursive><ul><li ng-repeat="child in node.children" ' +
        'render-node="child">' +
        '</li></ul></recursive>'
    };
  });
})();
