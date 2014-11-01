(function() {
  var module = angular.module('directivesDemo', []);

  module.directive('myOpen', function() {
     return {
       link: function(scope, element, attrs) {
          scope.$watch(attrs.myOpen, function(value) {
             if (value) {
               attrs.$set('open',true); 
             } else {
               attrs.$set('open',false);
             }
          });
       }
     };
  });

  module.directive('myClass', function() {
     return {
       link: function(scope, element, attrs) {
         scope.$watch('classes', function(value) {
console.log('watch entered');
           var newClass = scope.classes[scope.classes.length - 1];
           attrs.$set('classes',newClass);            
         },true);
       }
    }; 
  });

  // the controller below creates an array variable 'classes' on the scope,
  // and add two elements 'a' and 'b' to it.
  module.controller('AppCtrl', function($scope){
    $scope.classes = ['a', 'b'];
    $scope.addClass = function() {
      $scope.classes.push($scope.newClass);
    }
  });


})();
