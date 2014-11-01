(function() {
  var module = angular.module('compileDemo', []);
  module.directive('myInclude', function($http, $compile, $templateCache, $log) {
    return {
        link: function myIncludeLink(scope, element, attrs) {
          var childScope;
          attrs.$observe('myInclude', function(templateUrl) {
            $http.get(templateUrl, {cache: $templateCache}).success(function(response) {
              if(childScope) {
                childScope.$destroy();
                element.contents().remove();
              }
              element.html(response);
              childScope = scope.$new();
              $compile(element.contents())(childScope);
            });
          });
      }
    };
  });
})();
