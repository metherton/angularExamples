(function() {
  var module = angular.module('compileDemo', []);
  module.directive('myInclude', function($http, $compile, $templateCache, $log) {
    return {
        link: function myIncludeLink(scope, element, attrs) {
          var childScope1, childScope2;
          attrs.$observe('myInclude', function(templateUrl) {
            $http.get(templateUrl, {cache: $templateCache}).success(function(response) {
              if(childScope1) {
                childScope1.$destroy();
                childScope2.$destroy();
                element.contents().remove();
              }
              childScope1 = scope.$new();
              childScope2 = scope.$new();
              var combinedLinkerFn = $compile(response);
              combinedLinkerFn(childScope1, function(clone) {
                element.append(clone);
              });
              combinedLinkerFn(childScope2, function(clone) {
                element.append(clone);
              });
            });
          });
      }
    };
  });
})();
