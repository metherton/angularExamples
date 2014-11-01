(function() {
  var module = angular.module('transclusionDemo', []);
  module.controller('PageCtrl', function($scope) {
    $scope.propertyOnPageScope = 'foo';
  });

  module.directive('divWrapper', function() {
    return {
      transclude: true,
      template: '<div class="div-wrapper" ng-transclude></div>'
    }
  });

  module.directive('collapsable', function() {
    return {
      restrict: 'E',
      controller: function($scope) {
        $scope.expanded = false;
        $scope.toggleExpanded = function() {
          $scope.expanded = !$scope.expanded;
        }
      },
      scope: {},
      transclude: true,
      replace: true,
      template: '<div class="collapsable">' +
        '<div class="collapsable-header" ng-class="{expanded: expanded}" ng-click="toggleExpanded()"></div>' +
        '<div class="collapsable-content" ng-show="expanded" ng-transclude></div>' +
        '</div>'
    };
  });

  module.directive('manualCollapsable', function($compile) {
    return {
      restrict: 'E',
      controller: function($scope) {
        $scope.expanded = false;
        $scope.toggleExpanded = function() {
          $scope.expanded = !$scope.expanded;
        }
      },
      scope: {},
      replace: true,
      compile: function(cElement) {
        // remove the transcluded from the element,
        // since it needs to be reinserted in the appropriate place
        var children = cElement.contents();
        children.remove();
        // compile the transcluded content
        var compiledContents = $compile(children);
        // this is the template, we want it to expand into
        var template = '<div class="collapsable">' +
          '<div class="collapsable-header" ng-class="{expanded: expanded}" ng-click="toggleExpanded()"></div>' +
          '<div class="collapsable-content" ng-show="expanded"></div>' +
          '</div>';
        // we need to compile the template too
        var templateLinkerFn = $compile(template);
        return function(scope, element) {
          // the template should be bound to the isolate scope
          templateLinkerFn(scope, function(clone) {
            element.append(clone);
          });
          // the transcluded content should be bound to (a child of) the outer scope
          var childScope = scope.$parent.$new();
          compiledContents(childScope, function(clone) {
            // append the transcluded content to the appropriate element
            angular.element(element[0].getElementsByClassName('collapsable-content')[0]).append(clone);
          });
        }
      }
    }
  });
})();
