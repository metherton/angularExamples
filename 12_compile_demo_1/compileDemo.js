(function() {
  var module = angular.module('compileDemo', []);
  module.directive('myInclude', function($http, $compile, $templateCache, $log) {
    return {
      compile: function myIncludeCompile() {
        $log.info('compiling myInclude');
        return function myIncludeLink(scope, element, attrs) {
          $log.info('linking myInclude');
          $http.get(attrs.myInclude, {cache: $templateCache})
            .success(function(response) {
            $log.info('retrieved template');
            element.html(response);
            var childScope = scope.$new();
            $compile(element.contents())(childScope);
          });
        };
      }
    };
  });

  module.directive('log', function($log) {
    return {
      restrict: 'E',
      compile: function(element, attrs) {
        $log.info('compiling ' + attrs.log);
        return {
          pre: function(scope, element, attrs) {
            $log.info('pre-linking ' + attrs.log);
          },
          post: function(scope, element, attrs) {
            $log.info('post-linking ' + attrs.log);
          }
        }
      }
    };

  });
})();
