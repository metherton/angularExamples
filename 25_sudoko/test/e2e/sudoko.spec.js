'use strict';

var SudokoPage = require('./pages/sudoko.page.js');

describe('sudoko homepage', function() {

    var page;

    beforeEach(function() {
       page = new SudokoPage();
    });

    it('should initialize game', function() {

        expect(page.cellAt('ad').getText()).toBe('4');

    });

});