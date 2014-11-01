(function() {
  var module = angular.module('communicationExercise', []);

  module.directive('accordion', function() {
     return {
       controller: function($scope) {
          var sections = $scope.sections = [];
          $scope.select = function(section) {
              angular.forEach(sections, function(section) {
                section.selected = false;
              });
              section.selected = true;
          };

           this.addSection = function(section) {
             if (sections.length === 0) {
                $scope.select(section);
             }
             sections.push(section);
           };
       },
       restrict: 'E',
       template: '<div class="accordion" ng-transclude></div>'

     };
  });

    module.directive('accordionSection', function() {
        return {
                require: '^accordion',
                restrict: 'E',
                transclude: true,
                scope: {
                    title: '@'
                },
                link: function(scope, element, attrs, sectionCtrl) {
                    sectionCtrl.addSection(scope);
                },
                template: '<section class="accordion-section"><h3>{{title}}</h3><div class="accordion-content" ng-transclude></div></section>'
        };
    });


})();
