(function() {
  var module = angular.module('compileDemo', []);
  module.directive('renderTemplate', function($compile) {
    return {
        link: function renderTemplateLink(scope, element, attrs) {
            var childScope;
            scope.$watch(attrs.renderTemplate, function(template) {
                if(childScope) {
                    childScope.$destroy();
                    element.children().remove();
                    childScope = null;
                }
                if(template) {
                    var linker = $compile(template);
                    childScope = scope.$new();
                    linker(childScope, function(clone) {
                        element.append(clone);
                    });
                }
            });
        }
    }
  });

})();
