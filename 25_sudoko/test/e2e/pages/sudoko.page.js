'use strict';

var SudokoPage = function() {
    browser.get('http://localhost:3000/code/day3/25_sudoko/index.html');
};

SudokoPage.prototype = Object.create({}, {

    grid: {get: function() {return element(by.id('grid'))}},
    cellAt: {value: function(cellId) {return this.grid.get(cellId).getText();}}

});

module.exports = SudokoPage;

