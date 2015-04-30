(function() {
  var module = angular.module('directives', []);
  module.controller('directivesCtrl', function($scope) {
    $scope.message = 'rainbowdash';
  })

  module.directive('imdefinedaselement', function() {
    return {
      restrict: 'E',
      template: '<p>Hello element definition!</p>'
    };
  });
  module.directive('imdefinedasattribute', function() {
    return {
      restrict: 'A',
     // replace: 'true',
      template: '<p>Hello attribute definition!</p>'
    };
  });
  module.directive('imdefinedaseither', function() {
    return {
      restrict: 'EA',
      template: '<p>Hello defined as either!</p>'
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
      template: '<p>({{ message }}) vs ({{ $parent.message }})</p>'
    };
  });

})();