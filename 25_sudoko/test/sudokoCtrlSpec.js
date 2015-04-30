'use strict';

describe('sudoko', function () {

    var scope, model, Game;

    beforeEach(module('sudokoApp'));

    beforeEach(inject(function($rootScope, _Game_) {
        scope = $rootScope.$new();
        Game = _Game_;

        model = {
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

        Game.setModel(model);

    }));

    it('should return cell value', function() {
        expect(Game.cell('a2')).toEqual('4');
    });
});