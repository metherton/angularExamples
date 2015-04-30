'use strict';

var sudokoApp = angular.module('sudokoApp', []);

sudokoApp.factory('Game', function() {

    var model;

    return {
        setModel: function(value) {
            model = value;
        },
        
        cell: function(key) {
            return model[key];
        }
    };
});