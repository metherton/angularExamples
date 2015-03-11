(function() {
    var module = angular.module('directivesDemo', []);

    module.directive('myOpen', function() {
        return function myOpenLink(scope, elm, attrs) {
            scope.$watch(attrs.myOpen, function(value) {
                attrs.$set('open', !!value);
            });
        }
    });

    module.directive('toggleClass', function() {
        return {
            link: function(scope, elm, attrs) {
                elm.on('click', function() {
                    if(elm.hasClass(attrs.toggleClass)) {
                        attrs.$removeClass(attrs.toggleClass);
                    }
                    else {
                        attrs.$addClass(attrs.toggleClass);
                    }
                });
            }
        }
    });

    // the controller below creates an array variable 'classes' on the scope,
    // and add two elements 'a' and 'b' to it.
    module.controller('AppCtrl', function($scope){
        $scope.classes = ['a', 'b'];
        $scope.addClass = function() {
            $scope.classes.push($scope.newClass);
        }
    });

    module.directive('myClass', function() {
        return function myClassLink(scope, elm, attr) {
            // or use scope.$watchCollection(attr.myClass, function(newClasses, oldClasses) {  ...and u do not need the true at end

            scope.$watch(attr.myClass, function(newClasses, oldClasses) {
                console.log(newClasses, oldClasses);
                if(angular.isArray(oldClasses)) {
                    oldClasses.forEach(function(oldClass) {
                        elm.removeClass(oldClass);
                    });
                }
                if(angular.isArray(newClasses)) {
                    newClasses.forEach(function(newClass) {
                        elm.addClass(newClass);
                    });
                }
            }, true);
        }
    });


})();
