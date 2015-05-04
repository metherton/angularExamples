'use strict';

var sudokoApp = angular.module('sudokoApp', [])
    .constant('_', window._)
    .run(function ($rootScope) {
        $rootScope._ = window._;
    });

sudokoApp.factory('GameModel', function() {
// easy
//  var model = {
//        a2: '4',
//        a5: '8',
//        a7: '2',
//        b3: '8',
//        b4: '2',
//        b5: '6',
//        b8: '9',
//        c1: '7',
//        c6: '4',
//        c9: '3',
//        d2: '3',
//        d6: '2',
//        d9: '4',
//        e1: '1',
//        e5: '7',
//        e7: '5',
//        f3: '6',
//        f4: '5',
//        f8: '3',
//        g1: '9',
//        g4: '8',
//        g7: '1',
//        g8: '4',
//        h2: '6',
//        h6: '5',
//        h7: '9',
//        i1: '4',
//        i3: '7',
//        i5: '1',
//        i9: '5'
//    };

    var model = {
        a1: '8',
        a4: '2',
        b1: '1',
        b2: '2',
        b5: '3',
        b7: '9',
        c2: '9',
        c4: '7',
        c7: '1',
        d1: '4',
        d8: '8',
        d9: '1',
        e5: '7',
        e7: '4',
        f2: '6',
        f5: '8',
        f6: '5',
        f9: '2',
        g2: '1',
        g7: '2',
        h3: '4',
        h6: '7',
        i1: '3',
        i4: '1',
        i5: '9'
    };

    return {
        get: function() {
            return model;
        },
        set: function(newCell) {
            model[newCell.key] = newCell.value;
        }
    }

});

sudokoApp.factory('Game', function(GameModel, _) {

   var self = this;

   function columnCandidates(key) {
        var fullSetOfColumnValues = ['a','b','c','d','e','f','g','h','i'];
        var column = key.charAt(1);
        var columnValues = _.map(fullSetOfColumnValues, function(cell) {
            return GameModel.get()[cell + column];
        });
        return _.difference(['1','2', '3','4', '5','6','7','8','9'], columnValues);
    }

    function rowCandidates(key) {
        var fullSetOfRowValues = ['1','2','3','4','5','6','7','8','9'];
        var row = key.charAt(0);
        var rowValues = _.map(fullSetOfRowValues, function(cell) {
            return GameModel.get()[row + cell];
        });
        return _.difference(['1','2', '3','4', '5','6','7','8','9'], rowValues);
    }

    function squareCandidates(key) {
        var topSquareRows = ['a', 'b', 'c'];
        var middleSquareRows = ['d', 'e', 'f'];
        var bottomSquareRows = ['g', 'h', 'i'];
        var leftSquareColumns = ['1', '2', '3'];
        var middleSquareColumns = ['4', '5', '6'];
        var rightSquareColumns = ['7', '8', '9'];

        var squares = {
            '1': {
                cells: ['a1', 'a2', 'a3', 'b1', 'b2', 'b3', 'c1', 'c2', 'c3'],
                rows: topSquareRows,
                columns: leftSquareColumns
            },
            '2': {
                cells: ['a4', 'a5', 'a6', 'b4', 'b5', 'b6', 'c4', 'c5', 'c6'],
                rows: topSquareRows,
                columns: middleSquareColumns
            },
            '3': {
                cells: ['a7', 'a8', 'a9', 'b7', 'b8', 'b9', 'c7', 'c8', 'c9'],
                rows: topSquareRows,
                columns: rightSquareColumns
            },
            '4': {
                cells: ['d1', 'd2', 'd3', 'e1', 'e2', 'e3', 'f1', 'f2', 'f3'],
                rows: middleSquareRows,
                columns: leftSquareColumns
            },
            '5': {
                cells: ['d4', 'd5', 'd6', 'e4', 'e5', 'e6', 'f4', 'f5', 'f6'],
                rows: middleSquareRows,
                columns: middleSquareColumns
            },
            '6': {
                cells: ['d7', 'd8', 'd9', 'e7', 'e8', 'e9', 'f7', 'f8', 'f9'],
                rows: middleSquareRows,
                columns: rightSquareColumns
            },
            '7': {
                cells: ['g1', 'g2', 'g3', 'h1', 'h2', 'h3', 'i1', 'i2', 'i3'],
                rows: bottomSquareRows,
                columns: leftSquareColumns
            },
            '8': {
                cells: ['g4', 'g5', 'g6', 'h4', 'h5', 'h6', 'i4', 'i5', 'i6'],
                rows: bottomSquareRows,
                columns: middleSquareColumns
            },
            '9': {
                cells: ['g7', 'g8', 'g9', 'h7', 'h8', 'h9', 'i7', 'i8', 'i9'],
                rows: bottomSquareRows,
                columns: rightSquareColumns
            }
        };

        var squareIndex = _.findKey(squares, function(square) {
            return _.includes(square.cells, key);
        });

        var rowValues = _.map(squares[squareIndex].cells, function(cell) {
            return GameModel.get()[cell];
        });

        return _.difference(['1','2', '3','4', '5','6','7','8','9'], rowValues);
    }

    function candidatesFor(key) {
        var columnUnusedValues = columnCandidates(key);
        var rowUnusedValues = rowCandidates(key);
        var squareUnusedValues = squareCandidates(key);
        return _.intersection(columnUnusedValues, rowUnusedValues, squareUnusedValues);
    }

   return {
       set: function(newCell) {
           GameModel.set(newCell);
       },
       get: function() {
           return GameModel.get();
       },
        cell: function(key) {
            return GameModel.get()[key];
        },
       columnCandidates: function(key) {
           return columnCandidates(key);
       },
        rowCandidates: function(key) {
            return rowCandidates(key);
        },
       squareCandidates: function(key) {
           return squareCandidates(key);
       },
       candidatesFor: function(key) {
           return candidatesFor(key);
       },
       bestCandidate: function() {
           var nextCandidates = {
               1: {},
               2: {},
               3: {},
               4: {},
               5: {},
               6: {},
               7: {},
               8: {},
               9: {}
           };
           var rowCandidates = {
              a: {},
              b: {},
               c: {},
               d: {},
               e: {},
               f: {},
               g: {},
               h: {},
               i: {}
           };
           var columnCandidates = {
               1: {},
               2: {},
               3: {},
               4: {},
               5: {},
               6: {},
               7: {},
               8: {},
               9: {}
           };
           var squareCellCandidates = {
               1: {},
               2: {},
               3: {},
               4: {},
               5: {},
               6: {},
               7: {},
               8: {},
               9: {}
           };


           function convertKeyToSquare(key) {
               if (_.includes(['a1', 'a2', 'a3', 'b1', 'b2', 'b3', 'c1', 'c2', 'c3'], key)) {
                   return '1';
               } else if (_.includes(['a4', 'a5', 'a6', 'b4', 'b5', 'b6', 'c4', 'c5', 'c6'], key)) {
                   return '2';
               }  else if (_.includes(['a7', 'a8', 'a9', 'b7', 'b8', 'b9', 'c7', 'c8', 'c9'], key)) {
                   return '3';
               } else if (_.includes(['d1', 'd2', 'd3', 'e1', 'e2', 'e3', 'f1', 'f2', 'f3'], key)) {
                   return '4';
               }  else if (_.includes(['d4', 'd5', 'd6', 'e4', 'e5', 'e6', 'f4', 'f5', 'f6'], key)) {
                   return '5';
               }else if (_.includes(['d7', 'd8', 'd9', 'e7', 'e8', 'e9', 'f7', 'f8', 'f9'], key)) {
                   return '6';
               }  else if (_.includes(['g1', 'g2', 'g3', 'h1', 'h2', 'h3', 'i1', 'i2', 'i3'], key)) {
                   return '7';
               } else if (_.includes(['g4', 'g5', 'g6', 'h4', 'h5', 'h6', 'i4', 'i5', 'i6'], key)) {
                   return '8';
               }  else if (_.includes(['g7', 'g8', 'g9', 'h7', 'h8', 'h9', 'i7', 'i8', 'i9'], key)) {
                   return '9';
               }
           }

           var candidate = {};
           ['a','b','c','d','e','f','g','h','i'].forEach(function(row) {
               ['1','2','3','4','5','6','7','8','9'].forEach(function(col) {
                   var key = row + col;
                   if (GameModel.get()[key] !== '' && GameModel.get()[key] !== undefined) {
                       return candidate;
                   }
                   var candidatesForCell = candidatesFor(key);
                   nextCandidates[candidatesForCell.length][key] = candidatesForCell;
                   rowCandidates[row][col] = candidatesForCell;
                   columnCandidates[col][row] = candidatesForCell;
                   squareCellCandidates[convertKeyToSquare(key)][key] = candidatesForCell;
                   console.log('next cand', nextCandidates);
                    if (angular.isDefined(nextCandidates['1']))     {
                        for (var cell in nextCandidates['1']) {
                            candidate.key = cell;
                            candidate.value = _.first(nextCandidates['1'][cell]);
                            break;
                        }
                    } else {

                    }
               })
           });
            return candidate;
       }
    };
});

sudokoApp.directive('sudoko', function(Game, $rootScope, _) {

    function getTemplate() {
        return '<div class="container-fluid">' +
            '<div class="jumbotron">' +

            '<div class="row"><div class="col-xs-1">&nbsp;</div><div class="col-xs-1"><div class="input-group">1</div></div><div class="col-xs-1"><div class="input-group">2</div></div>' +
            '<div class="col-xs-1">' +
            '<div class="input-group">3</div>' +
            '</div>' +
            '<div class="col-xs-1">' +
            '<div class="input-group">4</div>' +
            '</div>' +
            '<div class="col-xs-1">' +
            '<div class="input-group">5</div>' +
            '</div>' +
            '<div class="col-xs-1">' +
            '<div class="input-group" >6</div>' +
            '</div>' +
            '<div class="col-xs-1">' +
            '<div class="input-group">7</div>' +
            '</div>' +
            '<div class="col-xs-1">' +
            '<div class="input-group">8</div>' +
            '</div>' +
            '<div class="col-xs-1">' +
            '<div class="input-group">9</div>' +
            '</div>' +
            '</div>' +
            '<div class="row">' +
            '<div class="col-xs-1">A</div>' +
            '<div class="col-xs-1">' +
            '<div class="input-group">' +
            '<input ng-model="model.a1" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1">' +
            '<div class="input-group">' +
            '<input ng-model="model.a2" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1" style="border-right-style: solid;border-right-width: thin">' +
            '<div class="input-group">' +
            '<input ng-model="model.a3" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1">' +
            '<div class="input-group">' +
            '<input ng-model="model.a4" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1">' +
            '<div class="input-group">' +
            '<input ng-model="model.a5" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1" style="border-right-style: solid;border-right-width: thin">' +
            '<div class="input-group">' +
            '<input ng-model="model.a6" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1">' +
            '<div class="input-group">' +
            '<input ng-model="model.a7" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1">' +
            '<div class="input-group">' +
            '<input ng-model="model.a8" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1">' +
            '<div class="input-group">' +
            '<input ng-model="model.a9" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="row">' +
            '<div class="col-xs-1">B</div>' +
            '<div class="col-xs-1">' +
            '<div class="input-group">' +
            '<input ng-model="model.b1" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1">' +
            '<div class="input-group">' +
            '<input ng-model="model.b2" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1" style="border-right-style: solid;border-right-width: thin">' +
            '<div class="input-group">' +
            '<input ng-model="model.b3" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1">' +
            '<div class="input-group">' +
            '<input ng-model="model.b4" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1">' +
            '<div class="input-group">' +
            '<input ng-model="model.b5" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1" style="border-right-style: solid;border-right-width: thin">' +
            '<div class="input-group">' +
            '<input ng-model="model.b6" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1">' +
            '<div class="input-group">' +
            '<input ng-model="model.b7" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1">' +
            '<div class="input-group">' +
            '<input ng-model="model.b8" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1">' +
            '<div class="input-group">' +
            '<input ng-model="model.b9" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="row" >' +
            '<div class="col-xs-1">C</div>' +
            '<div class="col-xs-1"  style="border-bottom-style: solid;border-bottom-width: thin">' +
            '<div class="input-group">' +
            '<input ng-model="model.c1" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1"  style="border-bottom-style: solid;border-bottom-width: thin">' +
            '<div class="input-group">' +
            '<input ng-model="model.c2" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1"  style="border-right-style: solid;border-right-width: thin;border-bottom-style: solid;border-bottom-width: thin">' +
            '<div class="input-group">' +
            '<input ng-model="model.c3" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1"  style="border-bottom-style: solid;border-bottom-width: thin">' +
            '<div class="input-group">' +
            '<input ng-model="model.c4" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1"  style="border-bottom-style: solid;border-bottom-width: thin">' +
            '<div class="input-group">' +
            '<input ng-model="model.c5" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1"  style="border-bottom-style: solid;border-bottom-width: thin;border-right-style: solid;border-right-width: thin">' +
            '<div class="input-group">' +
            '<input ng-model="model.c6" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1" style="border-bottom-style: solid;border-bottom-width: thin">' +
            '<div class="input-group">' +
            '<input ng-model="model.c7" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1" style="border-bottom-style: solid;border-bottom-width: thin">' +
            '<div class="input-group">' +
            '<input ng-model="model.c8" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1" style="border-bottom-style: solid;border-bottom-width: thin">' +
            '<div class="input-group">' +
            '<input ng-model="model.c9" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="row">' +
            '<div class="col-xs-1">D</div>' +
            '<div class="col-xs-1">' +
            '<div class="input-group">' +
            '<input ng-model="model.d1" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1">' +
            '<div class="input-group">' +
            '<input ng-model="model.d2" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1" style="border-right-style: solid;border-right-width: thin">' +
            '<div class="input-group">' +
            '<input ng-model="model.d3" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1">' +
            '<div class="input-group">' +
            '<input ng-model="model.d4" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1">' +
            '<div class="input-group">' +
            '<input ng-model="model.d5" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1" style="border-right-style: solid;border-right-width: thin">' +
            '<div class="input-group">' +
            '<input ng-model="model.d6" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1">' +
            '<div class="input-group">' +
            '<input ng-model="model.d7" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1">' +
            '<div class="input-group">' +
            '<input ng-model="model.d8" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1">' +
            '<div class="input-group">' +
            '<input ng-model="model.d9" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="row">' +
            '<div class="col-xs-1">E</div>' +
            '<div class="col-xs-1">' +
            '<div class="input-group">' +
            '<input ng-model="model.e1" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1">' +
            '<div class="input-group">' +
            '<input ng-model="model.e2" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1" style="border-right-style: solid;border-right-width: thin" >' +
            '<div class="input-group">' +
            '<input ng-model="model.e3" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1">' +
            '<div class="input-group">' +
            '<input ng-model="model.e4" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1">' +
            '<div class="input-group">' +
            '<input ng-model="model.e5" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1" style="border-right-style: solid;border-right-width: thin">' +
            '<div class="input-group">' +
            '<input ng-model="model.e6" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1">' +
            '<div class="input-group">' +
            '<input ng-model="model.e7" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1">' +
            '<div class="input-group">' +
            '<input ng-model="model.e8" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1">' +
            '<div class="input-group">' +
            '<input ng-model="model.e9" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="row"><div class="col-xs-1">F</div><div class="col-xs-1" style="border-bottom-style: solid;border-bottom-width: thin"><div class="input-group">' +
            '<input ng-model="model.f1" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1" style="border-bottom-style: solid;border-bottom-width: thin">' +
            '<div class="input-group">' +
            '<input ng-model="model.f2" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1" style="border-bottom-style: solid;border-bottom-width: thin;border-right-style: solid;border-right-width: thin">' +
            '<div class="input-group">' +
            '<input ng-model="model.f3" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1" style="border-bottom-style: solid;border-bottom-width: thin">' +
            '<div class="input-group">' +
            '<input ng-model="model.f4" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1" style="border-bottom-style: solid;border-bottom-width: thin">' +
            '<div class="input-group">' +
            '<input ng-model="model.f5" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1"  style="border-bottom-style: solid;border-bottom-width: thin;border-right-style: solid;border-right-width: thin">' +
            '<div class="input-group">' +
            '<input ng-model="model.f6" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1" style="border-bottom-style: solid;border-bottom-width: thin">' +
            '<div class="input-group">' +
            '<input ng-model="model.f7" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1" style="border-bottom-style: solid;border-bottom-width: thin">' +
            '<div class="input-group">' +
            '<input ng-model="model.f8" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1" style="border-bottom-style: solid;border-bottom-width: thin">' +
            '<div class="input-group">' +
            '<input ng-model="model.f9" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="row">' +
            '<div class="col-xs-1">G</div>' +
            '<div class="col-xs-1">' +
            '<div class="input-group">' +
            '<input ng-model="model.g1" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1">' +
            '<div class="input-group">' +
            '<input ng-model="model.g2" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1" style="border-right-style: solid;border-right-width: thin">' +
            '<div class="input-group">' +
            '<input ng-model="model.g3" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1">' +
            '<div class="input-group">' +
            '<input ng-model="model.g4" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1">' +
            '<div class="input-group">' +
            '<input ng-model="model.g5" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1" style="border-right-style: solid;border-right-width: thin">' +
            '<div class="input-group">' +
            '<input ng-model="model.g6" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1">' +
            '<div class="input-group">' +
            '<input ng-model="model.g7" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1">' +
            '<div class="input-group">' +
            '<input ng-model="model.g8" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1">' +
            '<div class="input-group">' +
            '<input ng-model="model.g9" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="row">' +
            '<div class="col-xs-1">H</div>' +
            '<div class="col-xs-1">' +
            '<div class="input-group">' +
            '<input ng-model="model.h1" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1">' +
            '<div class="input-group">' +
            '<input ng-model="model.h2" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1" style="border-right-style: solid;border-right-width: thin">' +
            '<div class="input-group">' +
            '<input ng-model="model.h3" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1">' +
            '<div class="input-group">' +
            '<input ng-model="model.h4" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1">' +
            '<div class="input-group">' +
            '<input ng-model="model.h5" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1" style="border-right-style: solid;border-right-width: thin">' +
            '<div class="input-group">' +
            '<input ng-model="model.h6" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1">' +
            '<div class="input-group">' +
            '<input ng-model="model.h7" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1">' +
            '<div class="input-group">' +
            '<input ng-model="model.h8" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1">' +
            '<div class="input-group">' +
            '<input ng-model="model.h9" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="row">' +
            '<div class="col-xs-1">I</div>' +
            '<div class="col-xs-1">' +
            '<div class="input-group">' +
            '<input ng-model="model.i1" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1">' +
            '<div class="input-group">' +
            '<input ng-model="model.i2" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1" style="border-right-style: solid;border-right-width: thin">' +
            '<div class="input-group">' +
            '<input ng-model="model.i3" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1">' +
            '<div class="input-group">' +
            '<input ng-model="model.i4" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1">' +
            '<div class="input-group">' +
            '<input ng-model="model.i5" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1" style="border-right-style: solid;border-right-width: thin">' +
            '<div class="input-group">' +
            '<input ng-model="model.i6" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1">' +
            '<div class="input-group">' +
            '<input ng-model="model.i7" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1">' +
            '<div class="input-group">' +
            '<input ng-model="model.i8" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-1">' +
            '<div class="input-group">' +
            '<input ng-model="model.i9" type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="row"><div class="col-xs-12">&nbsp;</div></div>' +
            '<div class="row"><div class="col-xs-6"></div><div class="col-xs-6"><button ng-click="solve()">Solve</button></div></div>' +
            '</div></div>';
    }

    return {
        scope: {},
        controller: function($scope, $attrs) {

            $scope.solve = function() {
                console.log('solve the puzzle');
                var count = 1;
                while (count < 60) {
                    var bestCandidate = Game.bestCandidate();
                    Game.set(bestCandidate);
                    count++;
                }
            };

            function initialize() {
                $scope.model = Game.get();
            }

            initialize();
        },
        // templateUrl: 'sudoko.html'
        template: getTemplate()
    }
});