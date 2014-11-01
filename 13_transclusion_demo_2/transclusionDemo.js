(function() {
  var module = angular.module('transclusionDemo', []);
  module.directive('myIf', function() {
    return {
      transclude: 'element',
      link: function myIfLink(scope, element, attrs, ctrl, transclude) {
        var transcluded = null, childScope = null;
        scope.$watch(attrs.myIf, function(shouldShow) {
          if(shouldShow) {
            transcluded = transclude(function(clone, innerScope) {
              childScope = innerScope;
            });
            element.after(transcluded);
          }
          else {
            if(transcluded) {
              childScope.$destroy();
              childScope = null;
              transcluded.remove();
              transcluded = null;
            }
          }
        });
      }
    };
  });
})();
