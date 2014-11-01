(function() {
  var module = angular.module('directivesDemo', []);
  module.directive('myShow', function() {
    return {
      link: function(scope, element, attrs) {
        scope.$watch(attrs.myShow, function (value){
          if(value) {
            element.css('display', '');
          }
          else {
            element.css('display', 'none');
          }
        });
      }
    };
  });

  module.directive('clickAlert', function() {
    return function link(scope, element, attrs) {
      element.on('click', function() {
        alert(attrs.clickAlert);
      });
    }
  });
})();
