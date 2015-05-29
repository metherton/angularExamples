(function() {
  var module = angular.module('communicationExercise', []);

  module.controller('SudokoCtrl', function($scope) {

      $scope.foo = {
          name: 'Martin',
          value: 'super'
      };

  });

  module.directive('accordion', function() {
    return {
      restrict: 'E',
      controller: function($scope) {
        var accordionController = this;

        var sections = $scope.sections = [];


        accordionController.addSection = function(sectionController) {
          sections.push(sectionController);
          sectionController.accordionController = accordionController;
          if(sections.length === 1) {
            sectionController.active = true;
          }
        };
        accordionController.activate = function(section) {
          sections.forEach(function(section) {
            section.active = false;
          });
          section.active = true;
        };
      },
      transclude: true,
      replace: true,
      scope: {},
      template: '<div class="accordion" ng-transclude></div>'
    };
  });

  module.directive('accordionSection', function() {
    return {
      controller: function() {
        var sectionController = this;
        this.activate = function() {
          sectionController.accordionController.activate(sectionController);
        }
      },
      controllerAs: 'controller',
      require: '^accordion',
      restrict: 'E',
      transclude: true,
      replace: true,
      scope: {
        title: '@'
      },
      template: '<section class="accordion-section">' +
        '<h3 ng-click="controller.activate()">{{title}}</h3>' +
        '<div class="accordion-content" ng-show="controller.active" ng-transclude></div>' +
        '</section>',
      link: function accordionSectionLink(scope, element, attrs, accordionCtrl) {
        accordionCtrl.addSection(scope.controller);
      }
    }
  });
})();
