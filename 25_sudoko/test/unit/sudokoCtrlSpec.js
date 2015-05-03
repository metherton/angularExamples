'use strict';

describe('sudoko', function () {

    var scope, model, Game, mockGameModel, _;

    beforeEach(module('sudokoApp'));

    beforeEach(module(function($provide) {
        var model = {
            a2: '4',
            a5: '8',
            a7: '2',
            b3: '8',
            b4: '2',
            b5: '6',
            b8: '9',
            c1: '7',
            c6: '4',
            c9: '3',
            d2: '3',
            d6: '2',
            d9: '4',
            e1: '1',
            e5: '7',
            e7: '5',
            f3: '6',
            f4: '5',
            f8: '3',
            g1: '9',
            g4: '8',
            g7: '1',
            g8: '4',
            h2: '6',
            h6: '5',
            h7: '9',
            i1: '4',
            i3: '7',
            i5: '1',
            i9: '5'
        };

        mockGameModel = {
            get: function() {
                return model;
            }
        };

        $provide.value('GameModel', mockGameModel);

    }));

    beforeEach(inject(function($rootScope, _Game_) {
        scope = $rootScope.$new();
        Game = _Game_;
        _ = $rootScope._;
    }));

    beforeEach(function() {


    });

    it('should return cell value', function() {
        expect(Game.cell('a2')).toEqual('4');
    });

    it('should return valid values after applying row constraint rule', function() {
        expect(Game.rowCandidates('a1')).toEqual(['1', '3', '5', '6', '7', '9']);
        expect(Game.rowCandidates('b1')).toEqual(['1', '3', '4', '5', '7']);
    });

    it('should return valid values after applying column constraint rule', function() {
        expect(Game.columnCandidates('a1')).toEqual(['2', '3', '5', '6', '8']);
        expect(Game.columnCandidates('a3')).toEqual(['1','2', '3','4', '5', '9']);
    });

    it('should return valid values after applying square constraint rule', function() {
        expect(Game.squareCandidates('a1')).toEqual(['1','2', '3', '5', '6', '9']);
        expect(Game.squareCandidates('i8')).toEqual(['2', '3', '6', '7','8']);
    });

});