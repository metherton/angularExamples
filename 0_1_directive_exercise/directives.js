(function() {
  var module = angular.module('directives', []);
  module.controller('directivesCtrl', function($scope) {
    $scope.message = 'rainbowdash';
  })

  //module.directive('...', function() { ... }
  module.directive('imdefinedaselement', function() {
    return {
      restrict: 'E',
      template: '<b>Hello element</b>' 
    };
  });
  module.directive('imdefinedasattribute', function() {
    return {
      restrict: 'A',
      template: '<b>Hello attribute</b>' 
    };
  });
  module.directive('imdefinedaseither', function() {
    return {
      restrict: 'AE',
      template: '<b>Hello as either</b>' 
    };
  });
  module.directive('iusetemplateurl', function() {
    return {
      restrict: 'A',
      templateUrl: 'externalTemplate.html' 
    };
  });
  module.directive('iuseanisolatescope', function() {
    return {
      scope: {},
      template: '{{{ message }}} vs {{{ $parent.message }}}' 
    };
  });

})();
