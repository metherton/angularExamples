(function() {
var app = angular.module('app', []);
app.directive('dad', function () {
    return {
        restrict: 'EA',
        template: '<div class="dad">{{greeting}}{{name}}'+
        '<son></son>'+
        '</div>',
        link: function(scope,elem,attr){
            scope.name = 'Paul';
            scope.greeting = 'Hey, I am ';
        }
    };
});
app.directive('son', function () {
    return {
        restrict: 'EA',
        template: '<div class="son">{{sonSays}}</div>',
        link: function(scope,elem,attr){
            scope.sonSays = 'Hey, I am son, and my dad is '+ scope.name;
        }
    };
});
})()