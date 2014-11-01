(function() {
  var module = angular.module('transclusionDemo', ['ngAnimate']);
  module.directive('myIf', function($animate) {
    return {
      transclude: 'element',
      link: function myIfLink(scope, element, attrs, ctrl, transclude) {
        var transcluded = null, childScope = null;
        scope.$watch(attrs.myIf, function(shouldShow) {
          if(shouldShow) {
            transcluded = transclude(function(clone, innerScope) {
              childScope = innerScope;
            });
            $animate.enter(transcluded, element.parent(), element);
          }
          else {
            if(transcluded) {
              childScope.$destroy();
              childScope = null;
              $animate.leave(transcluded);
              transcluded = null;
            }
          }
        });
      }
    };
  });
})();
